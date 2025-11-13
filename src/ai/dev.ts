import { config } from 'dotenv';
config();

import '@/ai/flows/generate-practice-quiz.ts';
import '@/ai/flows/provide-socratic-guidance.ts';
import '@/ai/flows/summarize-uploaded-material.ts';