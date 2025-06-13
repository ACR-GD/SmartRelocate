import { useLanguage } from "@/hooks/use-language";
import { useUserPlan, UserPlan } from "@/hooks/use-user-plan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Lock, Crown, Star } from "lucide-react";

interface PricingTier {
  id: UserPlan;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  icon: React.ReactNode;
}

export default function Pricing() {
  const { t } = useLanguage();
  const { userPlan, setUserPlan, hasAccess } = useUserPlan();

  const tiers: PricingTier[] = [
    {
      id: "free",
      name: t.freePlan,
      price: "$0",
      description: t.perfectForExploringOptions,
      features: [
        t.basicVisaEligibility,
        t.aiChatGuidance,
        t.countryComparisonTool,
        t.basicCostEstimates,
        t.communityForumAccess
      ],
      buttonText: userPlan === "free" ? t.currentPlan : t.freePlan,
      icon: <Star className="w-6 h-6" />
    },
    {
      id: "starter",
      name: t.starterPlan,
      price: "$19",
      description: t.oneTime,
      features: [
        t.unlimitedAiAssessments,
        t.pdfExportChecklist,
        t.detailedVisaRequirements,
        t.priorityAiChatResponses,
        t.emailSupport
      ],
      buttonText: userPlan === "starter" ? t.currentPlan : t.getPdfGuide,
      icon: <Check className="w-6 h-6" />
    },
    {
      id: "pro",
      name: t.professionalPlan,
      price: "$9/" + t.perMonth.toLowerCase(),
      description: t.professionalPlanDescription,
      features: [
        t.unlimitedAiAssessmentsLabel,
        t.relocationBudgetCalculator,
        t.savedRelocationProfiles,
        t.visaStatusAlerts,
        t.unlimitedAiAssessments,
        t.taxPlanningGuidance
      ],
      buttonText: userPlan === "pro" ? t.currentPlan : t.selectPlan,
      popular: true,
      icon: <Crown className="w-6 h-6" />
    },
    {
      id: "premium",
      name: t.premiumPlan,
      price: "$499",
      description: t.fullService,
      features: [
        t.unlimitedAiAssessmentsLabel,
        t.oneOnOneConsultation,
        t.documentPreparationService,
        t.visaApplicationAssistance,
        t.bankAccountSetupGuidance,
        t.housingJobSearchSupport,
        t.dedicatedRelocationManager
      ],
      buttonText: userPlan === "premium" ? t.currentPlan : t.selectPlan,
      icon: <Lock className="w-6 h-6" />
    }
  ];

  const handlePlanSelect = (planId: UserPlan) => {
    if (planId === "premium") {
      // For premium, we'd typically open a contact form or redirect to consultation booking
      alert("Premium consultation booking would open here");
      return;
    }
    
    if (planId === "free") {
      setUserPlan("free");
      return;
    }

    // For starter and pro, we'd typically integrate with Stripe
    // For now, simulate plan upgrade
    setUserPlan(planId);
    alert(`Upgraded to ${planId} plan! (This is a demo - no payment processed)`);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.chooseYourRelocationPlan}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            {t.fromBasicGuidanceToFullService}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                tier.popular 
                  ? 'border-red-500 ring-2 ring-red-200 scale-105' 
                  : 'border-gray-200'
              } ${
                userPlan === tier.id 
                  ? 'bg-blue-50 border-blue-500' 
                  : 'bg-white'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white">
                  {t.recommended}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  {tier.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {tier.name}
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {tier.price}
                </div>
                <p className="text-sm text-gray-600">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handlePlanSelect(tier.id)}
                  disabled={userPlan === tier.id}
                  className={`w-full ${
                    tier.popular 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : userPlan === tier.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  variant={userPlan === tier.id ? "secondary" : "default"}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {t.allPlansIncludeCore}
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✓ {t.thirtyDayMoneyBack}</span>
            <span>✓ {t.securePaymentProcessing}</span>
            <span>✓ {t.cancelAnytime}</span>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={() => {
                const tableElement = document.getElementById('pricing-table');
                if (tableElement) {
                  tableElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              {t.compareAllFeatures}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}