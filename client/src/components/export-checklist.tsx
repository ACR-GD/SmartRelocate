import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useLanguage } from "@/hooks/use-language";
import LockedOverlay from "./locked-overlay";

interface ExportChecklistProps {
  profileData?: any;
  visaResults?: any;
}

export default function ExportChecklist({ profileData, visaResults }: ExportChecklistProps) {
  const { hasAccess } = useUserPlan();
  const { t } = useLanguage();

  const generatePDF = () => {
    // PDF generation logic would go here
    alert("PDF checklist generated! (Demo functionality)");
  };

  const checklistContent = (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Personalized Relocation Checklist</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-2">Your Checklist Includes:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Step-by-step visa application guide</li>
              <li>• Required documents and preparation timeline</li>
              <li>• Cost breakdown and budget planning</li>
              <li>• Housing and lifestyle recommendations</li>
              <li>• Banking and tax setup procedures</li>
              <li>• Healthcare and insurance guidance</li>
            </ul>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={generatePDF}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF Checklist
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!hasAccess("starter")) {
    return (
      <LockedOverlay
        requiredPlan="starter"
        featureName="PDF Export"
        description="Get your personalized relocation checklist as a downloadable PDF with step-by-step guidance tailored to your profile."
      >
        {checklistContent}
      </LockedOverlay>
    );
  }

  return checklistContent;
}