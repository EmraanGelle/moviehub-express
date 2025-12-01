import React from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../api/moviesApi";
import MovieForm from "../components/MovieForm";

const AddMovie = () => {
  const navigate = useNavigate();

  const handleAdd = async (movie) => {
    try {
      await addMovie(movie);
      alert("Movie added successfully!");
      navigate("/movies");
    } catch (err) {
      alert("Error adding movie: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <MovieForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddMovie;
