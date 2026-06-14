import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import { chunkText, PDF_CONFIG } from "@/lib/pdf-utils";

/**
 * API route for uploading and processing PDF documents.
 * Extracts text content and generates overlapping chunks for AI analysis.
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text content from PDF
    const data = await pdf(buffer);
    
    // Clean and limit text content for initial analysis
    const cleanText = data.text.replace(/\s+/g, ' ').trim();
    const truncatedText = cleanText.slice(0, PDF_CONFIG.MAX_TOTAL_CHARS);
    
    // Generate overlapping chunks for better AI context retention
    const chunks = chunkText(truncatedText);

    return NextResponse.json({
      text: truncatedText,
      chunks: chunks,
      chunkCount: chunks.length,
      numpages: data.numpages,
      info: data.info,
      filename: file.name
    });
  } catch (err: any) {
    console.error("PDF extraction error:", err);
    return NextResponse.json({ error: "Failed to read PDF document" }, { status: 500 });
  }
}
