import { redis } from "../../lib/redis";

const CONVO_TTL = 60 * 60 * 24;
const MSG_TTL = 60 * 5;

export async function getConversationId(sessionId: string) {
  return redis.get(`conversation:${sessionId}`);
}

export async function setConversationId(sessionId: string, conversationId: string) {
  await redis.set(`conversation:${sessionId}`, conversationId, "EX", CONVO_TTL);
}

export async function getCachedMessages(conversationId: string) {
  const data = await redis.get(`messages:${conversationId}`);
  return data ? JSON.parse(data) : null;
}

export async function setCachedMessages(conversationId: string, messages: any[]) {
  await redis.set(
    `messages:${conversationId}`,
    JSON.stringify(messages),
    "EX",
    MSG_TTL
  );
}
