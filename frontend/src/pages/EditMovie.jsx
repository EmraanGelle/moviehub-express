import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovie, updateMovie } from "../api/moviesApi";
import MovieForm from "../components/MovieForm";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getMovie(id).then(res => {
      res.data.cast = res.data.cast.join(", "); 
      setInitialData(res.data);
    });
  }, [id]);

  const handleUpdate = async (movie) => {
    try {
      await updateMovie(id, movie);
      alert("Movie updated successfully!");
      navigate("/movies");
    } catch (err) {
      alert("Error updating movie: " + err.response?.data?.message || err.message);
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Movie</h2>
      <MovieForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditMovie;
