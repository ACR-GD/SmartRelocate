import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PdfPaywallForm from "@/components/pdf-paywall-form";
import { FileText, Users, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function PdfGuidePage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.malaysiaRelocationGuide}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.completePdfChecklist}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Features */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.whatsIncluded}</CardTitle>
                  <CardDescription>
                    {t.comprehensiveRelocationInfo}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-600 dark:text-green-400 text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.completeVisaComparisonChart}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t.detailedBreakdownVisa}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-600 dark:text-green-400 text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.costBreakdownByVisaType}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t.exactFeesDeposits}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-600 dark:text-green-400 text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.stepByStepApplicationProcess}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t.completeTimelineDocument}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-600 dark:text-green-400 text-sm font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.livingCostsByCity}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t.monthlyBudgetsKL}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold">500+</div>
                  <div className="text-xs text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Instant</div>
                  <div className="text-xs text-muted-foreground">Download</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Secure</div>
                  <div className="text-xs text-muted-foreground">Payment</div>
                </div>
              </div>
            </div>

            {/* Purchase Form */}
            <div className="lg:sticky lg:top-8">
              <PdfPaywallForm />
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">{t.frequentlyAskedQuestions}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.isThisGuideUpToDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.yesGuideUpdatedRegularly}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.whatFormatGuide}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.guideDeliveredDownloadable}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.canIGetRefund}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.sevenDayMoneyBack}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.doINeedAdditionalConsultation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.guideCoversGeneral}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}