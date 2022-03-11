const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const BlogPostSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

//model oluşturma
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
