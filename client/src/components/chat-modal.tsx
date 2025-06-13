import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ChatMessage, type AssessmentResponse } from "@shared/schema";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversation, isLoading } = useQuery({
    queryKey: [`/api/conversation`, sessionId],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/conversation", { sessionId });
      return response.json();
    },
    enabled: isOpen,
    refetchInterval: 2000, // Refetch every 2 seconds to get new messages
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, userInfo }: { message: string; userInfo?: any }) => {
      const response = await apiRequest("POST", `/api/conversation/${sessionId}/message`, {
        message,
        userInfo,
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/conversation`, sessionId] });
      setIsTyping(false);
      
      // Handle AI service errors
      if (data.error) {
        console.error("AI service error:", data.error);
      }
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
      setIsTyping(false);
    },
  });

  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const message = input.trim();
    setInput("");
    setIsTyping(true);

    sendMessageMutation.mutate({ message });
  };

  const handleQuestionClick = (questionText: string, questionType?: string) => {
    setIsTyping(true);

    const userInfo: any = {};
    if (questionType) {
      switch (questionType) {
        case "country":
          userInfo.userCountry = questionText;
          break;
        case "profession":
          userInfo.userProfession = questionText;
          break;
        case "family":
          userInfo.userFamily = questionText;
          break;
        case "income":
          userInfo.userIncome = questionText;
          break;
        case "timeline":
          userInfo.userTimeline = questionText;
          break;
      }
    }

    sendMessageMutation.mutate({ message: questionText, userInfo });
  };

  const quickQuestions = [
    { text: "What country are you from?", type: "country", icon: "🏴" },
    { text: "What do you do for a living?", type: "profession", icon: "💼" },
    { text: "Are you planning to move alone or with family?", type: "family", icon: "👥" },
    { text: "What's your expected monthly income?", type: "income", icon: "💰" },
    { text: "When are you thinking of moving?", type: "timeline", icon: "📅" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col">
        <DialogTitle className="sr-only">SmartRelocate AI Assistant</DialogTitle>
        <DialogDescription className="sr-only">
          Chat with our AI assistant to get personalized guidance for relocating to Malaysia
        </DialogDescription>
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-800 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">SmartRelocate AI Assistant</h3>
              <p className="text-sm text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Online & Ready to Help
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {/* Initial AI Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-lg">
                <p className="text-gray-800 mb-3">👋 Welcome to SmartRelocate.ai – your AI-powered relocation assistant!</p>
                <p className="text-gray-800 mb-3">I'll help you understand what options you have to live, work, or move to Malaysia based on your current situation.</p>
                <p className="text-gray-800 mb-2">To get started, could you tell me:</p>
                <ul className="text-gray-700 text-sm space-y-1 mb-3">
                  <li>🏴 What country are you from?</li>
                  <li>💼 What do you do for a living?</li>
                  <li>👥 Are you planning to move alone or with family?</li>
                  <li>💰 What's your expected monthly income?</li>
                  <li>📅 When are you thinking of moving?</li>
                </ul>
                <p className="text-gray-800 text-sm">You can answer all at once or one by one - whatever feels comfortable!</p>
              </div>
            </div>

            {/* Dynamic Messages */}
            {messages.map((message: ChatMessage) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'items-start space-x-3'}`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className={`rounded-2xl p-4 max-w-md ${
                  message.role === 'user' 
                    ? 'bg-red-600 text-white rounded-tr-sm' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Chat Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1"
              disabled={sendMessageMutation.isPending}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || sendMessageMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send or click a suggested question above</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
