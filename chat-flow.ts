'use server';
/**
 * @fileOverview An AI agent that analyzes PDF content to suggest optimal split points and generate relevant filenames.
 *
 * - aiContentOrganizer - A function that handles the content organization process.
 * - AiContentOrganizerInput - The input type for the aiContentOrganizer function.
 * - AiContentOrganizerOutput - The return type for the aiContentOrganizer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiContentOrganizerInputSchema = z.object({
  pdfContent: z
    .string()
    .describe('The extracted text content of the PDF document.'),
  originalFilename: z
    .string()
    .describe('The original filename of the PDF document.'),
});
export type AiContentOrganizerInput = z.infer<
  typeof AiContentOrganizerInputSchema
>;

const AiContentOrganizerOutputSchema = z.object({
  suggestedSplits: z
    .array(
      z.object({
        startPage: z
          .number()
          .describe('The starting page number for this split section (1-indexed).'),
        endPage: z
          .number()
          .describe('The ending page number for this split section (1-indexed).'),
        suggestedFilename: z
          .string()
          .describe('A suggested descriptive filename for this section.'),
      }),
    )
    .describe('An array of suggested split points and corresponding filenames.'),
});
export type AiContentOrganizerOutput = z.infer<
  typeof AiContentOrganizerOutputSchema
>;

export async function aiContentOrganizer(
  input: AiContentOrganizerInput,
): Promise<AiContentOrganizerOutput> {
  return aiContentOrganizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiContentOrganizerPrompt',
  input: { schema: AiContentOrganizerInputSchema },
  output: { schema: AiContentOrganizerOutputSchema },
  prompt: `You are an AI assistant specialized in organizing PDF documents. Your task is to analyze the provided PDF content, identify logical sections, and suggest optimal split points (defined by start and end page numbers) for new documents. For each suggested split, you must also generate a relevant and descriptive filename.\n\nThe original document is named: "{{originalFilename}}"\n\nHere is the content of the PDF document:\n{{{pdfContent}}}\n\nBased on this content, provide a JSON array of objects, where each object represents a suggested split. Each object must contain:\n- 'startPage': The 1-indexed starting page number of the section.\n- 'endPage': The 1-indexed ending page number of the section.\n- 'suggestedFilename': A descriptive filename for the extracted section. Make sure the filename is concise and clearly indicates the content of that section. Do not include file extensions.\n\nExample:\nIf the document is a report with an Executive Summary (pages 1-2), an Introduction (pages 3-5), and a Conclusion (pages 6-7), your output should look like this:\n[\n  {\n    "startPage": 1,\n    "endPage": 2,\n    "suggestedFilename": "Executive Summary"\n  },\n  {\n    "startPage": 3,\n    "endPage": 5,\n    "suggestedFilename": "Introduction to Report"\n  },\n  {\n    "startPage": 6,\n    "endPage": 7,\n    "suggestedFilename": "Report Conclusion"\n  }\n]\n\nConsider the overall structure, headings, and thematic changes in the content to determine the best split points. Aim for meaningful, self-contained sections.`,
});

const aiContentOrganizerFlow = ai.defineFlow(
  {
    name: 'aiContentOrganizerFlow',
    inputSchema: AiContentOrganizerInputSchema,
    outputSchema: AiContentOrganizerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
