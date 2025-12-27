import { SYSTEM_PROMPT } from "../prompts";
import { streamFromGemini } from "./gemini.stream";

export async function generateStreamingReply(
  history: any[],
  userMessage: string,
  onToken: (token: string) => void
) {
  const conversation = history
    .map((m) => `${m.sender}: ${m.text}`)
    .join("\n");

  const finalPrompt = `
${SYSTEM_PROMPT}

Conversation so far:
${conversation}

User: ${userMessage}
AI:
`;

  await streamFromGemini(finalPrompt, onToken);
}
