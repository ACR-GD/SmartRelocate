import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const emailCaptureMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/email-capture", { email });
    },
    onSuccess: () => {
      toast({
        title: t.emailSuccess,
        description: `Your personalized relocation checklist will be sent to ${email}`,
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: t.error,
        description: t.emailError,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      emailCaptureMutation.mutate(email);
    } else {
      toast({
        title: t.invalidEmail,
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">{t.emailTitle}</h2>
        <p className="text-xl text-blue-100 mb-8">{t.emailDescription}</p>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.enterEmailAddress}
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={emailCaptureMutation.isPending}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {emailCaptureMutation.isPending ? t.loading : t.getActionPlan}
            </button>
            <p className="text-xs text-blue-200">{t.getNotified}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
