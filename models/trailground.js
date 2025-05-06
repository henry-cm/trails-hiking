const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const TrailSchema = new Schema(
  {
    title: String,
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    difficulty: {
      type: String,
      enum: ["Very Easy", "Easy", "Moderate", "Hard", "Very Hard"],
      required: true,
    },
    trailType: {
      type: String,
      enum: ["Loop", "Out & Back", "Point-to-Point"],
      required: true,
    },
    trailVariation: {
      type: String,
      enum: [
        "Hiking",
        "Biking",
        "Cross-Country Skiing",
        "Snowshoeing",
        "Running",
      ],
      required: true,
    },
    distance: Number,
    elevationGain: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  opts
);

TrailSchema.virtual("properties.popUpMarkup").get(function () {
  return `<a href="/trailgrounds/${this._id}">${this.title}</a>`;
});

TrailSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Trailground", TrailSchema);
