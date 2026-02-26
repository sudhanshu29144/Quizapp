"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GenerateQuizPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    if (!topic) {
      alert("Please enter topic");
      return;
    }

    router.push(`/quiz?topic=${topic}&difficulty=${difficulty}`);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Generate Quiz</h2>

      <input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br /><br />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <br /><br />

      <button onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}