import { v4 as uuidv4 } from 'uuid';
import type { Message } from '@/types/chat';

const SESSION_KEY = 'spur_chat_session_id';
const MESSAGES_KEY = 'spur_chat_messages';

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

export function getStoredMessages(): Message[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch {
    return [];
  }
}

export function storeMessages(messages: Message[]): void {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(MESSAGES_KEY);
}
