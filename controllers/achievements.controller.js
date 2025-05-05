// packages
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// models
const Achievements = require("../models/Achievement.js");

// get all
async function getAllAchievements(req, res) {
  try {
    const achievements = await Achievements.find();

    if (achievements.length === 0) {
      return res.status(200).json({ message: "Yutuqlar topilmadi" });
    }

    res.status(200).json({ message: "Yutuqlar topildi", achievements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// create achievement
async function createAchievement(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    const { title, description } = req.body;
    const { image } = req.files;

    if (!image || !title || !description) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    const imageName = uuidv4() + ".jpg";
    const uploadPath = path.join(__dirname, "../uploads", imageName);

    image.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);
    });

    const newAchievement = new Achievements({
      image: imageName,
      title,
      description,
    });

    await newAchievement
      .save()
      .then((response) => {
        return res
          .status(201)
          .json({ message: "Yutuq yaratildi", achievement: response });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update achievement
async function updateAchievement(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID berilmadi" });
    }

    const updData = {};

    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageName = uuidv4() + ".jpg";
      const uploadPath = path.join(__dirname, "../uploads", imageName);

      await image.mv(uploadPath);

      updData.image = imageName;
    }

    const { title, description } = req.body;

    if (title) updData.title = title;
    if (description) updData.description = description;

    const updated = await Achievements.findByIdAndUpdate(id, updData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Yutuq topilmadi" });
    }

    return res
      .status(200)
      .json({ message: "Yutuq yangilandi", achievement: updated });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

// delete achievement
async function deleteAchievement(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID berilmadi" });
    }

    const achievement = await Achievements.findById(id);

    if (!achievement) {
      return res.status(404).json({ message: "Yutuq topilmadi" });
    }

    const imagePath = path.join(__dirname, "../uploads", achievement.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Achievements.findByIdAndDelete(id)
      .then(() => {
        return res.status(200).json({ message: "Yutuq o'chirildi" });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAchievement,
  getAllAchievements,
  updateAchievement,
  deleteAchievement,
};
