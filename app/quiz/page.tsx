"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const params = useSearchParams();
  const topic = params.get("topic");
  const difficulty = params.get("difficulty");

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // ⏳ 60 seconds
  const [submitted, setSubmitted] = useState(false);

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          number: 5,
        }),
      });

      const data = await res.json();
      setQuestions(data);
    };

    fetchQuiz();
  }, []);

  // ⏳ Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Auto submit when time = 0
  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Quiz: {topic}</h2>
      <p>Difficulty: {difficulty}</p>

      {/* ⏳ Timer UI */}
      <h3 style={{ color: timeLeft <= 10 ? "red" : "black" }}>
        Time Left: {timeLeft}s
      </h3>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <h3>{index + 1}. {q.question}</h3>

          {q.options.map((opt: string, i: number) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt}
                  disabled={submitted}
                  onChange={() =>
                    setAnswers({ ...answers, [index]: opt })
                  }
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      {!submitted && (
        <button onClick={handleSubmit} style={{ padding: 10 }}>
          Submit
        </button>
      )}

      {score !== null && (
        <h2>
          Your Score: {score} / {questions.length}
        </h2>
      )}
    </div>
  );
}
