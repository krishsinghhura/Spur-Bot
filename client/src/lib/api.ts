import type { ChatApiRequest, ChatApiResponse } from '@/types/chat';

const API_BASE = '/api';

// Mock responses for demo - simulates real API behavior
const mockResponses = [
  "Hi there! 👋 Welcome to Spur. I'm here to help you with any questions about your order or our products. What can I assist you with today?",
  "Great question! Our standard shipping takes 3-5 business days, and express shipping is 1-2 days. Would you like me to check the status of a specific order?",
  "I'd be happy to help you with that! Could you provide your order number? It should be in your confirmation email.",
  "Absolutely! We offer a 30-day return policy on all items. Just make sure the product is unused and in its original packaging. Would you like me to start a return for you?",
  "I understand how frustrating that can be. Let me look into this for you right away. Can you describe the issue you're experiencing?",
  "Thanks for your patience! I've found your order and it looks like it's currently in transit. You should receive it within the next 2 days.",
  "Is there anything else I can help you with today? I'm here if you have more questions!",
];

let responseIndex = 0;

export async function sendMessage(request: ChatApiRequest): Promise<ChatApiResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Network error. Please try again.');
  }
  
  const reply = mockResponses[responseIndex % mockResponses.length];
  responseIndex++;
  
  return {
    reply,
    sessionId: request.sessionId,
  };
}

// Real API implementation (uncomment when backend is ready)
/*
export async function sendMessage(request: ChatApiRequest): Promise<ChatApiResponse> {
  const response = await fetch(`${API_BASE}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message. Please try again.');
  }
  
  return response.json();
}
*/
