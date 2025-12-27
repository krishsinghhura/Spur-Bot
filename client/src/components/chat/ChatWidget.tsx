import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from '@/types/chat';
import { getOrCreateSessionId, getStoredMessages, storeMessages } from '@/lib/session';
import { sendMessage } from '@/lib/api';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ChatFooter from './ChatFooter';
import { Card } from '@/components/ui/card';

const ChatWidget = () => {
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [messages, setMessages] = useState<Message[]>(() => getStoredMessages());
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Persist messages to localStorage
  useEffect(() => {
    storeMessages(messages);
  }, [messages]);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setIsTyping(true);

    try {
      const response = await sendMessage({
        message: content,
        sessionId,
      });

      const aiMessage: Message = {
        id: uuidv4(),
        content: response.reply,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: uuidv4(),
        content: error instanceof Error 
          ? error.message 
          : 'Sorry, something went wrong. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  }, [sessionId]);

  return (
    <Card className="w-full max-w-[480px] h-[680px] flex flex-col overflow-hidden chat-shadow border-border/50">
      <ChatHeader />
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSend={handleSendMessage} disabled={isSending} />
      <ChatFooter />
    </Card>
  );
};

export default ChatWidget;
