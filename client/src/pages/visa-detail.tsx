import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Clock, DollarSign, FileText, Users, CheckCircle, ArrowRight, Star } from "lucide-react";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useTranslation } from "@/hooks/use-language";
import { motion } from "framer-motion";

interface VisaType {
  id: number;
  name: string;
  slug: string;
  duration: string;
  eligibility: string;
  minimumIncome: string;
  applicationFee: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationProcess: string[];
  requiredDocuments: string[];
  processingTime: string;
  renewability: string;
  familyInclusion: boolean;
  workRights: boolean;
  isPremium: boolean;
}

export default function VisaDetailPage() {
  const { slug } = useParams();
  const { userPlan, hasAccess } = useUserPlan();
  const t = useTranslation();

  // Hardcoded visa data based on the CSV provided
  const visaTypesData: Record<string, VisaType> = {
    "de-rantau-nomad-pass": {
      id: 1,
      name: "DE Rantau Nomad Pass",
      slug: "de-rantau-nomad-pass",
      duration: "3 to 12 months (renewable once)",
      eligibility: "Remote tech/non-tech workers with contracts & income proof",
      minimumIncome: "USD 24,000 (tech) / USD 60,000 (non-tech)",
      applicationFee: "RM 1,000 (main) / RM 500 (dependent)",
      description: "Perfect for digital nomads and remote workers looking to experience Malaysia while working for international companies.",
      requirements: [
        "Valid passport with at least 6 months validity",
        "Employment contract or freelance agreements",
        "Proof of income (bank statements, tax documents)",
        "Clean criminal record check"
      ],
      benefits: [
        "Work remotely for international companies",
        "Multiple entry visa for easy travel",
        "Fast-track immigration lanes at airports",
        "Tax incentives for eligible participants",
        "Access to co-working spaces and digital nomad community",
        "Spouse and children can accompany (dependent pass)"
      ],
      applicationProcess: [
        "Submit online application through Malaysia Digital Economy Corporation (MDEC)",
        "Upload required documents and pay application fee",
        "Wait for initial review and approval (typically 2-3 weeks)",
        "Receive approval letter and visa sticker instructions",
        "Visit Malaysian embassy/consulate for visa sticker placement",
        "Enter Malaysia and complete immigration procedures"
      ],
      requiredDocuments: [
        "Completed application form",
        "Passport-sized photographs",
        "Copy of passport bio page",
        "Employment contract or client agreements",
        "Bank statements (last 3 months)",
        "University degree or professional certificates",
        "Criminal background check (apostilled)",
        "Medical examination report",
        "Health insurance policy",
        "Proof of accommodation in Malaysia"
      ],
      processingTime: "2-4 weeks",
      renewability: "Renewable once for the same duration",
      familyInclusion: true,
      workRights: true,
      isPremium: false
    },
    "tech-entrepreneur-new": {
      id: 2,
      name: "Tech Entrepreneur (New)",
      slug: "tech-entrepreneur-new",
      duration: "1 year (renewable upon achievement)",
      eligibility: "Tech founder with no prior track record",
      minimumIncome: "RM 50,000 bank savings",
      applicationFee: "RM 2,700",
      description: "Designed for aspiring tech entrepreneurs starting their first venture in Malaysia's thriving startup ecosystem.",
      requirements: [
        "Tech-related business proposal",
        "Minimum RM 50,000 in personal savings",
        "Business plan with clear milestones",
        "Letter of recommendation from industry professional"
      ],
      benefits: [
        "Access to Malaysia's startup ecosystem",
        "Networking opportunities with investors",
        "Government support programs",
        "Tax incentives for new businesses",
        "Work authorization for your own company",
        "Path to permanent residency"
      ],
      applicationProcess: [
        "Prepare comprehensive business plan",
        "Submit application to Malaysia Digital Economy Corporation (MDEC)",
        "Attend virtual or in-person interview",
        "Receive conditional approval",
        "Establish business entity in Malaysia",
        "Complete final documentation and receive visa"
      ],
      requiredDocuments: [
        "Detailed business plan (minimum 20 pages)",
        "Financial statements and bank certificates",
        "Academic qualifications and certifications",
        "Professional references and recommendations",
        "Prototype or proof of concept documentation",
        "Market research and competitor analysis",
        "Personal statement and motivation letter"
      ],
      processingTime: "4-8 weeks",
      renewability: "Renewable based on business performance and milestones achieved",
      familyInclusion: false,
      workRights: true,
      isPremium: true
    },
    "employment-pass": {
      id: 6,
      name: "Employment Pass",
      slug: "employment-pass",
      duration: "1 to 5 years (based on contract)",
      eligibility: "Offer of employment from Malaysian company",
      minimumIncome: "Varies by job/sector",
      applicationFee: "Varies",
      description: "Standard work visa for skilled professionals with job offers from Malaysian companies.",
      requirements: [
        "Job offer from Malaysian company",
        "University degree or professional qualifications",
        "Relevant work experience",
        "Medical examination"
      ],
      benefits: [
        "Legal authorization to work in Malaysia",
        "Multiple entry visa",
        "Ability to open bank accounts",
        "Access to healthcare",
        "Family dependent visa options",
        "Path to permanent residency"
      ],
      applicationProcess: [
        "Malaysian employer submits application to Immigration Department",
        "Approval letter issued to employer",
        "Employee applies for visa at Malaysian embassy/consulate",
        "Complete medical examination",
        "Submit passport for visa sticker",
        "Enter Malaysia and complete registration"
      ],
      requiredDocuments: [
        "Passport with minimum 18 months validity",
        "Employment contract",
        "Academic certificates (verified)",
        "Professional qualification certificates",
        "Resume and work experience letters",
        "Medical examination report",
        "Police clearance certificate",
        "Passport-sized photographs"
      ],
      processingTime: "4-6 weeks",
      renewability: "Renewable based on continued employment",
      familyInclusion: true,
      workRights: true,
      isPremium: false
    }
  };

  const visa = slug ? visaTypesData[slug] : null;
  const isLoading = false;

  const handleUpgrade = () => {
    window.location.href = '/#pricing';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading visa information...</p>
        </div>
      </div>
    );
  }

  if (!visa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Visa Type Not Found</h1>
          <p className="text-gray-600 mb-6">The visa type you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = '/'} className="bg-blue-600 hover:bg-blue-700">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const isPremiumContent = visa.isPremium;
  const canAccessPremium = hasAccess('premium') || hasAccess('pro');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Malaysia Visa
            </Badge>
            {isPremiumContent && (
              <Badge className="bg-amber-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Premium Content
              </Badge>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{visa.name}</h1>
          <p className="text-xl text-gray-600">{visa.description}</p>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
              <p className="text-gray-600">{visa.duration}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Application Fee</h3>
              <p className="text-gray-600">{visa.applicationFee}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
              <p className="text-gray-600">{visa.processingTime}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Basic Information */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Eligibility Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{visa.eligibility}</p>
              {visa.minimumIncome && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Minimum Income Requirement</p>
                  <p className="text-blue-700">{visa.minimumIncome}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {visa.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {visa.familyInclusion && (
                <div className="mt-4 bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">✓ Family inclusion available</p>
                </div>
              )}
              
              {visa.workRights && (
                <div className="mt-2 bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">✓ Work rights included</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Content Section */}
        {isPremiumContent && !canAccessPremium ? (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
              <CardContent className="p-8 text-center">
                <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Content</h3>
                <p className="text-gray-600 mb-6">
                  Get access to detailed application process, required documents, insider tips, and step-by-step guidance.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6 text-left max-w-md mx-auto">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Step-by-step application guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Required documents checklist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Success tips from experts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Common pitfalls to avoid</span>
                  </div>
                </div>
                <Button 
                  onClick={handleUpgrade}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  size="lg"
                >
                  Upgrade to Access Premium Content
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Premium Content - Application Process */
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Application Process
                  {isPremiumContent && (
                    <Badge className="bg-amber-500 text-white text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visa.applicationProcess.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Required Documents
                  {isPremiumContent && (
                    <Badge className="bg-amber-500 text-white text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {visa.requiredDocuments.map((document, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{document}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Renewability</h4>
                    <p className="text-gray-700">{visa.renewability}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Additional Requirements</h4>
                    <ul className="space-y-1">
                      {visa.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700 text-sm">• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Apply for {visa.name}?</h3>
              <p className="text-blue-100 mb-6">
                Get personalized guidance and expert support throughout your application process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/#wizard'}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  size="lg"
                >
                  Get AI Assessment
                </Button>
                <Button 
                  onClick={() => window.location.href = '/#consultation'}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
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