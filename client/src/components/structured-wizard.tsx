import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Briefcase, DollarSign, Users, Lock, CheckCircle, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-language";
import { useUserPlan } from "@/hooks/use-user-plan";
import { visaData } from "@shared/visaData";
import { motion, AnimatePresence } from "framer-motion";

interface WizardData {
  country: string;
  profession: string;
  income: string;
  familyStatus: string;
}

interface VisaMatch {
  name: string;
  description: string;
  eligibility: string;
  requirements: string[];
  cost: string;
  processingTime: string;
  isPremium: boolean;
  matchScore: number;
}

interface StructuredWizardProps {
  onShowPricing?: () => void;
}

export default function StructuredWizard({ onShowPricing }: StructuredWizardProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    country: "",
    profession: "",
    income: "",
    familyStatus: ""
  });
  const [showResults, setShowResults] = useState(false);
  const t = useTranslation();
  const { userPlan } = useUserPlan();

  const setShowPricing = onShowPricing || (() => {});

  // Animation variants for smooth transitions
  const stepVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.5, ease: "easeOut" } }
  };

  const resultVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  const countries = [
    "Algeria", "Argentina", "Australia", "Botswana", "Brazil", "Canada", "Chile", "China", 
    "Egypt", "Ethiopia", "France", "Germany", "Ghana", "India", "Japan", "Kenya", 
    "Mauritius", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", 
    "Philippines", "Rwanda", "Senegal", "Singapore", "South Africa", "South Korea", 
    "Spain", "Tanzania", "Thailand", "Tunisia", "Uganda", "United Kingdom", "United States"
  ].sort();

  const professions = [
    { value: "tech", label: t.technologyProfessional, icon: "💻" },
    { value: "consultant", label: t.consultant, icon: "💼" },
    { value: "business", label: t.businessOwner, icon: "🏢" },
    { value: "freelancer", label: t.freelancer, icon: "🎨" },
    { value: "finance", label: t.financeProfessional, icon: "💰" },
    { value: "healthcare", label: t.healthcareProfessional, icon: "🏥" },
    { value: "education", label: t.educationProfessional, icon: "📚" },
    { value: "other", label: t.otherProfessional, icon: "⚡" }
  ];

  const incomeRanges = [
    { value: "under_3k", label: t.under3k, range: "0-3000" },
    { value: "3k_5k", label: t.range3k5k, range: "3000-5000" },
    { value: "5k_10k", label: t.range5k10k, range: "5000-10000" },
    { value: "10k_20k", label: t.range10k20k, range: "10000-20000" },
    { value: "over_20k", label: t.over20k, range: "20000+" }
  ];

  const familyOptions = [
    { value: "alone", label: t.movingAlone, icon: "👤" },
    { value: "partner", label: t.withPartnerSpouse, icon: "👫" },
    { value: "family", label: t.withFamilyChildren, icon: "👨‍👩‍👧‍👦" }
  ];

  const getVisaRecommendations = (): VisaMatch[] => {
    const matches: VisaMatch[] = [];

    // DE Rantau Pass - Digital Nomad Visa
    if (wizardData.profession === "tech" || wizardData.profession === "consultant" || wizardData.profession === "freelancer") {
      matches.push({
        name: t.deRantauVisa,
        description: t.deRantauVisaDescription,
        eligibility: t.perfectMatchForDigitalProfessionals,
        requirements: [t.remoteWorkCapability, t.minimumIncomeProof, t.cleanCriminalRecord],
        cost: "RM 1,000 (~$230 USD)",
        processingTime: `3-4 ${t.weeks}`,
        isPremium: false,
        matchScore: 95
      });
    }

    // MM2H Programme
    if (wizardData.income === "10k_20k" || wizardData.income === "over_20k") {
      matches.push({
        name: t.mm2hVisa,
        description: t.mm2hVisaDescription,
        eligibility: t.highIncomeEarnersWelcome,
        requirements: ["RM 1.5M liquid assets", "RM 40k monthly income", "Health insurance"],
        cost: "RM 5,000 (~$1,150 USD)",
        processingTime: `6-12 ${t.months}`,
        isPremium: true,
        matchScore: 85
      });
    }

    // Labuan Director Visa
    if (wizardData.profession === "business" || wizardData.profession === "finance") {
      matches.push({
        name: "Labuan Director Visa",
        description: "Business visa for company directors and investors",
        eligibility: t.idealForBusinessProfessionals,
        requirements: ["Company incorporation", "RM 350k paid-up capital", "Business plan"],
        cost: "RM 2,500 (~$575 USD)",
        processingTime: `4-6 ${t.weeks}`,
        isPremium: true,
        matchScore: 80
      });
    }

    // Employment Pass
    matches.push({
      name: t.employmentPass,
      description: t.employmentPassDescription,
      eligibility: t.availableWithMalaysianJobOffer,
      requirements: [t.jobOfferFromMalaysianCompany, t.relevantQualifications, t.salaryRequirement],
      cost: "RM 1,225 (~$280 USD)",
      processingTime: `4-6 ${t.weeks}`,
      isPremium: false,
      matchScore: 70
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return wizardData.country !== "";
      case 2: return wizardData.profession !== "";
      case 3: return wizardData.income !== "";
      case 4: return wizardData.familyStatus !== "";
      default: return false;
    }
  };

  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-6">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                >
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.countryOfOriginTitle}</h3>
                <p className="text-gray-600">{t.countryOfOriginDesc}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Select value={wizardData.country} onValueChange={(value) => setWizardData({...wizardData, country: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.selectCountry} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                >
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.professionalBackgroundTitle}</h3>
                <p className="text-gray-600">{t.professionalBackgroundDesc}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Select value={wizardData.profession} onValueChange={(value) => setWizardData({...wizardData, profession: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.selectProfession} />
                  </SelectTrigger>
                  <SelectContent>
                    {professions.map((prof) => (
                      <SelectItem key={prof.value} value={prof.value}>
                        <div className="flex items-center space-x-2">
                          <span>{prof.icon}</span>
                          <span>{prof.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.incomeRequirementsTitle}</h3>
              <p className="text-gray-600">{t.incomeRequirementsDesc}</p>
            </div>
            <div className="space-y-3">
              {incomeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={wizardData.income === range.value ? "default" : "outline"}
                  className="w-full h-16 justify-start"
                  onClick={() => setWizardData({...wizardData, income: range.value})}
                >
                  <DollarSign className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">{range.label}</div>
                    <div className="text-sm text-gray-500">{range.range} USD</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.familySituationTitle}</h3>
              <p className="text-gray-600">{t.familySituationDesc}</p>
            </div>
            <div className="space-y-3">
              {familyOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={wizardData.familyStatus === option.value ? "default" : "outline"}
                  className="w-full h-16 justify-start"
                  onClick={() => setWizardData({...wizardData, familyStatus: option.value})}
                >
                  <span className="text-2xl mr-4">{option.icon}</span>
                  <span className="font-semibold">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
        );

        default:
          return null;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {stepContent}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (showResults) {
    const recommendations = getVisaRecommendations();
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.yourMalaysiaVisaOptions}</h2>
          <p className="text-gray-600">{t.basedOnYourProfile}</p>
        </div>

        <div className="space-y-6">
          {recommendations.map((visa, index) => (
            <Card key={visa.name} className="relative overflow-hidden">
              {visa.isPremium && userPlan === 'free' && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-6 text-center max-w-sm">
                    <Lock className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">{t.premiumContent}</h4>
                    <p className="text-sm text-gray-600 mb-4">{t.upgradeToUnlock}</p>
                    <Button onClick={() => setShowPricing()} className="w-full">
                      {t.viewPlans}
                    </Button>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <span>{visa.name}</span>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{visa.matchScore}% match</span>
                    </Badge>
                  </CardTitle>
                  {visa.isPremium && <Lock className="w-5 h-5 text-gray-400" />}
                </div>
                <CardDescription>{visa.description}</CardDescription>
              </CardHeader>
              
              <CardContent className={visa.isPremium && userPlan === 'free' ? 'filter blur-sm' : ''}>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h5 className="font-semibold text-sm text-gray-600 mb-1">{t.cost}</h5>
                    <p className="text-sm">{visa.cost}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-600 mb-1">{t.processingTime}</h5>
                    <p className="text-sm">{visa.processingTime}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-600 mb-1">{t.eligibility}</h5>
                    <p className="text-sm">{visa.eligibility}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-sm text-gray-600 mb-2">{t.keyRequirements}</h5>
                  <ul className="text-sm space-y-1">
                    {visa.requirements.map((req, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {(!visa.isPremium || userPlan !== 'free') && (
                  <div className="mt-4 flex space-x-3">
                    <Button variant="outline" size="sm">{t.detailedFeatureComparison}</Button>
                    <Button size="sm">{t.getPdfGuide}</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => {
            setCurrentStep(1);
            setShowResults(false);
            setWizardData({ country: "", profession: "", income: "", familyStatus: "" });
          }}>
{t.startDiscussion}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 w-full min-w-0">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{t.wizardTitle}</h2>
          <span className="text-sm text-gray-500">
            {t.stepOf.replace('{current}', currentStep.toString()).replace('{total}', '4')}
          </span>
        </div>
        <Progress value={(currentStep / 4) * 100} className="w-full" />
      </div>

      <Card>
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          {t.back}
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === 4 ? t.viewResults : t.next}
        </Button>
      </div>
    </div>
  );
}