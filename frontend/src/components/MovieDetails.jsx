import React, { useEffect, useState } from "react";
import { getMovie } from "../api/moviesApi";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(id).then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title} ({movie.year})</h2>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Cast:</strong> {movie.cast.join(", ")}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <Link to={`/movies/${id}/edit`}>Edit</Link>
      <br />
      <Link to="/movies">Back to list</Link>
    </div>
  );
};

export default MovieDetails;
