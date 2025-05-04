const { Schema, model } = require("mongoose");

const AboutSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const About = model("About", AboutSchema);
module.exports = About;
