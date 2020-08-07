//Required
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const volleyball = require("volleyball");
const session = require("express-session")

//Database connection
require("./database/databaseConnection");
//Init express
const app = express();

//session

app.use(session({
	secret: "its'a private key",
	resave: false,
	saveUninitialized:true
	
}))
//Paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Static files path
app.use(express.static(publicDirectoryPath));

//View engine set-up
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Handling form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//http request logger
app.use(volleyball);

//Port
const PORT = process.env.PORT || 3000;

//middlewares


//Routes
const urlRoute = require('./routes/url')
const shoritRoute = require("./routes/shortit");
const authRoute = require("./routes/auth");
const dashboardRoute = require('./routes/dashboard')
app.use("/short", shoritRoute);
app.use(urlRoute)
app.use(authRoute);
app.use("/dashboard", dashboardRoute)

//THE APP
const urlModel = require("./database/models/urls");

app.get("", (req, res) => {
	res.render("landing");
});
app.get('/dali', (req, res) => {
	res.render('dali')
})
app.get("/:shortUrl", async (req, res) => {
	const urlCase = await urlModel.findOne({ short: req.params.shortUrl });
	if (urlCase == null) {
		res.render('404')
	} else {
		urlCase.clicks++;
		await urlCase.save();
		res.redirect(urlCase.url);
	}
});



app.get("*", (req, res) => {
	res.render('404')
})



app.listen(PORT, () => {
	console.log(`✅ - Server is up on port ${PORT}`);
});
