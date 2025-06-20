import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Users, ArrowRight, Star, Lock } from "lucide-react";
import { useTranslation } from "@/hooks/use-language";
import { useUserPlan } from "@/hooks/use-user-plan";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface VisaType {
  id: number;
  name: string;
  slug: string;
  duration: string;
  eligibility: string;
  minimumIncome: string;
  applicationFee: string;
  description: string;
  isPremium: boolean;
  workRights: boolean;
  familyInclusion: boolean;
}

// Hardcoded visa data based on the CSV provided
const visaTypesData: VisaType[] = [
  {
    id: 1,
    name: "DE Rantau Nomad Pass",
    slug: "de-rantau-nomad-pass",
    duration: "3 to 12 months (renewable once)",
    eligibility: "Remote tech/non-tech workers with contracts & income proof",
    minimumIncome: "USD 24,000 (tech) / USD 60,000 (non-tech)",
    applicationFee: "RM 1,000 (main) / RM 500 (dependent)",
    description: "Perfect for digital nomads and remote workers looking to experience Malaysia while working for international companies.",
    isPremium: false,
    workRights: true,
    familyInclusion: true
  },
  {
    id: 2,
    name: "Tech Entrepreneur (New)",
    slug: "tech-entrepreneur-new",
    duration: "1 year (renewable upon achievement)",
    eligibility: "Tech founder with no prior track record",
    minimumIncome: "RM 50,000 bank savings",
    applicationFee: "RM 2,700",
    description: "Designed for aspiring tech entrepreneurs starting their first venture in Malaysia's thriving startup ecosystem.",
    isPremium: true,
    workRights: true,
    familyInclusion: false
  },
  {
    id: 3,
    name: "Tech Entrepreneur (Experienced)",
    slug: "tech-entrepreneur-experienced",
    duration: "5 years",
    eligibility: "Tech founder with >2 years track record",
    minimumIncome: "RM 180,000/year",
    applicationFee: "RM 5,400",
    description: "For established tech entrepreneurs with proven track records looking to expand their operations to Malaysia.",
    isPremium: true,
    workRights: true,
    familyInclusion: true
  },
  {
    id: 4,
    name: "Tech Investor",
    slug: "tech-investor",
    duration: "5 years",
    eligibility: "Founder/co-founders with RM10mil & VCMC registered",
    minimumIncome: "RM 10 million fund",
    applicationFee: "RM 5,400",
    description: "For high-net-worth individuals and VCs looking to invest significantly in Malaysia's tech ecosystem.",
    isPremium: true,
    workRights: true,
    familyInclusion: true
  },
  {
    id: 5,
    name: "Senior Management",
    slug: "senior-management",
    duration: "5 years",
    eligibility: "C-level/Head of Dept, >7 years experience",
    minimumIncome: "RM 180,000/year",
    applicationFee: "RM 5,400",
    description: "For senior executives and management professionals seeking leadership roles in Malaysian companies.",
    isPremium: true,
    workRights: true,
    familyInclusion: true
  },
  {
    id: 6,
    name: "Employment Pass",
    slug: "employment-pass",
    duration: "1 to 5 years (based on contract)",
    eligibility: "Offer of employment from Malaysian company",
    minimumIncome: "Varies by job/sector",
    applicationFee: "Varies",
    description: "Standard work visa for skilled professionals with job offers from Malaysian companies.",
    isPremium: false,
    workRights: true,
    familyInclusion: true
  },
  {
    id: 7,
    name: "Student Visa",
    slug: "student-visa",
    duration: "1 to 5 years",
    eligibility: "Enrollment in recognized Malaysian institutions",
    minimumIncome: "Proof of funds for tuition/living",
    applicationFee: "Varies",
    description: "For international students pursuing education at recognized Malaysian institutions.",
    isPremium: false,
    workRights: false,
    familyInclusion: false
  },
  {
    id: 8,
    name: "Professional Visit Pass",
    slug: "professional-visit-pass",
    duration: "3 to 12 months",
    eligibility: "Short-term project or professional visit",
    minimumIncome: "Depends on project",
    applicationFee: "Varies",
    description: "For professionals on short-term assignments or business visits to Malaysia.",
    isPremium: false,
    workRights: true,
    familyInclusion: false
  }
];

export default function VisaOverviewPage() {
  const t = useTranslation();
  const { hasAccess } = useUserPlan();

  const handleUpgrade = () => {
    window.location.href = '/#pricing';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Malaysia Visa Types</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all available visa options for relocating to Malaysia. Each visa type has specific requirements and benefits designed for different situations.
          </p>
        </motion.div>

        {/* Visa Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visaTypesData.map((visa, index) => (
            <motion.div
              key={visa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                      {visa.name}
                    </CardTitle>
                    {visa.isPremium && (
                      <Badge className="bg-amber-500 text-white shrink-0 ml-2">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {visa.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{visa.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{visa.applicationFee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">{visa.eligibility}</span>
                    </div>
                  </div>

                  {/* Benefits Tags */}
                  <div className="flex flex-wrap gap-2">
                    {visa.workRights && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Work Rights
                      </Badge>
                    )}
                    {visa.familyInclusion && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        Family Visa
                      </Badge>
                    )}
                  </div>

                  {/* Minimum Income */}
                  {visa.minimumIncome && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-900 mb-1">Minimum Income</p>
                      <p className="text-xs text-gray-600">{visa.minimumIncome}</p>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-2">
                    {visa.isPremium && !hasAccess('premium') && !hasAccess('pro') ? (
                      <Button 
                        onClick={handleUpgrade}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        size="sm"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Upgrade to View Details
                      </Button>
                    ) : (
                      <Link href={`/visa/${visa.slug}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Not Sure Which Visa is Right for You?</h3>
              <p className="text-blue-100 mb-6">
                Get a personalized visa recommendation based on your profile and circumstances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    window.location.href = '/#';
                    setTimeout(() => {
                      const element = document.getElementById('wizard');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                      const event = new Event('showWizard');
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  size="lg"
                >
                  Get AI Assessment
                </Button>
                <Button 
                  onClick={() => {
                    window.location.href = '/#';
                    setTimeout(() => {
                      const element = document.getElementById('consultation');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50"
                  size="lg"
                >
                  Book Expert Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}