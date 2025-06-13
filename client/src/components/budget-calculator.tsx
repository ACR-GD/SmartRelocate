import { useState } from "react";
import { Calculator, PiggyBank, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useLanguage } from "@/hooks/use-language";
import LockedOverlay from "./locked-overlay";

interface BudgetData {
  currentIncome: number;
  targetSavings: number;
  timelineMonths: number;
  familySize: number;
}

export default function BudgetCalculator() {
  const { hasAccess } = useUserPlan();
  const { t } = useLanguage();
  const [budgetData, setBudgetData] = useState<BudgetData>({
    currentIncome: 0,
    targetSavings: 0,
    timelineMonths: 12,
    familySize: 1
  });
  const [results, setResults] = useState<any>(null);

  const calculateBudget = () => {
    // Advanced budget calculation logic
    const visaCosts = 1500;
    const movingCosts = 3000;
    const housingDeposit = budgetData.familySize * 2000;
    const livingCostsPerMonth = budgetData.familySize * 1500;
    const emergencyFund = livingCostsPerMonth * 3;
    
    const totalRequired = visaCosts + movingCosts + housingDeposit + emergencyFund;
    const monthlyLivingCosts = livingCostsPerMonth;
    const recommendedSavings = totalRequired + (monthlyLivingCosts * 6);
    
    setResults({
      visaCosts,
      movingCosts,
      housingDeposit,
      monthlyLivingCosts,
      emergencyFund,
      totalRequired,
      recommendedSavings,
      monthlySavingTarget: recommendedSavings / budgetData.timelineMonths
    });
  };

  const calculatorContent = (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span>Relocation Budget Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="income">Current Monthly Income (USD)</Label>
              <Input
                id="income"
                type="number"
                value={budgetData.currentIncome}
                onChange={(e) => setBudgetData({...budgetData, currentIncome: Number(e.target.value)})}
                placeholder="5000"
              />
            </div>
            
            <div>
              <Label htmlFor="savings">Current Savings (USD)</Label>
              <Input
                id="savings"
                type="number"
                value={budgetData.targetSavings}
                onChange={(e) => setBudgetData({...budgetData, targetSavings: Number(e.target.value)})}
                placeholder="25000"
              />
            </div>
            
            <div>
              <Label htmlFor="timeline">Timeline (Months)</Label>
              <Input
                id="timeline"
                type="number"
                value={budgetData.timelineMonths}
                onChange={(e) => setBudgetData({...budgetData, timelineMonths: Number(e.target.value)})}
                placeholder="12"
              />
            </div>
            
            <div>
              <Label htmlFor="family">Family Size</Label>
              <Input
                id="family"
                type="number"
                value={budgetData.familySize}
                onChange={(e) => setBudgetData({...budgetData, familySize: Number(e.target.value)})}
                placeholder="1"
              />
            </div>
            
            <Button onClick={calculateBudget} className="w-full">
              Calculate Budget
            </Button>
          </div>
          
          {results && (
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Budget Breakdown</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>Visa & Legal Costs</span>
                  <span className="font-medium">${results.visaCosts.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Moving & Setup</span>
                  <span className="font-medium">${results.movingCosts.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span>Housing Deposit</span>
                  <span className="font-medium">${results.housingDeposit.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span>Emergency Fund</span>
                  <span className="font-medium">${results.emergencyFund.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
                  <span className="font-semibold">Total Recommended</span>
                  <span className="font-bold text-lg">${results.recommendedSavings.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Monthly Living Costs</span>
                  <span className="font-medium">${results.monthlyLivingCosts.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span>Monthly Saving Target</span>
                  <span className="font-medium">${Math.round(results.monthlySavingTarget).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-100 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Savings Progress</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{width: `${Math.min((budgetData.targetSavings / results.recommendedSavings) * 100, 100)}%`}}
                  ></div>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  {Math.round((budgetData.targetSavings / results.recommendedSavings) * 100)}% of recommended savings
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!hasAccess("pro")) {
    return (
      <LockedOverlay
        requiredPlan="pro"
        featureName="Budget Calculator"
        description="Get detailed cost breakdowns and savings targets for your Malaysia relocation with our advanced budget planning tool."
      >
        {calculatorContent}
      </LockedOverlay>
    );
  }

  return calculatorContent;
}