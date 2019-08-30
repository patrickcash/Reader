const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  url: {
    type: String,
    unique: true,
    required: true
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Feed = mongoose.model("feed", FeedSchema);
