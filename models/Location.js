const { Schema, model } = require("mongoose");

const LocationSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = model("Location", LocationSchema);
module.exports = Location;
