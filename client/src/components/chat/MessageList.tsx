import { useRef, useEffect } from 'react';
import type { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
      {messages.length === 0 && !isTyping && (
        <div className="flex flex-col items-center justify-center h-full text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <img className='rounded-xl' src="../../public/logo.jpg" alt="couldnt able to load logo" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Welcome to Spur Support
          </h3>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            Hi! I'm your AI assistant. Ask me anything about your orders, shipping, returns, or products.
          </p>
        </div>
      )}
      
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
