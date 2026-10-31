import { GoogleGenAI } from "@google/genai";

export const generateLearningMaterials = async (transcript) => {
    if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
        throw new Error("A valid transcript is required");
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = process.env.GEMINI_MODEL;
    if (!model) {
        throw new Error("GEMINI_MODEL is not configured");
    }

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an expert educational assistant.

Your task is to create learning materials from a YouTube video transcript.

IMPORTANT RULES:
- Use only information supported by the transcript.
- Do not invent facts that the transcript does not support.
- Make the materials clear and beginner-friendly.
- Avoid unnecessary repetition.
- Return valid JSON only, following the requested structure.

TRANSCRIPT:
${transcript}

Create the following learning materials:

1. SUMMARY:
Write a concise but informative overview of the video.

2. TITLE:
Provide a clear , concise, and brief title for the learning materials.

3. NOTES:
Create organized (some detailed point if needed for long transcripts) notes covering the main concepts.
Each note must have a title and explanatory content.

4. FLASHCARDS:
Create useful question-and-answer flashcards for revision.

5. QUIZ:
Create multiple-choice questions.
Each question must have four options, one correct answer,
and a short explanation.

Return JSON using exactly this structure:

{       
    "title": "Title text",
    "summary": "Summary text",
    "notes": [
        {
            "title": "Topic title",
            "content": "Explanation"
        }
    ],
    "flashcards": [
        {
            "question": "Question text",
            "answer": "Answer text"
        }
    ],
    "quiz": [
        {
            "question": "Question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Why this answer is correct"
        }
    ]
}
`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.3,
            },
        });

        const responseText = response.text;

        if (!responseText) {
            throw new Error("Gemini returned an empty response");
        }

        let materials;

        try {
            materials = JSON.parse(responseText);
        } catch {
            throw new Error("Gemini returned invalid JSON");
        }

        if (
            typeof materials.summary !== "string" ||
            !Array.isArray(materials.notes) ||
            !Array.isArray(materials.flashcards) ||
            !Array.isArray(materials.quiz)
        ) {
            throw new Error("Gemini returned an unexpected response structure");
        }

        return materials;
    } catch (error) {
        console.error("AI generation failed:", error.message);

        throw new Error("Failed to generate learning materials");
    }
};
