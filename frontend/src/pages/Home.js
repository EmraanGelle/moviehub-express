import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => (
  <>
    <Navbar />
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to MovieHub</h1>
      <p>Browse, add, and manage your favorite movies.</p>
    </main>
    <Footer />
  </>
);

export default Home;
