import {
  createConversation,
  saveMessage,
  getRecentMessages,
} from "./chat.repository";
import {
  getConversationId,
  setConversationId,
  getCachedMessages,
  setCachedMessages,
} from "./chat.cache";
import { generateStreamingReply } from "../../services/llm/gemeni/llm.service";

export async function handleChatStream(
  sessionId: string,
  userMessage: string,
  res: any
) {
  let conversationId = await getConversationId(sessionId);

  if (!conversationId) {
    const convo = await createConversation();
    conversationId = convo.id;
    await setConversationId(sessionId, conversationId);
  }

  await saveMessage(conversationId, "user", userMessage);

  let history = await getCachedMessages(conversationId);

  if (!history) {
    history = await getRecentMessages(conversationId);
    await setCachedMessages(conversationId, history);
  }

  let fullReply = "";

  await generateStreamingReply(history, userMessage, (token) => {
    fullReply += token;
    res.write(token);
  });

  await saveMessage(conversationId, "ai", fullReply);

  const updated = [...history, { sender: "ai", text: fullReply }];
  await setCachedMessages(conversationId, updated);

  res.end();
}
