"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversation = createConversation;
exports.saveMessage = saveMessage;
exports.getRecentMessages = getRecentMessages;
const prisma_1 = require("../../lib/prisma");
async function createConversation() {
    return prisma_1.prisma.conversation.create({ data: {} });
}
async function saveMessage(conversationId, sender, text) {
    return prisma_1.prisma.message.create({
        data: { conversationId, sender, text },
    });
}
async function getRecentMessages(conversationId, limit = 10) {
    return prisma_1.prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
        take: limit,
    });
}
