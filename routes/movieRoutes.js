const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");

router.get("/", getMovies);

router.post("/", authMiddleware, createMovie);

router.put("/:id",authMiddleware,  updateMovie);

router.delete("/:id", authMiddleware, deleteMovie);

module.exports = router;