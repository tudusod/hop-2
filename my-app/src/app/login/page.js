"use client";

import { createClient } from "@/lib/supabase-client";
import { useState } from "react";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      
      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage(
          data.session ? "Account created and logged in!" : "Account created!",
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });   

      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Logged in successfully!");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>
          {isSignUp ? "Sign Up" : "Log In"}
        </h2>

        {message && (
          <p
            style={{
              fontSize: "14px",
              color: message.startsWith("Error") ? "#dc2626" : "#16a34a",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleAuth}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "13px", color: "#666" }}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
