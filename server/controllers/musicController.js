const Music = require("../models/musicModel");

const importMusic = async (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData) {
      return res.status(400).json({ error: "No JSON data received" });
    }

    const newMusic = await Music.create(jsonData);

    if (!newMusic) {
      return res.status(500).json({ error: "Failed to import music data" });
    }

    res
      .status(200)
      .json({ message: "Music data imported successfully", data: newMusic });
  } catch (err) {
    console.error("Error while importing music data:", err);
    res.status(500).json({ error: err.message });
  }
};

const getMusicData = async (req, res) => {
  try {
    // Fetch all music data from the database
    const allMusic = await Music.find();

    if (!allMusic || allMusic.length === 0) {
      return res.status(404).json({ error: "No music data found" });
    }

    res.status(200).json({ data: allMusic });
  } catch (err) {
    console.error("Error while fetching music data:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  importMusic,
  getMusicData,
};
