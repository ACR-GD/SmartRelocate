import { useState } from "react";
import { Download, Mail, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

interface EmailCapture {
  id: number;
  email: string;
  conversationId?: number;
  createdAt: string;
}

export default function EmailExport() {
  const [isExporting, setIsExporting] = useState(false);

  const { data: emails, isLoading } = useQuery({
    queryKey: ["/api/email-captures"],
    queryFn: getQueryFn({ on401: "throw" })
  }) as { data: EmailCapture[] | undefined, isLoading: boolean };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/email-captures/export");
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `smartrelocate-emails-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading email data...</div>;
  }

  const totalEmails = emails?.length || 0;
  const withConversations = emails?.filter(e => e.conversationId).length || 0;
  const thisWeek = emails?.filter(e => {
    const emailDate = new Date(e.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return emailDate > weekAgo;
  }).length || 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Email Export Center</h2>
        <p className="text-xl text-gray-600">Download your collected email addresses for import into email platforms</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmails}</div>
            <p className="text-xs text-muted-foreground">Collected addresses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engaged Users</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{withConversations}</div>
            <p className="text-xs text-muted-foreground">With conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeek}</div>
            <p className="text-xs text-muted-foreground">Recent signups</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Email List</CardTitle>
          <p className="text-sm text-gray-600">
            Download your collected email addresses as a CSV file for import into email marketing platforms
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">CSV Export Includes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Email addresses</li>
                <li>• Date captured</li>
                <li>• Engagement status (has conversation)</li>
                <li>• Conversation ID (for tracking)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Compatible With:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Mailchimp</div>
                <div>• ConvertKit</div>
                <div>• Constant Contact</div>
                <div>• Campaign Monitor</div>
                <div>• EmailOctopus</div>
                <div>• Any CSV import</div>
              </div>
            </div>

            <Button 
              onClick={handleExport}
              disabled={isExporting || totalEmails === 0}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : `Export ${totalEmails} Email${totalEmails !== 1 ? 's' : ''}`}
            </Button>

            {totalEmails === 0 && (
              <p className="text-center text-gray-500 text-sm">
                No email addresses collected yet. Users can sign up through the newsletter form.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>Email addresses are automatically collected when users sign up for updates or complete assessments.</p>
        <p>Export data is updated in real-time from your PostgreSQL database.</p>
      </div>
    </div>
  );
}