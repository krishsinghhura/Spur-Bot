import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <div
      className={cn(
        'flex items-end gap-2 animate-message-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-5">
          <span className="text-primary text-xs font-semibold">S</span>
        </div>
      )}
      
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={cn(
            'px-4 py-3 rounded-2xl message-shadow break-words',
            isUser
              ? 'bg-chat-user text-chat-user-foreground rounded-br-md'
              : isError
              ? 'bg-destructive/10 text-destructive rounded-tl-md border border-destructive/20'
              : 'bg-chat-ai text-chat-ai-foreground rounded-tl-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        
        <span
          className={cn(
            'text-[10px] text-chat-timestamp px-1',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {format(message.timestamp, 'h:mm a')}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
