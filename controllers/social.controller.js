// packages
const path = require("path");
const fs = require("fs");

// models
const SocialMedia = require("../models/Social.js");

// get all social media
async function getAllSocialMedia(req, res) {
  try {
    const socialMedia = await SocialMedia.find();

    if (socialMedia.length === 0) {
      return res.status(200).json({ message: "Ijtimoiy tarmoqlar topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Ijtimoiy tarmoqlar topildi", socialMedia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// create social media
async function createSocialMedia(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    const { name, link } = req.body;

    if (!name || !link) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    const newSocialMedia = new SocialMedia({
      title: name,
      link,
    });

    await newSocialMedia
      .save()
      .then((response) => {
        return res.status(201).json({
          message: "Ijtimoiy tarmoq yaratildi",
          socialMedia: response,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update social media
async function updateSocialMedia(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID berilmadi" });
    }

    const updData = {};

    const { name, link } = req.body;

    if (name) updData.title = name;
    if (link) updData.link = link;

    const updated = await SocialMedia.findByIdAndUpdate(id, updData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Ijtimoiy tarmoq topilmadi" });
    }

    return res
      .status(200)
      .json({ message: "Ijtimoiy tarmoq yangilandi", socialMedia: updated });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

// delete social media
async function deleteSocialMedia(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID berilmadi" });
    }

    const socialMedia = await SocialMedia.findById(id);

    if (!socialMedia) {
      return res.status(404).json({ message: "Ijtimoiy tarmoq topilmadi" });
    }

    await SocialMedia.findByIdAndDelete(id)
      .then(() => {
        return res.status(200).json({ message: "Ijtimoiy tarmoq o'chirildi" });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllSocialMedia,
  updateSocialMedia,
  createSocialMedia,
  deleteSocialMedia,
};
