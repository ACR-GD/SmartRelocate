import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

interface PricingFeature {
  name: string;
  free: boolean | string;
  starter: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

export default function PricingTable() {
  const { t } = useLanguage();

  const features: PricingFeature[] = [
    {
      name: t.basicVisaEligibility,
      free: true,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.aiChatGuidance,
      free: true,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.countryComparisonTool,
      free: true,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.basicCostEstimates,
      free: true,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.communityForumAccess,
      free: true,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.pdfExportChecklist,
      free: false,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.detailedVisaRequirements,
      free: false,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.priorityAiChatResponses,
      free: false,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.emailSupport,
      free: false,
      starter: true,
      pro: true,
      premium: true
    },
    {
      name: t.relocationBudgetCalculator,
      free: false,
      starter: false,
      pro: true,
      premium: true
    },
    {
      name: t.savedRelocationProfiles,
      free: false,
      starter: false,
      pro: true,
      premium: true
    },
    {
      name: t.visaStatusAlerts,
      free: false,
      starter: false,
      pro: true,
      premium: true
    },
    {
      name: t.unlimitedAiAssessmentsLabel,
      free: t.threePerMonth,
      starter: t.tenPerMonth,
      pro: true,
      premium: true
    },
    {
      name: t.taxPlanningGuidance,
      free: false,
      starter: false,
      pro: true,
      premium: true
    },
    {
      name: t.oneOnOneConsultation,
      free: false,
      starter: false,
      pro: false,
      premium: t.twoSessions
    },
    {
      name: t.documentPreparationService,
      free: false,
      starter: false,
      pro: false,
      premium: true
    },
    {
      name: t.visaApplicationAssistance,
      free: false,
      starter: false,
      pro: false,
      premium: true
    },
    {
      name: t.bankAccountSetupGuidance,
      free: false,
      starter: false,
      pro: false,
      premium: true
    },
    {
      name: t.housingJobSearchSupport,
      free: false,
      starter: false,
      pro: false,
      premium: true
    },
    {
      name: t.dedicatedRelocationManager,
      free: false,
      starter: false,
      pro: false,
      premium: true
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-600 mx-auto" />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-gray-400 mx-auto" />;
    }
    return <span className="text-sm text-gray-700 text-center">{value}</span>;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.compareAllPlans}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            {t.detailedFeatureComparison}
          </p>
        </div>

        {/* Mobile View - Stack cards */}
        <div className="lg:hidden space-y-4">
          {[
            { name: t.free, price: "$0", period: t.forever, color: "gray", current: true, planKey: "free" },
            { name: t.starterPlan, price: "$19", period: t.oneTime, color: "blue", recommended: false, planKey: "starter" },
            { name: t.professionalPlan, price: "$9", period: t.perMonth, color: "purple", recommended: true, planKey: "pro" },
            { name: t.enterprisePlan, price: "$499", period: t.fullService, color: "amber", recommended: false, planKey: "premium" }
          ].map((plan, planIndex) => (
            <Card key={plan.name} className="overflow-hidden">
              <CardHeader className="text-center bg-white border-b relative">
                {plan.recommended && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs">
                    {t.recommended}
                  </Badge>
                )}
                <CardTitle className={`text-${plan.color}-600 ${plan.recommended ? 'mt-4' : ''}`}>
                  {plan.name}
                </CardTitle>
                <p className="text-2xl font-bold text-gray-900 mt-2">{plan.price}</p>
                <p className="text-sm text-gray-500">{plan.period}</p>
                <Button 
                  className={`mt-4 w-full ${
                    plan.current 
                      ? 'bg-gray-200 text-gray-500' 
                      : plan.color === 'blue' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : plan.color === 'purple'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                  disabled={plan.current}
                  onClick={() => {
                    if (plan.name === 'Starter') {
                      window.location.href = '/pdf-guide';
                    } else {
                      alert(`${plan.name} plan selected! Contact us for setup.`);
                    }
                  }}
                >
                  {plan.current ? t.currentPlan : `Get ${plan.name}`}
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {features.map((feature, featureIndex) => {
                    const planValue = plan.planKey as keyof PricingFeature;
                    const value = feature[planValue];
                    if (value === false) return null;
                    
                    return (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">
                          {feature.name}
                          {typeof value === 'string' && value !== 'true' ? ` (${value})` : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop View - Table */}
        <Card className="overflow-hidden hidden lg:block">
          <CardHeader className="bg-white border-b">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-4 min-w-full">
                <div className="text-left min-w-0">
                  <CardTitle className="text-sm lg:text-base">{t.compareAllFeatures}</CardTitle>
                </div>
                <div className="text-center min-w-0">
                  <CardTitle className="text-gray-600 text-sm lg:text-base">{t.free}</CardTitle>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-2">$0</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t.forever}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full text-xs lg:text-sm"
                    disabled
                  >
                    {t.currentPlan}
                  </Button>
                </div>
                <div className="text-center min-w-0">
                  <CardTitle className="text-blue-600 text-sm lg:text-base">{t.starterPlan}</CardTitle>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-2">$19</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t.oneTime}</p>
                  <Button 
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-xs lg:text-sm"
                    onClick={() => window.location.href = '/pdf-guide'}
                  >
                    {t.getPdfGuide}
                  </Button>
                </div>
                <div className="text-center relative min-w-0">
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs">
                    {t.recommended}
                  </Badge>
                  <CardTitle className="text-purple-600 mt-4 text-sm lg:text-base">{t.professionalPlan}</CardTitle>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-2">$9</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t.perMonth}</p>
                  <Button 
                    className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-xs lg:text-sm"
                    onClick={() => alert('Pro subscription coming soon!')}
                  >
                    {t.selectPlan}
                  </Button>
                </div>
                <div className="text-center min-w-0">
                  <CardTitle className="text-amber-600 text-sm lg:text-base">{t.premiumPlan}</CardTitle>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-2">$499</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t.fullService}</p>
                  <Button 
                    className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-xs lg:text-sm"
                    onClick={() => alert('Premium service available! Contact us.')}
                  >
                    {t.selectPlan}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-5 gap-2 lg:gap-4 p-2 lg:p-4 border-b border-gray-100 min-w-full ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-left font-medium text-gray-900 text-xs lg:text-sm min-w-0 pr-2">
                    {feature.name}
                  </div>
                  <div className="text-center min-w-0">
                    {renderFeatureValue(feature.free)}
                  </div>
                  <div className="text-center min-w-0">
                    {renderFeatureValue(feature.starter)}
                  </div>
                  <div className="text-center min-w-0">
                    {renderFeatureValue(feature.pro)}
                  </div>
                  <div className="text-center min-w-0">
                    {renderFeatureValue(feature.premium)}
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom Action Buttons Row */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-2 lg:gap-4 p-4 lg:p-6 bg-gray-50 border-t-2 min-w-full">
                <div className="text-left font-medium text-gray-900 flex items-center text-xs lg:text-sm min-w-0">
                  Choose Your Plan
                </div>
                <div className="text-center min-w-0">
                  <Button 
                    variant="outline" 
                    className="w-full text-xs lg:text-sm"
                    disabled
                  >
                    {t.currentPlan}
                  </Button>
                </div>
                <div className="text-center min-w-0">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-xs lg:text-sm"
                    onClick={() => window.location.href = '/pdf-guide'}
                  >
                    {t.getPdfGuide}
                  </Button>
                </div>
                <div className="text-center min-w-0">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-xs lg:text-sm"
                    onClick={() => {
                      alert('Pro subscription coming soon! Contact us for early access.');
                    }}
                  >
                    {t.selectPlan}
                  </Button>
                </div>
                <div className="text-center min-w-0">
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-xs lg:text-sm"
                    onClick={() => {
                      alert('Premium service available! Contact us for personalized consultation.');
                    }}
                  >
                    {t.selectPlan}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {t.allPlansIncludeCore}
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✓ {t.thirtyDayMoneyBack}</span>
            <span>✓ {t.securePaymentProcessing}</span>
            <span>✓ {t.cancelAnytime}</span>
          </div>
        </div>
      </div>
    </section>
  );
}