// packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const aboutRoute = require("./routes/about.route");

// app
const app = express();
app.use(cors());
app.use(express.json());

// routers
app.use("/api/about", aboutRoute);

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
