import { Lock, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserPlan, UserPlan } from "@/hooks/use-user-plan";

interface LockedOverlayProps {
  requiredPlan: UserPlan;
  featureName: string;
  description: string;
  onUpgrade?: () => void;
  children?: React.ReactNode;
}

const planDetails = {
  starter: {
    price: "$19",
    name: "Starter",
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  pro: {
    price: "$9/month",
    name: "Pro",
    icon: <Crown className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  premium: {
    price: "$499",
    name: "Premium",
    icon: <Lock className="w-5 h-5" />,
    color: "text-gold-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  }
};

export default function LockedOverlay({ 
  requiredPlan, 
  featureName, 
  description, 
  onUpgrade,
  children 
}: LockedOverlayProps) {
  const { setUserPlan } = useUserPlan();
  const plan = planDetails[requiredPlan as keyof typeof planDetails];

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      // Default upgrade behavior
      if (requiredPlan === "premium") {
        alert("Premium consultation booking would open here");
      } else {
        setUserPlan(requiredPlan);
        alert(`Upgraded to ${requiredPlan} plan! (Demo - no payment processed)`);
      }
    }
  };

  return (
    <div className="relative">
      {children && (
        <div className="relative">
          <div className="blur-sm pointer-events-none select-none">
            {children}
          </div>
          <div className="absolute inset-0 bg-white bg-opacity-75"></div>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className={`max-w-md mx-auto ${plan?.borderColor} shadow-lg`}>
          <CardContent className={`text-center p-6 ${plan?.bgColor}`}>
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${plan?.bgColor} ${plan?.color} mb-4`}>
              {plan?.icon}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upgrade to {plan?.name} Required
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {description}
            </p>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">
                {plan?.price}
              </span>
              {requiredPlan === "pro" && (
                <span className="text-sm text-gray-500 ml-1">per month</span>
              )}
            </div>
            
            <Button 
              onClick={handleUpgrade}
              className={`w-full ${
                requiredPlan === "starter" ? "bg-blue-600 hover:bg-blue-700" :
                requiredPlan === "pro" ? "bg-purple-600 hover:bg-purple-700" :
                "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              Upgrade to {plan?.name}
            </Button>
            
            <p className="text-xs text-gray-500 mt-3">
              Unlock {featureName} and all {plan?.name} features
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}