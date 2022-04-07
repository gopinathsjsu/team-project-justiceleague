const express = require("express");
const router = express.Router();
const { hashedPassword } = require("../Utilities/hashing");

// Importing the model
const apiModel = require("../models/model");

// Add all the routes here
router.post("/login", async (req, res, next) => {
  try {
    const { personaType, email, password } = req.body;
    let table = "";
    // Check for persona and set the table
    if (personaType.toLowerCase() === "cu") {
      table = "customers";
    } else if (personaType.toLowerCase() === "ho") {
      table = "hotels";
    } else {
      res.status(500).send("Persona not specified.");
    }
    // Invoke the query
    const results = await apiModel.loginUser(table, personaType, email);
    if (results.length > 0) {
      if (hashedPassword(password) === results[0].password) {
        // Return the response
        res.json(JSON.parse(JSON.stringify(results[0])));
      } else {
        // Auth Error
        res.status(401).json({
          error: "Incorrect Password",
        });
      }
    } else {
      // Auth Error
      res.status(401).json({
        error: "Incorrect Email or Password",
      });
    }
  } catch (e) {
    // Server Error
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error: Please try again",
    });
  }
});

module.exports = router;
