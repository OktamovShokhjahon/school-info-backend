const { Router } = require("express");
const {
  getAllLocations,
  createLocation,
  updateLocation,
} = require("../controllers/location.controller");

const router = Router();

router.get("/", getAllLocations);
router.post("/", createLocation);
router.put("/", updateLocation);

module.exports = router;
