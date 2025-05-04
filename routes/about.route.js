// packages
const { Router } = require("express");

// controllers
const {
  getAllAbout,
  createAbout,
  updateAbout,
} = require("../controllers/about.controller");

// router
const router = Router();

router.get("/", getAllAbout);
router.post("/", createAbout);
router.put("/", updateAbout);

module.exports = router;
