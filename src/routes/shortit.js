const express = require("express");
const router = express.Router();
const urlModel = require("../database/models/urls");

router.post("", async (req, res) => {
  const urlCase = new urlModel({ url: req.body.url });
  try {
    await urlCase.save();
    res.redirect("/");
  } catch (error) {
      
  }
});

module.exports = router;
