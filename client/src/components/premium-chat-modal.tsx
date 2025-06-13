import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Loader2, Crown, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserPlan } from "@/hooks/use-user-plan";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@shared/schema";

interface PremiumChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowPricing?: () => void;
  userProfile?: any;
  recommendedVisa?: string;
}

export default function PremiumChatModal({ 
  isOpen, 
  onClose, 
  onShowPricing,
  userProfile,
  recommendedVisa 
}: PremiumChatModalProps) {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { userPlan } = useUserPlan();

  // Check if user has access to chat feature
  const hasProAccess = userPlan === 'pro' || userPlan === 'premium';

  const { data: conversation, isLoading } = useQuery({
    queryKey: [`/api/conversation`, sessionId],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/conversation", { sessionId });
      return response.json();
    },
    enabled: isOpen && hasProAccess,
    refetchInterval: 2000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, userInfo }: { message: string; userInfo?: any }) => {
      const response = await apiRequest("POST", `/api/conversation/${sessionId}/message`, {
        message,
        userInfo: userInfo || userProfile,
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/conversation`, sessionId] });
      setIsTyping(false);
      
      if (data.error) {
        toast({
          title: "Error",
          description: "There was an issue processing your message. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please check your connection.",
        variant: "destructive",
      });
      setIsTyping(false);
    },
  });

  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!input.trim() || !hasProAccess) return;

    const message = input.trim();
    setInput("");
    setIsTyping(true);

    sendMessageMutation.mutate({ message });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Animation variants
  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  if (!hasProAccess) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md">
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center p-6"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Feature</h3>
            <p className="text-gray-600 mb-6">
              Get personalized AI assistance for your Malaysia relocation with detailed answers, 
              step-by-step guidance, and expert recommendations.
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">What you'll get:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Personalized visa guidance</li>
                  <li>• Step-by-step relocation planning</li>
                  <li>• Real-time answers to your questions</li>
                  <li>• Expert recommendations</li>
                </ul>
              </div>
              <Button 
                onClick={onShowPricing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col">
        <DialogTitle className="sr-only">SmartRelocate AI Assistant</DialogTitle>
        <DialogDescription className="sr-only">
          Premium AI chat for personalized Malaysia relocation guidance
        </DialogDescription>
        
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 flex items-center space-x-2">
                <span>SmartRelocate AI Assistant</span>
                <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </h3>
              <p className="text-sm text-gray-600">Personalized guidance for your Malaysia relocation</p>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {/* Initial AI Message */}
            <motion.div 
              className="flex items-start space-x-3"
              variants={messageVariants}
              initial="initial"
              animate="animate"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-blue-50 rounded-2xl rounded-tl-sm p-4 max-w-lg">
                <p className="text-gray-800 mb-3">👋 Welcome to your premium AI assistant!</p>
                <p className="text-gray-800 mb-3">I have access to your assessment results and can provide personalized guidance for your Malaysia relocation.</p>
                {recommendedVisa && (
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-blue-900">Your recommended visa: {recommendedVisa}</p>
                  </div>
                )}
                <p className="text-gray-800 text-sm">What specific questions do you have about your relocation process?</p>
              </div>
            </motion.div>

            {/* Dynamic Messages */}
            <AnimatePresence>
              {messages.map((message: ChatMessage) => (
                <motion.div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'items-start space-x-3'}`}
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div className={`rounded-2xl p-4 max-w-md ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm order-1' 
                      : 'bg-blue-50 text-gray-800 rounded-tl-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                className="flex items-start space-x-3"
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tl-sm p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex space-x-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about visa requirements, costs, timeline..."
              className="flex-1"
              disabled={sendMessageMutation.isPending}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || sendMessageMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Premium AI assistant • Personalized guidance based on your assessment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}