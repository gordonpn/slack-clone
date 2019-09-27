const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Channel = require("./Channel");

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  channelIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  friendIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
