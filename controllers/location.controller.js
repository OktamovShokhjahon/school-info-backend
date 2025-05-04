// models
const Location = require("../models/Location");

// get all locations
async function getAllLocations(req, res) {
  try {
    const locations = await Location.find();

    if (locations.length === 0) {
      return res
        .status(200)
        .json({ message: "Hozircha joylashuv ma'lumotlari yo'q" });
    }

    res
      .status(200)
      .json({ message: "Joylashuv ma'lumotlari topildi", locations });
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik", error: err.message });
  }
}

// create location
async function createLocation(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Iltimos, barcha maydonlarni to'ldiring",
      });
    }

    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        message: "Iltimos, joylashuv maydonini to'ldiring",
      });
    }

    const existingLocation = await Location.find();

    if (existingLocation.length > 0) {
      return res.status(400).json({
        message:
          "Hozirda joylashuv ma'lumotlari mavjud. Uni yangilashingiz mumkin.",
      });
    }

    const newLocation = new Location({
      location,
    });

    await newLocation
      .save()
      .then((response) => {
        res.status(201).json({
          message: "Joylashuv ma'lumotlari yaratildi",
          location: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Serverda xatolik", error: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik", error: err.message });
  }
}

// update location
async function updateLocation(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Iltimos, kamida bitta maydonni to'ldiring",
      });
    }

    const existingLocation = await Location.find();

    if (existingLocation.length === 0) {
      return res.status(400).json({
        message:
          "Hali hech qanday joylashuv ma'lumotlari yaratilmagan. Birinchi bo'lib yarating.",
      });
    }

    const body = req.body;

    await Location.updateOne({ _id: existingLocation[0]._id }, { ...body })
      .then((response) => {
        return res.status(201).json({
          message: "Joylashuv ma'lumotlari yangilandi",
          location: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Serverda xatolik", error: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik", error: err.message });
  }
}

module.exports = {
  getAllLocations,
  createLocation,
  updateLocation,
};
