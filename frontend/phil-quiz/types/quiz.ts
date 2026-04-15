import { questions } from "../data/philQuizQuestions";

export type CategoryKey = keyof typeof questions;

export type QuestionType = {
  question: string;
  choices: string[];
  answer: string;
};
