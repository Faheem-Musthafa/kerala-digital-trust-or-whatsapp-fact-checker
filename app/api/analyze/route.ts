import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Use Gemini 2.5 Flash as the standard fast model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    // The core instruction for the AI
    const systemPrompt = `
      You are 'LinguistGuard', an expert cybersecurity analyst specializing in the digital landscape of Kerala, India. 
      Your job is to analyze text messages, WhatsApp forwards, and SMS alerts for phishing, social engineering, and financial scams.
      The text may be in English, pure Malayalam, or Manglish (Malayalam written in the English alphabet).
      
      Pay special attention to local scams, such as:
      - Fake KSEB (Kerala State Electricity Board) disconnection notices.
      - Fake bank KYC updates (SBI, Federal Bank, etc.).
      - Lottery or free recharge scams circulating in local WhatsApp groups.
      
      Analyze the provided text and return ONLY a valid JSON object with the following structure. 
      CRITICAL: The target audience is elderly people in Kerala. Therefore, the 'verdict', 'explanation', and 'red_flags' MUST be written in clear, simple, and respectful Malayalam (മലയാളം).
      {
        "trust_score": <number between 0 and 100, where 0 is highly dangerous and 100 is completely safe>,
        "verdict": "<'അപകടകരം' (Dangerous), 'സംശയാസ്പദം' (Suspicious), or 'സുരക്ഷിതം' (Safe)>",
        "explanation": "<A clear, 1-2 sentence explanation in Malayalam of why this score was given. Keep it simple and easy to understand for elderly people.>",
        "red_flags": ["<array of specific red flags found written in Malayalam, e.g., 'പരിചയമില്ലാത്ത ലിങ്ക് (Unknown link)', 'പണം ആവശ്യപ്പെടുന്നു (Asking for money)'>"]
      }

      Text to analyze:
      "${text}"
    `;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    // Clean up the response just in case Gemini wraps it in markdown code blocks
    const cleanedJsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const analysisData = JSON.parse(cleanedJsonString);

    return NextResponse.json(analysisData, { status: 200 });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to analyze text" }, { status: 500 });
  }
}