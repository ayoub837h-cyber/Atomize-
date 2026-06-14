'use server';
/**
 * @fileOverview A strict AI chat agent optimized for document analysis following RAG principles.
 *
 * - generalChat - A function that handles conversational AI requests with document context.
 * - GeneralChatInput - The input type for the generalChat function.
 * - GeneralChatOutput - The return type for the generalChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneralChatInputSchema = z.object({
  message: z.string().describe("The user's message or question."),
  documentContext: z.string().optional().describe('Extracted text chunks from a PDF to be used as context.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })).optional().describe('Optional conversation history for context.'),
});
export type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.object({
  answer: z.string().describe('The AI generated response text.'),
  sources: z.array(z.string()).describe('The list of sources (chunks) used to generate the answer.'),
});
export type GeneralChatOutput = z.infer<typeof GeneralChatOutputSchema>;

/**
 * Server action to call the general chat flow.
 */
export async function generalChat(input: GeneralChatInput): Promise<GeneralChatOutput> {
  return generalChatFlow(input);
}

const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: GeneralChatInputSchema,
    outputSchema: GeneralChatOutputSchema,
  },
  async (input) => {
    const systemPrompt = `You are a PDF AI assistant.

RULES:
- Answer ONLY from the context provided below.
- If the answer is not found in the context, say "Not found in document".
- Be precise and stick to the facts.
- Quote the document when possible.`;

    const promptText = input.documentContext 
      ? `Context:
${input.documentContext}

Question:
${input.message}`
      : input.message;

    const { text } = await ai.generate({
      system: systemPrompt,
      prompt: promptText,
      history: input.history?.map(h => ({
        role: h.role,
        content: [{ text: h.content }]
      })),
    });
    
    // Returning the context as the source to provide transparency
    const sources = input.documentContext ? [input.documentContext] : [];

    return { 
      answer: text || 'Not found in document',
      sources: sources
    };
  }
);
