import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./modules/users/models/userModel.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashed = await bcrypt.hash("password123", 10);

  const user = new User({
    name: "Test User",
    email: "test@example.com",
    password: hashed,
    role: "user"
  });

  await user.save();
  console.log("✅ Test user created");
  mongoose.disconnect();
};

run();
