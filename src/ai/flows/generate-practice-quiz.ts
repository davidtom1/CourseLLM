'use server';

/**
 * @fileOverview Practice quiz generation flow for students.
 *
 * - generatePracticeQuiz - A function that generates a practice quiz on a specific topic.
 * - GeneratePracticeQuizInput - The input type for the generatePracticeQuiz function.
 * - GeneratePracticeQuizOutput - The return type for the generatePracticeQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeQuizInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a practice quiz.'),
});
export type GeneratePracticeQuizInput = z.infer<
  typeof GeneratePracticeQuizInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
});

const GeneratePracticeQuizOutputSchema = z.object({
  quiz: z
    .string()
    .describe(
      'A JSON string containing an array of 3 quiz questions. Each question should have a question, options, and correctAnswer.'
    ),
});

export type GeneratePracticeQuizOutput = z.infer<
  typeof GeneratePracticeQuizOutputSchema
>;

export async function generatePracticeQuiz(
  input: GeneratePracticeQuizInput
): Promise<GeneratePracticeQuizOutput> {
  return generatePracticeQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeQuizPrompt',
  input: {schema: GeneratePracticeQuizInputSchema},
  output: {
    schema: z.object({
      quiz: z.object({
        quiz: z.array(QuizQuestionSchema),
      }),
    }),
    format: 'json',
  },
  prompt: `You are a teaching assistant creating practice quizzes for university students.

  Generate a short quiz on the topic of {{{topic}}}. The quiz should consist of 3 multiple choice questions.
  
  For each question, provide 4 options. Ensure the correctAnswer exactly matches one of the provided options.
  
  Do not include a preamble.
  `,
});

const generatePracticeQuizFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuizFlow',
    inputSchema: GeneratePracticeQuizInputSchema,
    outputSchema: GeneratePracticeQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate quiz.');
    }
    return {
      quiz: JSON.stringify(output.quiz),
    };
  }
);
