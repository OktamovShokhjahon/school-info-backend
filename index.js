// packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// routes
const aboutRoute = require("./routes/about.route");
const achievementRoute = require("./routes/achievements.route");
const locationRoute = require("./routes/location.route");
const passRoute = require("./routes/pass.route");
const socialRoute = require("./routes/social.route");

// app
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// routers
app.use("/api/about", aboutRoute);
app.use("/api/achievement", achievementRoute);
app.use("/api/location", locationRoute);
app.use("/api/pass", passRoute);
app.use("/api/social", socialRoute);

// init
function start() {
  const MONGO_URI = process.env.MONGO_URI;
  const PORT = process.env.PORT || 4100;

  mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}/`)
  );
}

start();
