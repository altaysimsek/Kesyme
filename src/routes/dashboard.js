const express = require("express");
const router = express.Router();
const userModel =  require('../database/models/user')
const jwt = require('jsonwebtoken');
const urlModel = require("../database/models/urls");


router.get("", async (req, res) => {
    if(!req.session.userToken){
        res.redirect("/")
    }else{
        res.render('dashboard')
        
    }
});

module.exports = router;
