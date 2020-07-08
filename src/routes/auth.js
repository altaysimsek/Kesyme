
const express = require("express");
const router = express.Router();
const urlModel = require("../database/models/urls");

router.get("/login", async (req, res) => {
	res.render("login");
});

router.get("/register", async (req, res) => {
	res.render("register")
})

router.post("/register", async (req, res) =>{
	res.send(req.body)
})
module.exports = router;
