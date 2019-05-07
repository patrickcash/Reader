const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Feed = require("../../models/Feed");
const User = require("../../models/User");

// get all feeds for the user
router.get("/", auth, (req, res) => {
  Feed.find({ _user: req.user.id }).then(feeds => res.json(feeds));
});

// add a new feed for the user
router.post("/", auth, (req, res) => {
  const newFeed = new Feed({
    name: req.body.name,
    url: req.body.url,
    _user: req.user.id
  });

  newFeed.save().then(feed => res.json(feed));
});

// delete feed with given id
router.delete("/:id", auth, (req, res) => {
  Feed.findById(req.params.id)
    .then(feed => feed.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
