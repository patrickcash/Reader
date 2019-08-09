const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");
const auth = require("../../middleware/auth");

// currently just converting the RSS XML to JSON
// will probably need to move this to a util function to do more processing later
// Will probably need to create a feed item model to fill in with this data
// Add fields for things like "Read" and checks for duplicates, empty items, etc.
const convert = body =>
  new Promise((resolve, reject) => {
    const parser = new xml2js.Parser({
      explicitArray: false
    });
    parser.parseString(body, (err, data) => {
      // if there was a parse error
      if (err) return reject(err);
      // if it's not a rss xml
      if (!data.rss) return reject("Invalid RSS feed");
      return resolve(data);
    });
  });

// get all items for the passed in feed
router.get("/", auth, (req, res) => {
  const feedURL = req.feed_url;
  return axios
    .get(feedURL)
    .then(response => convert(response.data))
    .catch(err => {
      if (err && err.code === "ENOTFOUND") {
        return Promise.reject({
          code: 404,
          message: "Could not access the feed"
        });
      }
      return Promise.reject({ code: 400, message: "Invalid RSS feed" });
    });
});

module.exports = router;
