const Playlist = require("../models/playlistsModel");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// GET all users with their playlists
const getUsersWithPlaylists = async (req, res) => {
  try {
    const usersWithPlaylists = await Playlist.find({})
      .populate("user_id", "name email") // Populate user details
      .sort({ "user_id.name": 1 }); // Sort by user name

    res.status(200).json(usersWithPlaylists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all playlists
const getPlaylists = async (req, res) => {
  const user_id = req.user._id;

  const playlists = await Playlist.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(playlists);
};

// GET a single playlist
const getPlaylist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such playlist" });
  }

  const playlist = await Playlist.findById(id);

  if (!playlist) {
    return res.status(404).json({ error: "No such playlist." });
  }

  res.status(200).json(playlist);
};

// Create a new playlist
const createPlaylist = async (req, res) => {
  const { genre, artist, song } = req.body;

  let emptyFields = [];

  // error checking
  if (!genre) {
    emptyFields.push("genre");
  }
  if (!artist) {
    emptyFields.push("artist");
  }
  if (!song) {
    emptyFields.push("song");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const playlist = await Playlist.create({ genre, artist, song, user_id });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Delete a playlist
const deletePlaylist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such playlist" });
  }

  const playlist = await Playlist.findOneAndDelete({ _id: id });

  if (!playlist) {
    return res.status(400).json({ error: "No such playlist." });
  }

  res.status(200).json(playlist);
};

// Update a playlist
const updatePlaylist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such playlist" });
  }

  const playlist = await Playlist.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!playlist) {
    return res.status(400).json({ error: "No such playlist." });
  }

  res.status(200).json(playlist);
};

module.exports = {
  getPlaylist,
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
  getUsersWithPlaylists,
};
