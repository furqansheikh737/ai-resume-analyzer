import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const jobRole = formData.get("jobRole") || "Frontend Developer";

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // Step 1: File ko Base64 mein convert karein
    const bytes = await file.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString("base64");

    // Step 2: Gemini 2.5 Flash ko direct PDF bhejien!
    // Gemini PDF ko khud read kar sakta hai, humein library ki zaroorat hi nahi
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Analyze this resume for a ${jobRole} position. 
      Provide a score (0-100), 3 strengths, and 3 improvements.
      Return ONLY a JSON object in this format:
      {
        "score": number,
        "strengths": ["string", "string", "string"],
        "improvements": ["string", "string", "string"]
      }
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf",
        },
      },
      prompt,
    ]);

    const responseText = result.response.text();
    // Kabhi kabhi Gemini markdown blocks (```json) daita hai, usay clean karein
    const cleanJson = responseText.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error: any) {
    console.error("Gemini Direct Error:", error);
    return NextResponse.json(
      { error: "Analysis failed: " + error.message },
      { status: 500 },
    );
  }
}
