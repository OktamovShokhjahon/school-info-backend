// packages
const { Router } = require("express");

// controllers
const {} = require("../controllers/about.controller");
const {
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievements.controller");

// router
const router = Router();

router.get("/", getAllAchievements);
router.post("/", createAchievement);
router.put("/", updateAchievement);
router.delete("/", deleteAchievement);

module.exports = router;
