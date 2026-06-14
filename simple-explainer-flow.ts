'use server';
/**
 * @fileOverview An AI agent that drafts customized email body text for split documents.
 *
 * - predictiveEmailTemplating - A function that handles the email drafting process.
 * - PredictiveEmailTemplatingInput - The input type for the predictiveEmailTemplating function.
 * - PredictiveEmailTemplatingOutput - The return type for the predictiveEmailTemplating function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveEmailTemplatingInputSchema = z.object({
  documentContent: z
    .string()
    .describe(
      'The content or a summary of the split PDF document for which the email is being drafted.'
    ),
  recipientName: z
    .string()
    .describe('The name of the recipient of the email.'),
  documentName: z
    .string()
    .describe('The name of the document being sent.'),
  purpose: z
    .string()
    .describe(
      'The purpose of sending the document (e.g., "for review", "for signature", "information", "monthly report").'
    ),
});
export type PredictiveEmailTemplatingInput = z.infer<
  typeof PredictiveEmailTemplatingInputSchema
>;

const PredictiveEmailTemplatingOutputSchema = z.object({
  subject: z.string().describe('A concise and professional email subject line.'),
  body: z
    .string()
    .describe('The drafted email body text, customized for the document and recipient.'),
});
export type PredictiveEmailTemplatingOutput = z.infer<
  typeof PredictiveEmailTemplatingOutputSchema
>;

export async function predictiveEmailTemplating(
  input: PredictiveEmailTemplatingInput
): Promise<PredictiveEmailTemplatingOutput> {
  return predictiveEmailTemplatingFlow(input);
}

const predictiveEmailTemplatingPrompt = ai.definePrompt({
  name: 'predictiveEmailTemplatingPrompt',
  input: {schema: PredictiveEmailTemplatingInputSchema},
  output: {schema: PredictiveEmailTemplatingOutputSchema},
  prompt: `You are a professional email assistant specialized in drafting emails for sending PDF documents.

Draft a polite and professional email for sending a document. The email should be customized based on the document's content, the recipient, and the purpose of sending.

Here is the information:
Recipient Name: {{{recipientName}}}
Document Name: {{{documentName}}}
Purpose: {{{purpose}}}
Document Content Summary: {{{documentContent}}}

Ensure the email includes a clear subject line and a polite body. The tone should be professional and helpful. Do not include placeholders for attachments, as the system handles that automatically.
`,
});

const predictiveEmailTemplatingFlow = ai.defineFlow(
  {
    name: 'predictiveEmailTemplatingFlow',
    inputSchema: PredictiveEmailTemplatingInputSchema,
    outputSchema: PredictiveEmailTemplatingOutputSchema,
  },
  async input => {
    const {output} = await predictiveEmailTemplatingPrompt(input);
    return output!;
  }
);
