import { prisma } from "../../lib/prisma";

export async function createConversation() {
  return prisma.conversation.create({ data: {} });
}

export async function saveMessage(
  conversationId: string,
  sender: "user" | "ai",
  text: string
) {
  return prisma.message.create({
    data: { conversationId, sender, text },
  });
}

export async function getRecentMessages(conversationId: string, limit = 10) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
}
