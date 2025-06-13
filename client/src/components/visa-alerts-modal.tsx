import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Clock, AlertTriangle, CheckCircle, Calendar, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { VisaStatusAlert } from "@shared/schema";

interface VisaAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId?: number;
}

export default function VisaAlertsModal({ 
  isOpen, 
  onClose, 
  profileId 
}: VisaAlertsModalProps) {
  const { toast } = useToast();

  const { data: alerts, isLoading } = useQuery({
    queryKey: [`/api/alerts`, profileId],
    queryFn: async () => {
      if (!profileId) return [];
      const response = await apiRequest("GET", `/api/alerts/${profileId}`);
      return response.json();
    },
    enabled: !!profileId && isOpen,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: unreadCount } = useQuery({
    queryKey: [`/api/alerts/${profileId}/unread-count`],
    queryFn: async () => {
      if (!profileId) return { count: 0 };
      const response = await apiRequest("GET", `/api/alerts/${profileId}/unread-count`);
      return response.json();
    },
    enabled: !!profileId,
    refetchInterval: 30000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (alertId: number) => {
      const response = await apiRequest("PUT", `/api/alerts/${alertId}/read`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/alerts`, profileId] });
      queryClient.invalidateQueries({ queryKey: [`/api/alerts/${profileId}/unread-count`] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark alert as read.",
        variant: "destructive",
      });
    },
  });

  const handleMarkAsRead = (alertId: number) => {
    markAsReadMutation.mutate(alertId);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return "bg-red-100 text-red-800 border-red-200";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'low':
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAlertIcon = (alertType: string, actionRequired: boolean | null) => {
    if (actionRequired) return <AlertTriangle className="w-5 h-5 text-red-600" />;
    
    switch (alertType) {
      case 'deadline':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'requirement_change':
        return <Flag className="w-5 h-5 text-blue-600" />;
      case 'status_update':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertTypeText = (alertType: string) => {
    switch (alertType) {
      case 'deadline':
        return 'Deadline';
      case 'requirement_change':
        return 'Requirement Change';
      case 'status_update':
        return 'Status Update';
      default:
        return 'Notification';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[80vh] p-0 flex flex-col">
        <DialogTitle className="sr-only">Visa Status Alerts</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your visa application alerts and updates
        </DialogDescription>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 flex items-center space-x-2">
                  <span>Visa Status Alerts</span>
                  {unreadCount?.count > 0 && (
                    <Badge className="bg-red-600 text-white">
                      {unreadCount.count} new
                    </Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-600">Stay updated on your visa application progress</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alerts List */}
        <ScrollArea className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : !profileId ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No profile selected</p>
              <p className="text-sm text-gray-500 mt-2">Complete an assessment to view alerts</p>
            </div>
          ) : alerts?.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">No alerts at this time</p>
              <p className="text-sm text-gray-500 mt-2">We'll notify you of any important updates</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {alerts?.map((alert: VisaStatusAlert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`transition-all ${
                      alert.isRead 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-l-4 border-l-orange-500 shadow-md'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              {getAlertIcon(alert.alertType, alert.actionRequired)}
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg text-gray-900">
                                  {alert.title}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className={getPriorityColor(alert.priority || 'medium')}
                                  >
                                    {(alert.priority || 'medium').toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline">
                                    {getAlertTypeText(alert.alertType)}
                                  </Badge>
                                  <Badge variant="outline">
                                    {alert.visaType}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {alert.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(alert.createdAt)}</span>
                                </div>
                                {alert.dueDate && (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>Due: {formatDate(alert.dueDate)}</span>
                                  </div>
                                )}
                              </div>
                              
                              {alert.actionRequired && (
                                <Badge className="bg-red-100 text-red-800">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {!alert.isRead && (
                            <div className="ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkAsRead(alert.id)}
                                disabled={markAsReadMutation.isPending}
                              >
                                Mark as Read
                              </Button>
                            </div>
                          )}
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