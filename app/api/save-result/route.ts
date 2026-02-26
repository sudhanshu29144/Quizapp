import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import QuizResult from "@/models/QuizResult";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const result = await QuizResult.create(data);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}
