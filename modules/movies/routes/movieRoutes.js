import express from "express";
import {
  getAllMovies,
  getMovieById,
  addNewMovie,
  updateMovie,
  deleteMovie
} from "../models/movieModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getAllMovies());
});

router.get("/:id", (req, res) => {
  const movie = getMovieById(parseInt(req.params.id));
  movie ? res.json(movie) : res.status(404).json({ message: "Movie not found" });
});

router.post("/", (req, res) => {
  const newMovie = req.body;
  addNewMovie(newMovie);
  res.status(201).json(newMovie);
});

router.put("/:id", (req, res) => {
  const updated = updateMovie(parseInt(req.params.id), req.body);
  updated ? res.json(updated) : res.status(404).json({ message: "Movie not found" });
});

router.delete("/:id", (req, res) => {
  const deleted = deleteMovie(parseInt(req.params.id));
  deleted ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Movie not found" });
});

export default router;
