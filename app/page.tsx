"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function LandingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleStartQuiz = () => {
    if (!session) {
      alert("⚠ Please login first to start quiz");
      router.push("/login");
    } else {
      router.push("/generate-quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">🚀 AI Quiz App</h1>

        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <span className="font-semibold">
                👋 {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-white text-indigo-700 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-indigo-700 px-4 py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Generate AI Powered Quizzes Instantly
        </h2>

        <button
          onClick={handleStartQuiz}
          className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
