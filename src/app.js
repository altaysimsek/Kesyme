//Required
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const volleyball = require("volleyball");

//Database connection
require("./database/databaseConnection");
//Init express
const app = express();

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

//http request logger
app.use(volleyball);

//Port
const PORT = process.env.PORT || 3000;

//Routes
const shoritRoute = require("./routes/shortit");
app.use("/short", shoritRoute);

//THE APP
const urlModel = require("./database/models/urls");

app.get("", (req, res) => {
  res.render("landing");
});

app.get("/:shortUrl", async (req, res) => {
  const urlCase = await urlModel.findOne({ short: req.params.shortUrl });
  if (urlCase == null){
    res.sendStatus(404);
  } else{
    urlCase.clicks++;
    await urlCase.save();
    res.redirect(urlCase.url);
  }
  
});

app.listen(PORT, () => {
  console.log(`✅ - Server is up on port ${PORT}`);
});
