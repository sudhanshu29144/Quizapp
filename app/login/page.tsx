"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      alert(result.error);
      return;
    }

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-black">Login to Continue</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-3 border rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 border rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-semibold"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
