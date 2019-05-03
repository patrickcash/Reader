const express = require("express");
const router = express.Router();

const Feed = require("../../models/Feed");

router.get("/", (req, res) => {
  Feed.find().then(feeds => res.json(feeds));
});

router.post("/", (req, res) => {
  const newFeed = new Feed({
    name: req.body.name,
    url: req.body.url
  });

  newFeed.save().then(feed => res.json(feed));
});

router.delete("/:id", (req, res) => {
  Feed.findById(req.params.id)
    .then(feed => feed.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
