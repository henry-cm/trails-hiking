const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Trailground = require("../models/trailground");

mongoose.connect("mongodb://localhost:27017/trails", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Trailground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20);
    const trail = new Trailground({
      author: "678c35504d99f5235bcea6f6",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/djh9on45g/image/upload/v1738020671/Trails/tzz7izzxx1a7cvo3awrd.jpg",
          filename: "Trails/tzz7izzxx1a7cvo3awrd",
        },
        {
          url: "https://res.cloudinary.com/djh9on45g/image/upload/v1738020671/Trails/szsjhbq9tpuwyrwytcjp.jpg",
          filename: "Trails/szsjhbq9tpuwyrwytcjp",
        },
        {
          url: "https://res.cloudinary.com/djh9on45g/image/upload/v1738020671/Trails/tlnyq0a3ctjxfnjiw5w9.jpg",
          filename: "Trails/tlnyq0a3ctjxfnjiw5w9",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur qui pariatur libero, deserunt beatae, dolorem dolore, incidunt cupiditate modify.",
      price,
    });
    await trail.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
