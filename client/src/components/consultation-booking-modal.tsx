import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Clock, User, Mail, Phone, MessageSquare, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId?: number;
}

const consultationTypes = [
  {
    id: 'basic',
    name: 'Basic Consultation',
    duration: '30 minutes',
    price: 99,
    description: 'General visa guidance and basic eligibility assessment',
    features: ['Visa options overview', 'Basic document checklist', 'Timeline estimation']
  },
  {
    id: 'premium',
    name: 'Premium Consultation',
    duration: '60 minutes',
    price: 199,
    description: 'Comprehensive relocation planning with detailed guidance',
    features: ['Detailed visa strategy', 'Document preparation guidance', 'Banking & housing advice', 'Tax implications']
  },
  {
    id: 'expert',
    name: 'Expert Consultation',
    duration: '90 minutes',
    price: 299,
    description: 'Complete relocation package with ongoing support',
    features: ['Full relocation roadmap', 'Legal document review', 'Ongoing email support (30 days)', 'Priority booking']
  }
];

const timeSlots = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00', 
  '14:00-15:00', '15:00-16:00', '16:00-17:00'
];

const timezones = [
  'GMT+8 (Malaysia/Singapore)', 'GMT+0 (London)', 'GMT-5 (New York)', 
  'GMT+1 (Paris/Berlin)', 'GMT+9 (Tokyo)', 'GMT+11 (Sydney)'
];

// Initialize Stripe
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY ? 
  loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY) : 
  null;

// Payment Form Component
function PaymentForm({ 
  clientSecret, 
  onSuccess, 
  onError, 
  consultationType 
}: { 
  clientSecret: string; 
  onSuccess: () => void; 
  onError: (error: string) => void;
  consultationType: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}?payment=success`,
      },
    });

    setIsProcessing(false);

    if (error) {
      onError(error.message || "Payment failed");
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : `Complete Payment`}
      </Button>
    </form>
  );
}

export function ConsultationBookingModal({ isOpen, onClose, profileId }: ConsultationBookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [formData, setFormData] = useState({
    consultationType: '',
    preferredDate: '',
    timeSlot: '',
    timezone: 'GMT+8 (Malaysia/Singapore)',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specificQuestions: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await apiRequest("POST", "/api/consultations", bookingData);
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setStep(3); // Move to payment step
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setFormData({ ...formData, consultationType: type });
    setStep(2);
  };

  const handleSubmit = () => {
    if (!profileId) {
      toast({
        title: "Assessment Required",
        description: "Please complete the assessment or save your profile first to book a consultation.",
        variant: "destructive",
      });
      return;
    }

    const selectedConsultationType = consultationTypes.find(t => t.id === selectedType);
    if (!selectedConsultationType) return;

    bookingMutation.mutate({
      profileId,
      ...formData,
      price: selectedConsultationType.price * 100, // Convert to cents
    });
  };

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
    toast({
      title: "Payment Successful",
      description: "Your consultation has been booked. You'll receive a confirmation email shortly.",
    });
    onClose();
    resetModal();
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const resetModal = () => {
    setStep(1);
    setSelectedType('');
    setClientSecret('');
    setFormData({
      consultationType: '',
      preferredDate: '',
      timeSlot: '',
      timezone: 'GMT+8 (Malaysia/Singapore)',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      specificQuestions: ''
    });
  };

  const isFormValid = formData.customerName && formData.customerEmail && 
                     formData.preferredDate && formData.timeSlot;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Book Expert Consultation
          </DialogTitle>
          <DialogDescription>
            Get personalized guidance from our Malaysia relocation experts
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Choose Your Consultation Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {consultationTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className="cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {type.name}
                      <Badge variant="secondary">${type.price}</Badge>
                    </CardTitle>
                    <CardDescription>{type.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    <ul className="space-y-1">
                      {type.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Booking Details</h3>
              <Button variant="outline" onClick={() => setStep(1)}>
                Change Type
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium">
                {consultationTypes.find(t => t.id === selectedType)?.name}
              </h4>
              <p className="text-sm text-gray-600">
                {consultationTypes.find(t => t.id === selectedType)?.duration} • 
                ${consultationTypes.find(t => t.id === selectedType)?.price}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerName"
                      className="pl-10"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerEmail"
                      type="email"
                      className="pl-10"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="customerPhone">Phone Number (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerPhone"
                      className="pl-10"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="timeSlot">Time Slot</Label>
                  <Select 
                    value={formData.timeSlot} 
                    onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="Select time slot" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={formData.timezone} 
                    onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="specificQuestions">Specific Questions (Optional)</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="specificQuestions"
                  className="pl-10 min-h-[100px]"
                  value={formData.specificQuestions}
                  onChange={(e) => setFormData({ ...formData, specificQuestions: e.target.value })}
                  placeholder="Any specific questions or topics you'd like to discuss?"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid || bookingMutation.isPending}
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {bookingMutation.isPending ? "Booking..." : `Book for $${consultationTypes.find(t => t.id === selectedType)?.price}`}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && clientSecret && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Complete Payment</h3>
              <Button variant="outline" onClick={() => setStep(2)}>
                Back to Details
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium">
                {consultationTypes.find(t => t.id === selectedType)?.name}
              </h4>
              <p className="text-sm text-gray-600">
                {consultationTypes.find(t => t.id === selectedType)?.duration} • 
                ${consultationTypes.find(t => t.id === selectedType)?.price}
              </p>
              <div className="mt-2 text-sm">
                <p><strong>Date:</strong> {formData.preferredDate}</p>
                <p><strong>Time:</strong> {formData.timeSlot} ({formData.timezone})</p>
                <p><strong>Customer:</strong> {formData.customerName}</p>
              </div>
            </div>

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                clientSecret={clientSecret}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                consultationType={selectedType}
              />
            </Elements>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}