const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

// Schema for comment
const commentSchema = new Schema({
  comment: String,
  posted_at: {
    type: Date,
    default: Date.now(),
  },
  posted_by: String,
});

// Schema for post
const postSchema = new Schema({
  title: String,
  description: String,
  posted_at: {
    type: Date,
    default: Date.now(),
  },
  comments: [commentSchema],
});

// Schema for the user
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  posts: [postSchema],
});

module.exports = User = mongoose.model("user", userSchema);
