const mongoose = require("mongoose");
const shortId = require("shortid");

const urlSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate,
	},
	clicks: {
		type: Number,
		required: true,
		default: 0,
	},
	whoCreated: {
		type: String,

		default: "Anonymous",
	},
	name:{
		type: String
	},
	createdTıme:{
		type:String,
		default:new Date()
	}
});

const urlModel = mongoose.model("Urls", urlSchema);

module.exports = urlModel;
