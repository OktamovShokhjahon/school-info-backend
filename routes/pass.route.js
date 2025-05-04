const { Router } = require("express");
const {
  getAllPassingScores,
  createPassingScore,
  updatePassingScore,
} = require("../controllers/pass.controller");

const router = Router();

router.get("/", getAllPassingScores);
router.post("/", createPassingScore);
router.put("/", updatePassingScore);

module.exports = router;
