const express = require("express");
const requireAuth = require("../middleware/requiredAuth");
const {
  createPlaylist,
  getPlaylist,
  getPlaylists,
  deletePlaylist,
  updatePlaylist,
  getUsersWithPlaylists,
} = require("../controllers/playlistsController");

const router = express.Router();

// Get all users with their playlists
router.get("/UserPlaylistAPI", getUsersWithPlaylists);

// Require auth for all playlist routes
router.use(requireAuth);

// Get all playlists
router.get("/", getPlaylists);

// Get a single playlist
router.get("/:id", getPlaylist);

// POST a new playlist
router.post("/", createPlaylist);

// DELETE a new playlist
router.delete("/:id", deletePlaylist);

// UPDATE a playlist
router.patch("/:id", updatePlaylist);

module.exports = router;
