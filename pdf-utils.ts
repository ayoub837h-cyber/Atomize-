/**
 * Utility functions for processing PDF text content.
 */

export const PDF_CONFIG = {
  CHUNK_SIZE: 800,
  OVERLAP: 150,
  MAX_TOTAL_CHARS: 20000,
};

/**
 * Splits a string of text into overlapping chunks.
 * @param text The full text to chunk.
 * @param chunkSize The maximum size of each chunk.
 * @param overlap The number of characters to overlap between chunks.
 * @returns An array of text chunks.
 */
export function chunkText(
  text: string,
  chunkSize: number = PDF_CONFIG.CHUNK_SIZE,
  overlap: number = PDF_CONFIG.OVERLAP
): string[] {
  if (!text) return [];
  if (chunkSize <= overlap) return [text];

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    
    if (end === text.length) break;
    start += chunkSize - overlap;
  }

  return chunks;
}
