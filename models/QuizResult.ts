import mongoose, { Schema, Document } from "mongoose";

export interface IQuizResult extends Document {
  topic: string;
  score: number;
  totalQuestions: number;
  createdAt: Date;
}

const QuizResultSchema: Schema = new Schema({
  topic: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.QuizResult ||
  mongoose.model<IQuizResult>("QuizResult", QuizResultSchema);
