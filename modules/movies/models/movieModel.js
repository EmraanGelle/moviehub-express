import fs from "fs";
const dataPath = "./data/movies.json";

function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function getAllMovies() {
  return readData();
}

export function getMovieById(id) {
  const movies = readData();
  return movies.find(m => m.id === id);
}

export function addNewMovie(movie) {
  const movies = readData();
  movies.push(movie);
  writeData(movies);
  return movie;
}

export function updateMovie(id, updatedData) {
  const movies = readData();
  const index = movies.findIndex(m => m.id === id);
  if (index === -1) return null;
  movies[index] = { ...movies[index], ...updatedData };
  writeData(movies);
  return movies[index];
}

export function deleteMovie(id) {
  let movies = readData();
  const initialLength = movies.length;
  movies = movies.filter(m => m.id !== id);
  if (movies.length === initialLength) return false;
  writeData(movies);
  return true;
}
