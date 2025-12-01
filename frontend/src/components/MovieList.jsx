import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../api/moviesApi";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(id);
      fetchMovies();
    }
  };

  return (
    <div>
      <h2>Movies</h2>
      <Link to="/movies/add">Add Movie</Link>
      <ul>
        {movies.map(m => (
          <li key={m._id}>
            <Link to={`/movies/${m._id}`}>{m.title} ({m.year})</Link>
            {" | "}
            <Link to={`/movies/${m._id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => handleDelete(m._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
