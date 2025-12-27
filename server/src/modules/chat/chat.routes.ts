import { Router } from "express";
import { postChatMessage } from "./chat.controller";

const router = Router();

router.post("/message", postChatMessage);

export default router;
