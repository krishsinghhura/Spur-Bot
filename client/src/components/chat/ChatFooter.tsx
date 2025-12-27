const ChatFooter = () => {
  return (
    <div className="h-10 flex items-center justify-center bg-footer-bg border-t border-border">
      <p className="text-xs text-footer-text">
        Built by{' '}
        <a
          href="https://github.com/krishsinghhura"
          target="_blank"
          rel="noopener noreferrer"
          className="text-footer-link hover:underline transition-colors"
        >
          Krish Singh
        </a>
      </p>
    </div>
  );
};

export default ChatFooter;
