const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1033581442/photo/paddy-field-farming-at-sunrise.webp?a=1&b=1&s=612x612&w=0&k=20&c=RNb-vOU7v6rLoL1inZgxq6tkJ6oZOkzsjBKc5mkmoiQ=",
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/1033581442/photo/paddy-field-farming-at-sunrise.webp?a=1&b=1&s=612x612&w=0&k=20&c=RNb-vOU7v6rLoL1inZgxq6tkJ6oZOkzsjBKc5mkmoiQ="
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

module.exports = mongoose.model("listing", listingSchema);
