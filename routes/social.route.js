// packages
const { Router } = require("express");

// controllers
const {
  getAllSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../controllers/social.controller");

// router
const router = Router();

router.get("/", getAllSocialMedia);
router.post("/", createSocialMedia);
router.put("/", updateSocialMedia);
router.delete("/", deleteSocialMedia);

module.exports = router;
