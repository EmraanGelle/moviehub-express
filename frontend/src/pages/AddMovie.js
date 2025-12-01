import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Message from "../components/Message";

const AddMovie = () => {
  const [movie, setMovie] = useState({ title: "", year: "", genre: "", director: "", cast: "", rating: "" });
  const [message, setMessage] = useState(null);

  const handleChange = e => setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/movies", {
        ...movie,
        year: Number(movie.year),
        rating: Number(movie.rating),
        cast: movie.cast.split(",").map(c => c.trim())
      });
      setMessage({ type: "success", text: "Movie added successfully!" });
      setMovie({ title: "", year: "", genre: "", director: "", cast: "", rating: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error adding movie" });
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h2>Add Movie</h2>
        {message && <Message type={message.type} text={message.text} />}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title: </label>
            <input type="text" name="title" value={movie.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Year: </label>
            <input type="number" name="year" value={movie.year} onChange={handleChange} required />
          </div>
          <div>
            <label>Genre: </label>
            <input type="text" name="genre" value={movie.genre} onChange={handleChange} required />
          </div>
          <div>
            <label>Director: </label>
            <input type="text" name="director" value={movie.director} onChange={handleChange} />
          </div>
          <div>
            <label>Cast (comma separated): </label>
            <input type="text" name="cast" value={movie.cast} onChange={handleChange} />
          </div>
          <div>
            <label>Rating: </label>
            <input type="number" name="rating" value={movie.rating} onChange={handleChange} />
          </div>
          <button type="submit" style={{ marginTop: "1rem" }}>Add Movie</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AddMovie;
