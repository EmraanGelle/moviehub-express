import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function handleVerify(e) {
    e.preventDefault();

    const email = localStorage.getItem("loginEmail");
    if (!email) {
      setError("No email found. Please login again.");
      return;
    }

    const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "OTP verification failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.removeItem("loginEmail");
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Verify OTP</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleVerify}>
        <input 
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
}
