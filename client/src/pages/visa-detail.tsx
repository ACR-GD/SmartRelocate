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

  const { data: visa, isLoading } = useQuery<VisaType>({
    queryKey: ['/api/visa-types', slug],
    enabled: !!slug
  });

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
                  onClick={() => window.location.href = '/#chat'}
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