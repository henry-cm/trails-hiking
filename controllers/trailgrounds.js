const Trailground = require("../models/trailground");
const { cloudinary } = require("../cloudinary");

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

// GET all trails
module.exports.index = async (req, res) => {
  try {
    const trailgrounds = await Trailground.find({});
    res.json(trailgrounds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trailgrounds", error });
  }
};

// CREATE A NEW TRAIL
module.exports.createTrailground = async (req, res) => {
  try {
    if (!req.body.title || (!req.body.location && !coordinatesProvided)) {
      return res.status(400).json({
        error: "Title and either Location OR Coordinates are required.",
      });
    }

    const coordinatesProvided =
      req.body.latitude &&
      req.body.longitude &&
      !isNaN(req.body.latitude) &&
      !isNaN(req.body.longitude);

    const geoData = coordinatesProvided
      ? {
          type: "Point",
          coordinates: [
            parseFloat(req.body.longitude), // Longitude first
            parseFloat(req.body.latitude), // Latitude second
          ],
        }
      : { type: "Point", coordinates: [0, 0] };

    // If using geocoding, extract coordinates
    const geometry = coordinatesProvided
      ? geoData
      : geoData.features[0].geometry;

    const trailground = new Trailground({
      title: req.body.title,
      location: req.body.location || "Coordinates Provided",
      price: req.body.price,
      description: req.body.description,
      difficulty: req.body.difficulty,
      distance: req.body.distance,
      elevationGain: req.body.elevationGain,
      trailType: req.body.trailType,
      trailVariation: req.body.trailVariation,
      geometry: geoData,
      author: req.user._id,
    });

    // ✅ Handle image uploads (Cloudinary)
    if (req.files && req.files.length > 0) {
      trailground.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
    }

    await trailground.save();
    res.status(201).json(trailground);
  } catch (error) {
    console.error("Error saving trail:", error);
    res.status(500).json({ message: "Error creating trailground", error });
  }
};

// GET A SINGLE TRAIL (with reviews & author populated)
module.exports.showTrailground = async (req, res) => {
  try {
    const trailground = await Trailground.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" }, // Get reviewer names
      })
      .populate("author");

    if (!trailground) {
      return res.status(404).json({ error: "Trailground not found" });
    }

    res.json(trailground);
  } catch (error) {
    console.error("Error fetching trailground:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// EDIT A TRAIL
module.exports.updateTrailground = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Ensure correct format
    let updatedData = req.body.trailground
      ? JSON.parse(req.body.trailground)
      : req.body;

    if (updatedData.latitude && updatedData.longitude) {
      updatedData.geometry = {
        type: "Point",
        coordinates: [
          parseFloat(updatedData.longitude),
          parseFloat(updatedData.latitude),
        ],
      };
    }

    const trailground = await Trailground.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    // ✅ Handle new image uploads
    if (req.files && req.files.length > 0) {
      const imgs = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
      trailground.images.push(...imgs);
    }

    await trailground.save();

    // ✅ Handle image deletions
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }

      await trailground.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
    }

    res.json({ message: "Trail updated successfully", trailground });
  } catch (error) {
    console.error("Error updating trail:", error);
    res.status(500).json({ message: "Error updating trailground", error });
  }
};

// DELETE A TRAIL
module.exports.destroyTrailground = async (req, res) => {
  try {
    const { id } = req.params;
    const trailground = await Trailground.findById(id);
    if (!trailground) {
      return res.status(404).json({ message: "Trail not found" });
    }

    console.log(
      "Deleting trail:",
      trailground.title,
      "with coordinates:",
      trailground.geometry.coordinates
    );

    await trailground.deleteOne(); // Use deleteOne() for better performance
    res.json({ message: "Trail deleted successfully" });

    res.json({ message: "Trail deleted successfully" });
  } catch (error) {
    console.error("Error deleting trail:", error);
    res.status(500).json({ message: "Error deleting trailground", error });
  }
};
