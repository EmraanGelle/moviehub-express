import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../api/moviesApi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import Message from "./Message";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to fetch movies" });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
        setMessage({ type: "success", text: "Movie deleted successfully!" });
        fetchMovies();
      } catch (err) {
        setMessage({ type: "error", text: "Failed to delete movie" });
      }
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h2>Movies</h2>
        {message && <Message type={message.type} text={message.text} />}
        <Link to="/movies/add" style={{ display: "inline-block", margin: "1rem 0" }}>
          Add Movie
        </Link>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <ul>
          {filteredMovies.map((m) => (
            <li key={m._id}>
              <Link to={`/movies/${m._id}`}>{m.title} ({m.year})</Link>
              {" | "}
              <Link to={`/movies/${m._id}/edit`}>Edit</Link>
              {" | "}
              <button onClick={() => handleDelete(m._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default MovieList;
