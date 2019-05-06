const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = Feed = mongoose.model("feed", FeedSchema);
