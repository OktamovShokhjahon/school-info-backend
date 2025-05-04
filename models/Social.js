const { Schema, model } = require("mongoose");

const SocialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Social = model("Social", SocialSchema);
module.exports = Social;
