import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/add" element={<AddMovie />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/edit" element={<EditMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
