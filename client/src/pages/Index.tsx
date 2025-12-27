import ChatWidget from '@/components/chat/ChatWidget';

const Index = () => {
  return (
    <>
      <head>
        <title>Spur Support - AI-Powered Customer Chat</title>
        <meta name="description" content="Get instant help with your orders, shipping, returns, and products from Spur's AI-powered support assistant." />
      </head>
      
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <ChatWidget />
      </main>
    </>
  );
};

export default Index;
