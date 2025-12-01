import express from "express";
import dotenv from "dotenv";
import connectDB from "./modules/movies/middlewares/connect-db.js"; // <-- DB connection
import movieRoutes from "./modules/movies/routes/movieRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/movies", movieRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
