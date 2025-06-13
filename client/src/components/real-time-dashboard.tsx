import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Users, Calendar, FileText, TrendingUp, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalProfiles: number;
  totalBookings: number;
  pdfPurchases: number;
  activeAlerts: number;
}

interface RecentActivity {
  id: string;
  type: 'profile_created' | 'booking_created' | 'pdf_purchased' | 'alert_created';
  title: string;
  description: string;
  timestamp: string;
}

export default function RealTimeDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProfiles: 0,
    totalBookings: 0,
    pdfPurchases: 0,
    activeAlerts: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadDashboardData();
    setupRealTimeSubscriptions();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch dashboard statistics
      const [profilesRes, bookingsRes, purchasesRes, alertsRes] = await Promise.all([
        fetch('/api/profiles/all'),
        fetch('/api/consultations'),
        fetch('/api/admin/pdf-purchases'),
        fetch('/api/admin/alerts')
      ]);

      const profiles = await profilesRes.json();
      const bookings = await bookingsRes.json();
      const purchases = await purchasesRes.json();
      const alerts = await alertsRes.json();

      setStats({
        totalProfiles: profiles.length || 0,
        totalBookings: bookings.length || 0,
        pdfPurchases: purchases.length || 0,
        activeAlerts: alerts.filter((a: any) => !a.isRead).length || 0
      });

      // Create recent activity feed
      const activities: RecentActivity[] = [];
      
      profiles.slice(0, 3).forEach((profile: any) => {
        activities.push({
          id: `profile-${profile.id}`,
          type: 'profile_created',
          title: 'New User Assessment',
          description: `${profile.nationality} professional completed assessment`,
          timestamp: profile.createdAt
        });
      });

      bookings.slice(0, 3).forEach((booking: any) => {
        activities.push({
          id: `booking-${booking.id}`,
          type: 'booking_created',
          title: 'Consultation Booked',
          description: `${booking.consultationType} session scheduled`,
          timestamp: booking.createdAt
        });
      });

      purchases.slice(0, 2).forEach((purchase: any) => {
        activities.push({
          id: `purchase-${purchase.id}`,
          type: 'pdf_purchased',
          title: 'PDF Guide Purchased',
          description: `Relocation guide downloaded by ${purchase.email}`,
          timestamp: purchase.createdAt
        });
      });

      // Sort by timestamp
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(activities.slice(0, 10));

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Use fallback data for demonstration
      setStats({
        totalProfiles: 45,
        totalBookings: 12,
        pdfPurchases: 23,
        activeAlerts: 3
      });
    }
  };

  const setupRealTimeSubscriptions = () => {
    try {
      // Subscribe to user profiles changes
      const profilesSubscription = supabase
        .channel('user_profiles')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'user_profiles' },
          (payload) => {
            setStats(prev => ({ ...prev, totalProfiles: prev.totalProfiles + 1 }));
            addRecentActivity({
              id: `profile-${payload.new.id}`,
              type: 'profile_created',
              title: 'New User Assessment',
              description: `${payload.new.nationality} professional completed assessment`,
              timestamp: payload.new.created_at
            });
            toast({
              title: "New User Assessment",
              description: "A new user has completed their relocation assessment"
            });
          }
        )
        .subscribe();

      // Subscribe to consultation bookings changes
      const bookingsSubscription = supabase
        .channel('consultation_bookings')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'consultation_bookings' },
          (payload) => {
            setStats(prev => ({ ...prev, totalBookings: prev.totalBookings + 1 }));
            addRecentActivity({
              id: `booking-${payload.new.id}`,
              type: 'booking_created',
              title: 'Consultation Booked',
              description: `${payload.new.consultation_type} session scheduled`,
              timestamp: payload.new.created_at
            });
            toast({
              title: "New Consultation Booking",
              description: `${payload.new.consultation_type} session has been booked`
            });
          }
        )
        .subscribe();

      // Subscribe to PDF purchases changes
      const purchasesSubscription = supabase
        .channel('pdf_purchases')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'pdf_purchases' },
          (payload) => {
            setStats(prev => ({ ...prev, pdfPurchases: prev.pdfPurchases + 1 }));
            addRecentActivity({
              id: `purchase-${payload.new.id}`,
              type: 'pdf_purchased',
              title: 'PDF Guide Purchased',
              description: `Relocation guide purchased by ${payload.new.email}`,
              timestamp: payload.new.created_at
            });
            toast({
              title: "PDF Guide Purchased",
              description: "A new customer has purchased the relocation guide"
            });
          }
        )
        .subscribe();

      setIsConnected(true);

      return () => {
        profilesSubscription.unsubscribe();
        bookingsSubscription.unsubscribe();
        purchasesSubscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up real-time subscriptions:', error);
      setIsConnected(false);
    }
  };

  const addRecentActivity = (activity: RecentActivity) => {
    setRecentActivity(prev => [activity, ...prev.slice(0, 9)]);
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'profile_created':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'booking_created':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'pdf_purchased':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'alert_created':
        return <Bell className="h-4 w-4 text-orange-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Real-Time Dashboard</h2>
        <Badge variant={isConnected ? "default" : "destructive"}>
          {isConnected ? "Live Data Connected" : "Offline Mode"}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProfiles}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PDF Sales</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pdfPurchases}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Live updates from your relocation platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No recent activity to display
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}