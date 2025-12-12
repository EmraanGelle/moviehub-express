import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./modules/users/models/userModel.js"; // adjust path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function resetPassword() {
  try {
    const user = await User.findOne({ email: "emgillz2016@gmail.com" });
    if (!user) {
      console.log("User not found");
      process.exit();
    }

    user.password = "Password123"; // new plaintext password
    await user.save();

    console.log("Password successfully reset!");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resetPassword();
