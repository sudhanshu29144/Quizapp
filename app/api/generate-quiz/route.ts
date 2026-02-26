      import { NextResponse } from "next/server";

      export async function POST(req: Request) {
      try {
      const { topic, difficulty, number } = await req.json();

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) throw new Error("Missing GROQ_API_KEY");

      const prompt = `
      Generate ${number} multiple choice questions on ${topic}.
      Difficulty: ${difficulty}.

      Return ONLY JSON array:

      [
      {
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": "",
      "explanation": ""
      }
      ]

      Do not wrap in markdown.
      `;

      const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
            model: "llama-3.1-8b-instant", // ✅ Updated Working Model
            messages: [
                  { role: "system", content: "You are a quiz generator API." },
                  { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
            }),
            }
      );

      const data = await response.json();

      if (!response.ok) {
            console.error("Groq API Error:", data);
            throw new Error(data.error?.message || "Groq request failed");
      }

      let text = data.choices?.[0]?.message?.content || "";

      text = text.replace(/```json/g, "")
                  .replace(/```/g, "")
                  .trim();

      return NextResponse.json(JSON.parse(text));

      } catch (error: any) {
      console.error("Final Groq Error:", error.message);
      return NextResponse.json(
            { error: error.message },
            { status: 500 }
      );
      }
      }
