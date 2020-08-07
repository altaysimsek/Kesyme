const express = require("express");
const router = express.Router();
const urlModel = require("../database/models/urls");
const jwt = require('jsonwebtoken')

router.post("", async (req, res) => {
  
	const urlCase = new urlModel({ url: req.body.url });
	try {
		if(req.session.userToken){
			const bilgi = jwt.decode(req.session.userToken)
			urlCase.whoCreated = bilgi._id
		}
		await urlCase.save();
		res.status(200).send({short:urlCase.short});
	} catch (error) {
		res.status(404).send();
	}
});

module.exports = router;
