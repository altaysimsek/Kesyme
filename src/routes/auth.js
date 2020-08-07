const express = require("express");
const router = express.Router();
const userModel = require("../database/models/user");
const { async } = require("validate.js");
const jwt = require('jsonwebtoken')

router.get("/login", async (req, res) => {
  if(req.session.userToken){
    res.redirect("/dashboard");
  }else{
    res.render("login")
  }
  
});

router.get("/register", async (req, res) => {
  if(req.session.userToken){
    res.redirect("/dashboard");
  }else{
    res.render("register")
  }
});

router.post("/register", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send({success: true})
  } catch (error) {
    res.json({err: error.errors })
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    req.session.userToken = token;
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
})

router.get("/logout", async (req, res) => {
  
  try {
    const bilgi = jwt.decode(req.session.userToken)
    console.log(bilgi._id)
    const user = await userModel.findById(bilgi._id)
    user.tokens = "";
    await user.save()
  } catch (error) {
    res.send(error.message)
  }
  req.session.destroy();
  res.redirect("/");
})


module.exports = router;
