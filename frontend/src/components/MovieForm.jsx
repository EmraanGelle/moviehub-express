import React, { useState, useEffect } from "react";

const MovieForm = ({ initialData = {}, onSubmit }) => {
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    genre: "",
    director: "",
    cast: "",
    rating: "",
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!movie.title) newErrors.title = "Title is required";
    if (!movie.year || isNaN(movie.year)) newErrors.year = "Valid year required";
    if (!movie.genre) newErrors.genre = "Genre is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ ...movie, cast: movie.cast.split(",").map(s => s.trim()) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input name="title" value={movie.title} onChange={handleChange} />
        {errors.title && <span style={{color:"red"}}>{errors.title}</span>}
      </div>
      <div>
        <label>Year:</label>
        <input name="year" value={movie.year} onChange={handleChange} />
        {errors.year && <span style={{color:"red"}}>{errors.year}</span>}
      </div>
      <div>
        <label>Genre:</label>
        <input name="genre" value={movie.genre} onChange={handleChange} />
        {errors.genre && <span style={{color:"red"}}>{errors.genre}</span>}
      </div>
      <div>
        <label>Director:</label>
        <input name="director" value={movie.director} onChange={handleChange} />
      </div>
      <div>
        <label>Cast (comma separated):</label>
        <input name="cast" value={movie.cast} onChange={handleChange} />
      </div>
      <div>
        <label>Rating:</label>
        <input name="rating" value={movie.rating} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;
