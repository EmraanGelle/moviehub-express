const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.get("/movies", (req, res) => {
  res.json({ message: "Get all movies (dummy response)" });
});

app.get("/movies/:id", (req, res) => {
  res.json({ message: `Get movie with ID ${req.params.id}` });
});

app.post("/movies", (req, res) => {
  res.json({ message: "Add a new movie (dummy response)" });
});

app.put("/movies/:id", (req, res) => {
  res.json({ message: `Update movie with ID ${req.params.id}` });
});

app.delete("/movies/:id", (req, res) => {
  res.json({ message: `Delete movie with ID ${req.params.id}` });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
