const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");

router.post("/add-music", musicController.importMusic);
router.get("/catalog", musicController.getMusicData);

module.exports = router;
