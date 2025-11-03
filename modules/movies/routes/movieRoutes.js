import express from "express";
import Movie from "../models/movieModel.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validateMovie = [
  body("title").notEmpty().withMessage("Title is required"),
  body("year").isInt({ min: 1900 }).withMessage("Year must be a valid number"),
  body("genre").notEmpty().withMessage("Genre is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    movie ? res.json(movie) : res.status(404).json({ message: "Movie not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", validateMovie, async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", validateMovie, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    updatedMovie ? res.json(updatedMovie) : res.status(404).json({ message: "Movie not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    deletedMovie ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Movie not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
