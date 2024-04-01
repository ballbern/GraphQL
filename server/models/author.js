// eslint-disable-next-line no-undef
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model("Author", authorSchema);
