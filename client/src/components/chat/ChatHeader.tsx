import { MessageSquare, Sparkles } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="px-5 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h1 className="font-semibold text-foreground">Spur Support</h1>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">AI-powered</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
