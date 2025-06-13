import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

export default function PdfPaywallForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const startCheckout = async () => {
    if (!email) {
      toast({
        title: t.emailRequired,
        description: t.pleaseEnterEmailToContinue,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      setLoading(false);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-xl font-bold">{t.malaysiaRelocationGuide}</CardTitle>
        <CardDescription>
          {t.completePdfChecklist}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{t.completeVisaComparisonChart}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{t.costBreakdownByVisaType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{t.stepByStepApplicationProcess}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{t.livingCostsByCity}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.emailAddress}</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button
            disabled={loading}
            onClick={startCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                {t.redirecting}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t.buyGuideFor19}
              </div>
            )}
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          {t.securePaymentStripe} • {t.instantDownloadAfterPayment}
        </div>
      </CardContent>
    </Card>
  );
}