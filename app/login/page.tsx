"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage() {
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      username,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-black">
          Login to Continue
        </h2>

        <input
          type="text"
          placeholder="Enter username"
          className="w-full p-3 border rounded-lg mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
        >
          Login
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
