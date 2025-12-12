import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies } from "../api/tmdbApi";
import { getMovies as getManualMovies } from "../api/moviesApi";
import { apiFetch } from "../api/api";
import "../styles/ui.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const tmdbData = await getPopularMovies();
        const manualRes = await getManualMovies();
        setMovies([
          ...(tmdbData || []),
          ...(manualRes.data || [])
        ]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
  }, []);

  async function addToDashboard(movie) {
    if (!token) return alert("Please login to save movies!");

    try {
      const res = await apiFetch("http://localhost:3000/api/dashboard/add", {
        method: "POST",
        body: JSON.stringify({
          title: movie.title,
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : movie.poster,
          tmdbId: movie.id,
          year: movie.year,
          vote_average: movie.vote_average
        })
      });
      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("Movie added to dashboard!");
      navigate("/dashboard"); // Redirect after adding
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <h1 className="cinematic-title" style={{ textAlign: "center" }}>🎬 MovieHub</h1>
      <p className="cinematic-subtitle" style={{ textAlign: "center" }}>
        Discover, add, and manage your favorite movies in cinematic style.
      </p>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={movie.id || movie._id || index} className="movie-card">
            {movie.poster_path || movie.poster ? (
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : movie.poster}
                alt={movie.title}
                style={{ borderRadius: "10px", marginBottom: "0.5rem" }}
              />
            ) : (
              <div
                style={{
                  height: "300px",
                  background: "#222",
                  borderRadius: "10px",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#888",
                }}
              >
                No Image
              </div>
            )}
            <h3 style={{ fontSize: "1.1rem", margin: "0.3rem 0" }}>
              {movie.title} {movie.year ? `(${movie.year})` : ""}
            </h3>
            {movie.vote_average && <p style={{ margin: 0 }}>⭐ {movie.vote_average}</p>}

            {token && (
              <button
                style={{ marginTop: "0.5rem", padding: "0.4rem 0.8rem", cursor: "pointer" }}
                onClick={() => addToDashboard(movie)}
              >
                Add to Dashboard
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
