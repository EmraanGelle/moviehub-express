import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
    <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>Home</Link>
    <Link to="/movies" style={{ marginRight: "1rem", color: "#fff" }}>Movies</Link>
    <Link to="/movies/add" style={{ color: "#fff" }}>Add Movie</Link>
  </nav>
);

export default Navbar;
