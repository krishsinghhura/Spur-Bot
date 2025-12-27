import express from "express";
import cors from "cors";
import "dotenv/config";
import chatRoutes from "./modules/chat/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

export default app;
