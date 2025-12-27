"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatStream = handleChatStream;
const chat_repository_1 = require("./chat.repository");
const chat_cache_1 = require("./chat.cache");
const llm_service_1 = require("../../services/llm/gemeni/llm.service");
async function handleChatStream(sessionId, userMessage, res) {
    let conversationId = await (0, chat_cache_1.getConversationId)(sessionId);
    if (!conversationId) {
        const convo = await (0, chat_repository_1.createConversation)();
        conversationId = convo.id;
        await (0, chat_cache_1.setConversationId)(sessionId, conversationId);
    }
    await (0, chat_repository_1.saveMessage)(conversationId, "user", userMessage);
    let history = await (0, chat_cache_1.getCachedMessages)(conversationId);
    if (!history) {
        history = await (0, chat_repository_1.getRecentMessages)(conversationId);
        await (0, chat_cache_1.setCachedMessages)(conversationId, history);
    }
    let fullReply = "";
    await (0, llm_service_1.generateStreamingReply)(history, userMessage, (token) => {
        fullReply += token;
        res.write(token);
    });
    await (0, chat_repository_1.saveMessage)(conversationId, "ai", fullReply);
    const updated = [...history, { sender: "ai", text: fullReply }];
    await (0, chat_cache_1.setCachedMessages)(conversationId, updated);
    res.end();
}
