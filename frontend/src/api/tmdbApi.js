import axios from "axios";

const API_KEY = "4a11090c1d4c9469c6da5122b05f91b5"; // replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

// Get popular movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: "en-US", page: 1 },
  });
  return res.data.results; // returns an array of movies
};
