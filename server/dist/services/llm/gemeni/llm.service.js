"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStreamingReply = generateStreamingReply;
const prompts_1 = require("../prompts");
const gemini_stream_1 = require("./gemini.stream");
async function generateStreamingReply(history, userMessage, onToken) {
    const conversation = history
        .map((m) => `${m.sender}: ${m.text}`)
        .join("\n");
    const finalPrompt = `
${prompts_1.SYSTEM_PROMPT}

Conversation so far:
${conversation}

User: ${userMessage}
AI:
`;
    await (0, gemini_stream_1.streamFromGemini)(finalPrompt, onToken);
}
