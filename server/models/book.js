// eslint-disable-next-line no-undef
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model("Book", bookSchema);
