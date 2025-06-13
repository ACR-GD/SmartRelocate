import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Briefcase, DollarSign, Users, Lock, CheckCircle, Star, ArrowLeft, ArrowRight, MessageCircle, Save, Bell, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/use-language";
import { useUserPlan } from "@/hooks/use-user-plan";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PremiumChatModal from "./premium-chat-modal";
import SavedProfilesModal from "./saved-profiles-modal";
import VisaAlertsModal from "./visa-alerts-modal";
import { ConsultationBookingModal } from "./consultation-booking-modal";

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

interface AnimatedWizardProps {
  onShowPricing?: () => void;
}

export default function AnimatedWizard({ onShowPricing }: AnimatedWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    country: "",
    profession: "",
    income: "",
    familyStatus: ""
  });
  const [showResults, setShowResults] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showProfilesModal, setShowProfilesModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [currentProfileId, setCurrentProfileId] = useState<number | null>(null);
  const [savedProfileData, setSavedProfileData] = useState<any>(null);
  const t = useTranslation();
  const { userPlan } = useUserPlan();
  const { toast } = useToast();

  const getProfessionLabel = (profession: string) => {
    const prof = professions.find(p => p.value === profession);
    return prof ? prof.label.replace(" Professional", "") : "Professional";
  };

  const getFamilyLabel = (familyStatus: string) => {
    const family = familyOptions.find(f => f.value === familyStatus);
    return family ? family.label : "Individual";
  };

  const getIncomeFromRange = (incomeRange: string) => {
    switch (incomeRange) {
      case "under_3k": return 2500;
      case "3k_5k": return 4000;
      case "5k_10k": return 7500;
      case "10k_20k": return 15000;
      case "over_20k": return 25000;
      default: return 0;
    }
  };

  // Animation variants for smooth transitions
  const stepVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } }
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
    const steps = {
      1: (
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
      ),
      2: (
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
      ),
      3: (
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
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.incomeRequirementsTitle}</h3>
            <p className="text-gray-600">{t.incomeRequirementsDesc}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Select value={wizardData.income} onValueChange={(value) => setWizardData({...wizardData, income: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.selectIncomeRange} />
              </SelectTrigger>
              <SelectContent>
                {incomeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{range.label}</div>
                        <div className="text-sm text-gray-500">{range.range} USD</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      ),
      4: (
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
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.familySituationTitle}</h3>
            <p className="text-gray-600">{t.familySituationDesc}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Select value={wizardData.familyStatus} onValueChange={(value) => setWizardData({...wizardData, familyStatus: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.selectFamilyStatus} />
              </SelectTrigger>
              <SelectContent>
                {familyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      )
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {steps[currentStep as keyof typeof steps]}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (showResults) {
    const recommendations = getVisaRecommendations();
    
    return (
      <motion.div 
        className="max-w-4xl mx-auto p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.3 }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.yourMalaysiaVisaOptions}</h2>
          <p className="text-gray-600">{t.basedOnYourProfile}</p>
        </motion.div>

        <div className="space-y-6">
          {recommendations.map((visa, index) => (
            <motion.div
              key={visa.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="relative overflow-hidden">
                {visa.isPremium && userPlan === 'free' && (
                  <motion.div 
                    className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-lg p-6 text-center max-w-sm">
                      <Lock className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                      <h4 className="font-semibold mb-2">{t.premiumContent}</h4>
                      <p className="text-sm text-gray-600 mb-4">{t.upgradeToUnlock}</p>
                      <Button onClick={onShowPricing} className="w-full">
                        {t.viewPlans}
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                <CardContent className={`p-6 ${visa.isPremium && userPlan === 'free' ? 'filter blur-sm' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center space-x-3">
                      <span>{visa.name}</span>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{visa.matchScore}% {t.matchPercent}</span>
                      </Badge>
                    </h3>
                    {visa.isPremium && <Lock className="w-5 h-5 text-gray-400" />}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{visa.description}</p>
                  
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
                      <Button variant="outline" size="sm">{t.viewFullChecklist}</Button>
                      <Button size="sm">{t.downloadPdfGuide}</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Profile Management Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Save className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-900 mb-1">{t.saveProfile}</h4>
                <p className="text-sm text-green-700 mb-3">{t.saveProfileDescription}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowProfilesModal(true)}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  {t.manageProfiles}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <Bell className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-900 mb-1">{t.visaAlerts}</h4>
                <p className="text-sm text-orange-700 mb-3">{t.visaAlertsDescription}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAlertsModal(true)}
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  {t.viewAlerts}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-900 mb-1">{t.aiGuidance}</h4>
                <p className="text-sm text-blue-700 mb-3">{t.aiGuidanceDescription}</p>
                {userPlan === 'free' ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onShowPricing}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    {t.upgradeRequired}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowChatModal(true)}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    {t.chatNow}
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-900 mb-1">{t.expertConsultation}</h4>
                <p className="text-sm text-purple-700 mb-3">{t.expertConsultationDescription}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowConsultationModal(true)}
                  className="border-purple-300 text-purple-700 hover:bg-purple-100"
                >
                  {t.bookSession}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upsell Section for Free Users */}
          {userPlan === 'free' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.getPersonalizedGuidance}</h3>
              <p className="text-gray-600 mb-4">
                {t.chatWithAiAssistant}
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">{t.availableWithProPlan}</p>
                <Button 
                  onClick={onShowPricing}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {t.upgradeToChatWithAi}
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <Button variant="outline" onClick={() => {
              setCurrentStep(1);
              setShowResults(false);
              setWizardData({ country: "", profession: "", income: "", familyStatus: "" });
            }}>
              Start Over
            </Button>
          </div>
        </motion.div>

        <PremiumChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          onShowPricing={onShowPricing}
          userProfile={wizardData}
          recommendedVisa={recommendations[0]?.name}
        />

        <SavedProfilesModal
          isOpen={showProfilesModal}
          onClose={() => setShowProfilesModal(false)}
          onLoadProfile={(profile) => {
            setWizardData({
              country: profile.targetCountry || "",
              profession: profile.profession || "",
              income: profile.income?.toString() || "",
              familyStatus: profile.familyStatus || ""
            });
            setCurrentStep(1);
            setShowResults(false);
          }}
          currentSessionId={sessionId}
          currentAssessmentData={{
            targetCountry: "Malaysia",
            profession: wizardData.profession,
            name: `${getProfessionLabel(wizardData.profession)} - ${getFamilyLabel(wizardData.familyStatus)}`,
            income: getIncomeFromRange(wizardData.income),
            familyStatus: wizardData.familyStatus,
            recommendedVisa: recommendations[0]?.name,
            eligibilityScore: recommendations[0]?.matchScore,
            profileData: {
              wizardData,
              recommendations,
              assessmentDate: new Date().toISOString()
            }
          }}
          onProfileSaved={(profile) => {
            setCurrentProfileId(profile.id);
            setSavedProfileData(profile);
          }}
        />

        <VisaAlertsModal
          isOpen={showAlertsModal}
          onClose={() => setShowAlertsModal(false)}
          profileId={currentProfileId || undefined}
        />

        <ConsultationBookingModal
          isOpen={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
          profileId={currentProfileId || undefined}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Malaysia Relocation Assessment</h2>
          <motion.span 
            className="text-sm text-gray-500"
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {t.stepOf ? t.stepOf.replace('{current}', currentStep.toString()).replace('{total}', '4') : `Step ${currentStep} of 4`}
          </motion.span>
        </div>
        <div className="relative">
          <Progress value={(currentStep / 4) * 100} className="w-full" />
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>

      <motion.div 
        className="flex justify-between mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </Button>
        </motion.div>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === 4 ? t.viewResults : t.next}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}