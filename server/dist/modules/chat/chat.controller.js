"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postChatMessage = postChatMessage;
const validate_1 = require("../../utils/validate");
const chat_service_1 = require("./chat.service");
async function postChatMessage(req, res) {
    try {
        const message = (0, validate_1.validateMessage)(req.body.message);
        const sessionId = req.body.sessionId;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        await (0, chat_service_1.handleChatStream)(sessionId, message, res);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
