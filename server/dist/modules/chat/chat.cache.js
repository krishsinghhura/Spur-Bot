"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationId = getConversationId;
exports.setConversationId = setConversationId;
exports.getCachedMessages = getCachedMessages;
exports.setCachedMessages = setCachedMessages;
const redis_1 = require("../../lib/redis");
const CONVO_TTL = 60 * 60 * 24;
const MSG_TTL = 60 * 5;
async function getConversationId(sessionId) {
    return redis_1.redis.get(`conversation:${sessionId}`);
}
async function setConversationId(sessionId, conversationId) {
    await redis_1.redis.set(`conversation:${sessionId}`, conversationId, "EX", CONVO_TTL);
}
async function getCachedMessages(conversationId) {
    const data = await redis_1.redis.get(`messages:${conversationId}`);
    return data ? JSON.parse(data) : null;
}
async function setCachedMessages(conversationId, messages) {
    await redis_1.redis.set(`messages:${conversationId}`, JSON.stringify(messages), "EX", MSG_TTL);
}
