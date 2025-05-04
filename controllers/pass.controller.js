// models
const PassingScore = require("../models/Pass");

// get all passing scores
async function getAllPassingScores(req, res) {
  try {
    const passingScores = await PassingScore.find();

    if (passingScores.length === 0) {
      return res
        .status(200)
        .json({ message: "Hozircha o'tish ballari ma'lumotlari yo'q" });
    }

    res
      .status(200)
      .json({ message: "O'tish ballari ma'lumotlari topildi", passingScores });
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik", error: err.message });
  }
}

// create passing score
async function createPassingScore(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Iltimos, barcha maydonlarni to'ldiring",
      });
    }

    const { score } = req.body;

    if (!score) {
      return res.status(400).json({
        message: "Iltimos, o'tish ballari maydonini to'ldiring",
      });
    }

    const existingScores = await PassingScore.find();

    if (existingScores.length > 0) {
      return res.status(400).json({
        message:
          "Hozirda o'tish ballari ma'lumotlari mavjud. Uni yangilashingiz mumkin.",
      });
    }

    const newPassingScore = new PassingScore({
      score,
    });

    await newPassingScore
      .save()
      .then((response) => {
        res.status(201).json({
          message: "O'tish ballari ma'lumotlari yaratildi",
          passingScore: response,
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

// update passing score
async function updatePassingScore(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Iltimos, kamida bitta maydonni to'ldiring",
      });
    }

    const existingScores = await PassingScore.find();

    if (existingScores.length === 0) {
      return res.status(400).json({
        message:
          "Hali hech qanday o'tish ballari ma'lumotlari yaratilmagan. Birinchi bo'lib yarating.",
      });
    }

    const body = req.body;

    await PassingScore.updateOne({ _id: existingScores[0]._id }, { ...body })
      .then((response) => {
        return res.status(201).json({
          message: "O'tish ballari ma'lumotlari yangilandi",
          passingScore: response,
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
  getAllPassingScores,
  createPassingScore,
  updatePassingScore,
};
