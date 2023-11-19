require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const playlistsRoutes = require("./routes/playlists");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT;

// Middleware
const corsOptions = {
  origin: "http://localhost:3000", // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/playlists", playlistsRoutes);
app.use("/api/user", userRoutes);

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
