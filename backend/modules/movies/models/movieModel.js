import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  director: String,
  cast: [String],
  rating: Number,
  reviews: [{ user: String, comment: String, rating: Number }]
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
