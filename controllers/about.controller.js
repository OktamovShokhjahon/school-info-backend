// models
const About = require("../models/About");

// get all
async function getAllAbout(req, res) {
  try {
    const about = await About.find();

    if (about.length === 0) {
      return res.status(200).json({ message: "Hozircha ma'lumot yo'q" });
    }

    res.status(200).json({ message: "Ma'lumot topildi", about });
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik", error: err.message });
  }
}

// create about
async function createAbout(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Iltimos, barcha maydonlarni to'ldiring",
      });
    }

    const { title, body } = req.body;

    console.log(req.body);

    if (!title || !body) {
      return res.status(400).json({
        message: "Iltimos, barcha maydonlarni to'ldiring",
      });
    }

    const about = await About.find();

    if (about.length > 0) {
      return res.status(400).json({
        message: "Hozirda ma'lumot mavjud. Uni yangilashingiz mumkin.",
      });
    }

    const newAbout = new About({
      title,
      body,
    });

    await newAbout
      .save()
      .then((response) => {
        res
          .status(201)
          .json({ message: "Ma'lumot yaratildi", about: response });
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

// update about
async function updateAbout(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Iltimos, kamida bitta maydonni to'ldiring",
      });
    }

    const about = await About.find();

    if (about.length === 0) {
      return res.status(400).json({
        message:
          "Hali hech qanday ma'lumot yaratilmagan. Birinchi bo'lib yarating.",
      });
    }

    const body = req.body;

    await About.updateOne({ _id: about[0]._id }, { ...body })
      .then((response) => {
        return res
          .status(201)
          .json({ message: "Ma'lumotlar yangilandi", about: response });
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
  getAllAbout,
  createAbout,
  updateAbout,
};
