const express = require("express");
const router = express.Router();

// Importing the model
const apiModel = require("../models/model");

// Add all the routes here
router.post("/test/:id", async (req, res, next) => {
  try {
    // To be implemented
  } catch (e) {
    console.log(e);
    // To be implemented
  }
});

module.exports = router;
