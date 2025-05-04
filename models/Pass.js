const { Schema, model } = require("mongoose");

const PassSchema = new Schema(
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

const Pass = model("Pass", PassSchema);
module.exports = Pass;
