import { Request, Response } from "express";
import { validateMessage } from "../../utils/validate";
import { handleChatStream } from "./chat.service";

export async function postChatMessage(req: Request, res: Response) {
  try {
    const message = validateMessage(req.body.message);
    const sessionId = req.body.sessionId;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    await handleChatStream(sessionId, message, res);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
