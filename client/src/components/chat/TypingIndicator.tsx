const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-2 animate-message-in">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-primary text-xs font-semibold">S</span>
      </div>
      <div className="bg-chat-ai text-chat-ai-foreground px-4 py-3 rounded-2xl rounded-tl-md message-shadow">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground mr-1">Spur is typing</span>
          <span className="w-1.5 h-1.5 rounded-full bg-chat-typing typing-dot"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-chat-typing typing-dot"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-chat-typing typing-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
