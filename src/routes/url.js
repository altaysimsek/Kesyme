const express = require('express')
const router = express.Router()

const urlModel = require('../database/models/urls')
const jwt = require('jsonwebtoken')



router.get("/urlz",async (req, res) => {
    const usrToken = jwt.verify(req.session
        .userToken,"kesycut")
    try {
        const urlS = await urlModel.find({whoCreated: usrToken._id})
        res.send(urlS)
    } catch (error) {
        
    }
})


module.exports = router