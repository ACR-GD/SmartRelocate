import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin, Clock, DollarSign, Users, FileText, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-language";
import { continents, createCountrySlug } from "@shared/relocationData";
import { UserProfile } from "@shared/eligibilityScoring";
import { VisaEligibilityResult } from "@shared/schema";
import UserProfileForm from "./user-profile-form";

interface VisaOption {
  name: string;
  type: string;
  requirements: string[];
  processingTime: string;
  cost: string;
  eligibility: string;
  benefits: string[];
}

interface CountryInfo {
  name: string;
  continent: string;
  description: string;
  costEstimate: string;
  duration: string;
  livingCost: string;
  visas: VisaOption[];
}

export default function RelocationWizard() {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedVisa, setSelectedVisa] = useState<VisaOption | null>(null);
  const [showVisaModal, setShowVisaModal] = useState(false);
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState<"location" | "profile" | "results">("location");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [visaResults, setVisaResults] = useState<VisaEligibilityResult[]>([]);
  const { toast } = useToast();
  const t = useTranslation();

  // Fetch countries when continent is selected
  const { data: countriesData } = useQuery<{ countries: string[] }>({
    queryKey: [`/api/countries/${selectedContinent}`],
    enabled: !!selectedContinent,
  });

  // Fetch relocation info when country is selected
  const { data: countryInfo, isLoading: isLoadingCountry } = useQuery<CountryInfo>({
    queryKey: [`/api/relocate-info/${createCountrySlug(selectedCountry)}`],
    enabled: !!selectedCountry,
  });

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
        title: "Error",
        description: "Failed to capture email. Please try again.",
        variant: "destructive",
      });
    },
  });

  const visaEligibilityMutation = useMutation({
    mutationFn: async (data: { userProfile: UserProfile; visaTypes: string[] }) => {
      const response = await apiRequest("POST", "/api/visa-eligibility", {
        userProfile: data.userProfile,
        visaTypes: data.visaTypes
      });
      return await response.json();
    },
    onSuccess: (data: any) => {
      console.log("Received visa results:", data);
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        setVisaResults(data.results);
        setCurrentStep("results");
        toast({
          title: t.analysisComplete,
          description: t.analysisCompleteDesc,
        });
      } else if (data && data.results && data.results.length === 0) {
        console.log("Empty results array received");
        setVisaResults([]);
        setCurrentStep("results");
        toast({
          title: "Assessment Complete",
          description: "No visa matches found for your profile. Consider adjusting your criteria.",
          variant: "destructive",
        });
      } else {
        console.error("Invalid response format:", data);
        toast({
          title: t.error,
          description: "Invalid response format from assessment system.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: t.error,
        description: "Failed to calculate eligibility scores. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountry("");
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleVisaLearnMore = (visa: VisaOption) => {
    setSelectedVisa(visa);
    setShowVisaModal(true);
  };

  const handleLocationComplete = () => {
    if (selectedCountry && countryInfo) {
      setCurrentStep("profile");
    }
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    if (countryInfo) {
      const visaTypes = countryInfo.visas.map(visa => visa.name);
      visaEligibilityMutation.mutate({ userProfile: profile, visaTypes });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      emailCaptureMutation.mutate(email);
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent': return "bg-green-100 text-green-800 border-green-200";
      case 'good': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'fair': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'poor': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div className={`flex items-center ${currentStep === "location" ? "text-blue-600" : currentStep === "profile" || currentStep === "results" ? "text-green-600" : "text-gray-400"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "location" ? "bg-blue-100" : currentStep === "profile" || currentStep === "results" ? "bg-green-100" : "bg-gray-100"}`}>
          <MapPin className="w-4 h-4" />
        </div>
        <span className="ml-2 font-medium">Location</span>
      </div>
      <div className={`w-12 h-0.5 ${currentStep === "profile" || currentStep === "results" ? "bg-green-300" : "bg-gray-300"}`}></div>
      <div className={`flex items-center ${currentStep === "profile" ? "text-blue-600" : currentStep === "results" ? "text-green-600" : "text-gray-400"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "profile" ? "bg-blue-100" : currentStep === "results" ? "bg-green-100" : "bg-gray-100"}`}>
          <Users className="w-4 h-4" />
        </div>
        <span className="ml-2 font-medium">Profile</span>
      </div>
      <div className={`w-12 h-0.5 ${currentStep === "results" ? "bg-green-300" : "bg-gray-300"}`}></div>
      <div className={`flex items-center ${currentStep === "results" ? "text-blue-600" : "text-gray-400"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "results" ? "bg-blue-100" : "bg-gray-100"}`}>
          <TrendingUp className="w-4 h-4" />
        </div>
        <span className="ml-2 font-medium">Results</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{t.wizardTitle}</h2>
        <p className="text-lg text-gray-600">{t.wizardSubtitle}</p>
      </div>

      {renderStepIndicator()}

      {currentStep === "location" && (
        <div className="space-y-6">
          {/* Step 1: Select Continent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t.selectContinentTitle}
              </CardTitle>
              <CardDescription>{t.selectContinentDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedContinent} onValueChange={handleContinentChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectContinent} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(continents).map((continent) => (
                    <SelectItem key={continent} value={continent}>
                      {continent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Step 2: Select Country */}
          {selectedContinent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Step 2: Select Your Country
                </CardTitle>
                <CardDescription>Choose your current country of residence</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesData?.countries?.map((country: string) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Show basic country info and proceed button */}
          {selectedCountry && countryInfo && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Moving from {countryInfo.name} to Malaysia
                </CardTitle>
                <CardDescription>{countryInfo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900">Total Cost</p>
                      <p className="text-sm text-blue-700">{countryInfo.costEstimate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">Timeline</p>
                      <p className="text-sm text-green-700">{countryInfo.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-purple-900">Living Cost</p>
                      <p className="text-sm text-purple-700">{countryInfo.livingCost}</p>
                    </div>
                  </div>
                </div>
                <Button onClick={handleLocationComplete} className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue to Profile Assessment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {currentStep === "profile" && (
        <UserProfileForm 
          onProfileSubmit={handleProfileSubmit}
          initialProfile={{ nationality: selectedCountry }}
        />
      )}

      {currentStep === "results" && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Your Personalized Visa Analysis
              </CardTitle>
              <CardDescription>
                Based on your profile, here are your best visa options ranked by eligibility
              </CardDescription>
            </CardHeader>
          </Card>

          {visaResults && visaResults.length > 0 ? (
            visaResults.map((result, index) => (
              <Card key={result.visa} className={`border-l-4 ${getSuitabilityColor(result.suitability)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                        {result.visa}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold text-gray-900">{result.score}%</span>
                          <span className="text-sm text-gray-600">Match Score</span>
                        </div>
                        <Badge className={getSuitabilityColor(result.suitability)}>
                          {result.suitability.charAt(0).toUpperCase() + result.suitability.slice(1)} Fit
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Top Strengths</h4>
                      <ul className="space-y-1">
                        {result.primaryReasons.slice(0, 3).map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {result.recommendations && result.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          Improvement Areas
                        </h4>
                        <ul className="space-y-1">
                          {result.recommendations.slice(0, 2).map((rec, recIndex) => (
                            <li key={recIndex} className="text-sm text-gray-700 ml-6">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Detailed Breakdown</h4>
                      <div className="grid gap-2">
                        {Object.entries(result.breakdown).map(([criterion, data]) => (
                          <div key={criterion} className="flex items-center justify-between">
                            <span className="text-sm capitalize text-gray-700">
                              {criterion.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress value={(data.score / data.maxScore) * 100} className="w-16 h-2" />
                              <span className="text-sm font-medium">
                                {Math.round((data.score / data.maxScore) * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleVisaLearnMore({ 
                        name: result.visa, 
                        type: "", 
                        requirements: [], 
                        processingTime: "", 
                        cost: "", 
                        eligibility: `${result.score}% match`, 
                        benefits: [] 
                      })}
                      variant="outline"
                      className="w-full"
                    >
                      View Full Requirements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">No visa results available yet.</p>
              </CardContent>
            </Card>
          )}

          {/* Email Capture */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Get Your Personalized Action Plan
              </CardTitle>
              <CardDescription>
                Receive a detailed PDF with your analysis results, step-by-step instructions, and timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={emailCaptureMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {emailCaptureMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Get Action Plan"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {visaEligibilityMutation.isPending && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Calculating your visa eligibility scores...
          </CardContent>
        </Card>
      )}

      {/* Visa Details Modal */}
      <Dialog open={showVisaModal} onOpenChange={setShowVisaModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedVisa?.name}</DialogTitle>
            <DialogDescription>{selectedVisa?.type}</DialogDescription>
          </DialogHeader>
          {selectedVisa && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <p className="text-gray-700">{selectedVisa.processingTime}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Total Cost</h4>
                  <p className="text-gray-700">{selectedVisa.cost}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {selectedVisa.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Benefits</h4>
                <ul className="space-y-2">
                  {selectedVisa.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Eligibility Assessment</p>
                <p className="text-gray-700">{selectedVisa.eligibility}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}