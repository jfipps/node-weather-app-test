const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();

// defining paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views/partials locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, "../public")));

// app.com
// app.com/help

app.get("", (req, res) => {
  res.render("index", { title: "Weather Report", name: "Jared Fipps" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "This is a dynamic about page",
    name: "Jared Fipps",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is a dynamic help page",
    name: "Jared Fipps",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search location",
    });
  }
  geocode(req.query.search, (error, geolocation) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(geolocation.latitude, geolocation.longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      return res.send({
        label: geolocation.label,
        feelsLike: forecast.feelslike,
        temperature: forecast.temperature,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "404",
    name: "Jared Fipps",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "404",
    name: "Jared Fipps",
    error: "404 page not found",
  });
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
