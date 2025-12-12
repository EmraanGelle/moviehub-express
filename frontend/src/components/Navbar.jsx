import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="mh-navbar">
      <h2 className="mh-logo">MovieHub</h2>
      <div className="mh-nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token ? (
          <button className="mh-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
