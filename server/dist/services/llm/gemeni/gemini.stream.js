"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamFromGemini = streamFromGemini;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function streamFromGemini(prompt, onToken) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContentStream(prompt);
    for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text)
            onToken(text);
    }
}
