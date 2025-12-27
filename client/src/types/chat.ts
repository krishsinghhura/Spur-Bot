export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isError?: boolean;
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
}

export interface ChatApiRequest {
  message: string;
  sessionId: string;
}

export interface ChatApiResponse {
  reply: string;
  sessionId: string;
}
