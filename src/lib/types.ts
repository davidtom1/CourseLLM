export type Course = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type Topic = {
  id: string;
  name: string;
  mastery: 'strong' | 'needs_practice' | 'weak';
};

export type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  isLoading?: boolean;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};
