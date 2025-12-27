"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = validateMessage;
function validateMessage(input) {
    if (typeof input !== "string") {
        throw new Error("Invalid message");
    }
    const trimmed = input.trim();
    if (!trimmed) {
        throw new Error("Message cannot be empty");
    }
    if (trimmed.length > 2000) {
        return trimmed.slice(0, 2000);
    }
    return trimmed;
}
