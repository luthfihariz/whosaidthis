export interface QuizQuestion {
  id: number;
  quote: string;
  options: string[];
  correct_answer: number;
  category: "global" | "indonesia";
}