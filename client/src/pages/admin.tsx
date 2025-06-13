import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Users, Settings, Eye, CheckCircle, XCircle, Clock, DollarSign, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AdminLogin from "@/components/admin-login";

interface ConsultationBooking {
  id: number;
  profileId: number;
  consultationType: string;
  preferredDate: string;
  timeSlot: string;
  timezone: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  specificQuestions?: string;
  status: string;
  meetingLink?: string;
  price: number;
  paymentStatus: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: number;
  email: string;
  name: string;
  nationality: string;
  profession: string;
  createdAt: string;
}

interface PdfPurchase {
  id: number;
  email: string;
  sessionId: string;
  paymentStatus: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<ConsultationBooking | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch consultation bookings - always call this hook
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/consultations"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/consultations");
      return response.json();
    },
  });

  // Fetch user profiles
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ["/api/profiles/all"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/profiles/all");
      return response.json();
    },
  });

  // Fetch PDF purchases
  const { data: purchases = [], isLoading: purchasesLoading } = useQuery({
    queryKey: ["/api/admin/pdf-purchases"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/pdf-purchases");
      return response.json();
    },
  });

  // Update booking mutation
  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PATCH", `/api/consultations/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
      toast({
        title: "Booking Updated",
        description: "Consultation booking has been updated successfully.",
      });
      setIsBookingModalOpen(false);
      setSelectedBooking(null);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateBooking = () => {
    if (!selectedBooking) return;

    const updates: any = {};
    if (adminNotes !== selectedBooking.adminNotes) updates.adminNotes = adminNotes;
    if (meetingLink !== selectedBooking.meetingLink) updates.meetingLink = meetingLink;
    if (newStatus !== selectedBooking.status) updates.status = newStatus;

    if (Object.keys(updates).length > 0) {
      updateBookingMutation.mutate({ id: selectedBooking.id, updates });
    }
  };

  const openBookingModal = (booking: ConsultationBooking) => {
    setSelectedBooking(booking);
    setAdminNotes(booking.adminNotes || "");
    setMeetingLink(booking.meetingLink || "");
    setNewStatus(booking.status);
    setIsBookingModalOpen(true);
  };

  // Check for existing authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Verify token with backend
      fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
        }
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
      });
    }
  }, []);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard.",
    });
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b: ConsultationBooking) => b.status === 'pending').length,
    completedBookings: bookings.filter((b: ConsultationBooking) => b.status === 'completed').length,
    totalRevenue: bookings
      .filter((b: ConsultationBooking) => b.paymentStatus === 'paid')
      .reduce((sum: number, b: ConsultationBooking) => sum + b.price, 0) / 100,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage consultation bookings and user profiles</p>
        </div>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">Consultation Bookings</TabsTrigger>
          <TabsTrigger value="profiles">User Profiles</TabsTrigger>
          <TabsTrigger value="purchases">PDF Purchases</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Bookings</CardTitle>
              <CardDescription>Manage and track all consultation bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="text-center py-8">Loading bookings...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking: ConsultationBooking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.consultationType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{booking.preferredDate}</div>
                            <div className="text-sm text-gray-500">{booking.timeSlot}</div>
                            <div className="text-xs text-gray-400">{booking.timezone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>${(booking.price / 100).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openBookingModal(booking)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profiles</CardTitle>
              <CardDescription>View and manage user relocation profiles</CardDescription>
            </CardHeader>
            <CardContent>
              {profilesLoading ? (
                <div className="text-center py-8">Loading profiles...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Profession</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile: UserProfile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">{profile.name}</TableCell>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell>{profile.nationality}</TableCell>
                        <TableCell>{profile.profession}</TableCell>
                        <TableCell>{formatDate(profile.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PDF Guide Purchases</CardTitle>
              <CardDescription>Track all PDF guide purchases and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              {purchasesLoading ? (
                <div className="text-center py-8">Loading purchases...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Session ID</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Purchase Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.map((purchase: PdfPurchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>
                          <div className="font-medium">{purchase.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">
                            {purchase.sessionId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={purchase.paymentMethod === 'simulated' ? 'secondary' : 'default'}>
                            {purchase.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {purchase.currency} ${parseFloat(purchase.amount || "0").toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(purchase.paymentStatus)}>
                            {purchase.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{purchase.downloadCount}</span>
                            <Badge variant="outline" className="text-xs">
                              downloads
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(purchase.createdAt)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {purchases.length === 0 && !purchasesLoading && (
                <div className="text-center py-8 text-gray-500">
                  No PDF purchases yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Settings panel coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Management Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Consultation Booking</DialogTitle>
            <DialogDescription>
              Update booking status, add notes, and manage meeting details
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer Name</Label>
                  <div className="font-medium">{selectedBooking.customerName}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div>{selectedBooking.customerEmail}</div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <div>{selectedBooking.customerPhone || "Not provided"}</div>
                </div>
                <div>
                  <Label>Consultation Type</Label>
                  <div className="font-medium">{selectedBooking.consultationType}</div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Date</Label>
                  <div>{selectedBooking.preferredDate}</div>
                </div>
                <div>
                  <Label>Time Slot</Label>
                  <div>{selectedBooking.timeSlot} ({selectedBooking.timezone})</div>
                </div>
              </div>

              {selectedBooking.specificQuestions && (
                <div>
                  <Label>Specific Questions</Label>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    {selectedBooking.specificQuestions}
                  </div>
                </div>
              )}

              {/* Management Controls */}
              <div className="space-y-4 border-t pt-4">
                <div>
                  <Label htmlFor="status">Booking Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="meetingLink">Meeting Link</Label>
                  <Input
                    id="meetingLink"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="Enter Zoom/Teams meeting link"
                  />
                </div>

                <div>
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes about this booking..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdateBooking}
                    disabled={updateBookingMutation.isPending}
                  >
                    {updateBookingMutation.isPending ? "Updating..." : "Update Booking"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}