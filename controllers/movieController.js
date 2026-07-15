const Movie = require("../models/Movie");

const getMovies = async (req, res) => {
  try {
    const filter = {};

    if (req.query.genre) {
      filter.genre = req.query.genre;
    }

    if (req.query.rating) {
      filter.rating = { $gt: Number(req.query.rating) };
    }

    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    let query = Movie.find(filter);

    if (req.query.sort) {
      query = query.sort({ [req.query.sort]: -1 });
    }

    const movies = await query;

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
};