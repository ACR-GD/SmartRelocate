import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, Users, Calendar } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface EmailCapture {
  id: number;
  email: string;
  conversationId?: number;
  createdAt: string;
}

export default function EmailManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: emails, isLoading } = useQuery({
    queryKey: ["/api/email-captures"],
    queryFn: () => apiRequest("GET", "/api/email-captures") as Promise<EmailCapture[]>
  });

  const filteredEmails = emails?.filter(email => 
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const exportEmails = () => {
    if (!emails) return;
    
    const csvContent = [
      "Email,Date Captured,Has Conversation",
      ...emails.map(email => 
        `${email.email},${new Date(email.createdAt).toLocaleDateString()},${email.conversationId ? "Yes" : "No"}`
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `smartrelocate-emails-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div className="p-6">Loading email data...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emails?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Collected email addresses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Conversations</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {emails?.filter(e => e.conversationId).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Engaged users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {emails?.filter(e => {
                const emailDate = new Date(e.createdAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return emailDate > weekAgo;
              }).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Recent captures
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Email List Management</CardTitle>
            <Button onClick={exportEmails} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredEmails.map((email) => (
              <div key={email.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">{email.email}</span>
                  <span className="text-sm text-gray-500">
                    Captured: {new Date(email.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {email.conversationId && (
                    <Badge variant="secondary">Has Conversation</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}