const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("About Trails-Hiking API is working!");
});

module.exports = router;
