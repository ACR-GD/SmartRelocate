import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Save, User, Clock, MapPin, Briefcase, DollarSign, Star, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile } from "@shared/schema";

interface SavedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProfile?: (profile: UserProfile) => void;
  currentSessionId?: string;
  currentAssessmentData?: any;
  onProfileSaved?: (profile: UserProfile) => void;
}

export default function SavedProfilesModal({ 
  isOpen, 
  onClose, 
  onLoadProfile,
  currentSessionId,
  currentAssessmentData,
  onProfileSaved 
}: SavedProfilesModalProps) {
  const [email, setEmail] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const { toast } = useToast();

  const { data: profiles, isLoading } = useQuery({
    queryKey: [`/api/profiles`, email],
    queryFn: async () => {
      if (!email) return [];
      const response = await apiRequest("GET", `/api/profiles/${encodeURIComponent(email)}`);
      return response.json();
    },
    enabled: !!email,
  });

  const saveProfileMutation = useMutation({
    mutationFn: async ({ sessionId, email, profileData }: { sessionId: string; email: string; profileData?: any }) => {
      const response = await apiRequest("POST", `/api/profile/${sessionId}/save`, { email, profileData });
      return response.json();
    },
    onSuccess: (profile) => {
      queryClient.invalidateQueries({ queryKey: [`/api/profiles`, email] });
      toast({
        title: "Profile Saved",
        description: "Your relocation profile has been saved successfully.",
      });
      setShowSaveForm(false);
      if (onProfileSaved) {
        onProfileSaved(profile);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveCurrentProfile = () => {
    if (!currentSessionId || !email.trim()) return;
    saveProfileMutation.mutate({ 
      sessionId: currentSessionId, 
      email: email.trim(), 
      profileData: currentAssessmentData 
    });
  };

  const handleLoadProfile = (profile: UserProfile) => {
    if (onLoadProfile) {
      onLoadProfile(profile);
      onClose();
      toast({
        title: "Profile Loaded",
        description: "Your saved profile has been loaded into the assessment.",
      });
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSuitabilityColor = (score: number | null) => {
    if (!score) return "bg-gray-100 text-gray-800";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSuitabilityText = (score: number | null) => {
    if (!score) return "Not assessed";
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs improvement";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col">
        <DialogTitle className="sr-only">Saved Relocation Profiles</DialogTitle>
        <DialogDescription className="sr-only">
          Manage and load your saved relocation profiles
        </DialogDescription>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Save className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Saved Profiles</h3>
                <p className="text-sm text-gray-600">Load or save your relocation assessments</p>
              </div>
            </div>
            
            {currentSessionId && (
              <Button
                variant="outline"
                onClick={() => setShowSaveForm(!showSaveForm)}
                className="bg-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Current
              </Button>
            )}
          </div>

          {/* Save Current Profile Form */}
          <AnimatePresence>
            {showSaveForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-white rounded-lg border"
              >
                <div className="flex space-x-3">
                  <Input
                    placeholder="Enter your email to save this profile"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSaveCurrentProfile}
                    disabled={!email.trim() || saveProfileMutation.isPending}
                  >
                    {saveProfileMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Email Input */}
        {!showSaveForm && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-3">
              <Input
                placeholder="Enter your email to view saved profiles"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" disabled={!email.trim()}>
                <Eye className="w-4 h-4 mr-2" />
                View Profiles
              </Button>
            </div>
          </div>
        )}
        
        {/* Profiles List */}
        <ScrollArea className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : !email ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter your email to view saved profiles</p>
            </div>
          ) : profiles?.length === 0 ? (
            <div className="text-center py-12">
              <Save className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No saved profiles found for this email</p>
              <p className="text-sm text-gray-500 mt-2">Complete an assessment and save it to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {profiles?.map((profile: UserProfile) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h4 className="font-semibold text-lg text-gray-900">
                                {profile.name || `${profile.nationality || 'Unknown'} Professional`}
                              </h4>
                              {profile.eligibilityScore && (
                                <Badge className={getSuitabilityColor(profile.eligibilityScore)}>
                                  <Star className="w-3 h-3 mr-1" />
                                  {getSuitabilityText(profile.eligibilityScore)}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{profile.targetCountry || 'Malaysia'}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Briefcase className="w-4 h-4" />
                                <span>{profile.profession || 'Not specified'}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <DollarSign className="w-4 h-4" />
                                <span>
                                  {profile.income ? `$${profile.income.toLocaleString()}` : 'Not specified'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>Saved {formatDate(profile.updatedAt)}</span>
                              </div>
                            </div>
                            
                            {profile.recommendedVisa && (
                              <div className="mb-4">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Recommended: {profile.recommendedVisa}
                                </Badge>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadProfile(profile)}
                            >
                              Load Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}