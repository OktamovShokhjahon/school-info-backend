const { Schema, model } = require("mongoose");

const AchievementSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Achievement = model("Achievement", AchievementSchema);
module.exports = Achievement;
