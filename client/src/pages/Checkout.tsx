import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { 
  useServiceCustomizer
} from '@/lib/hooks/useServiceCustomizer';
import { FEATURES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const [location, setLocation] = useLocation();
  const {
    order,
    updateContactInfo,
    submitOrder
  } = useServiceCustomizer();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitOrder = async () => {
    // Form validation
    if (!name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Update contact info in order
    updateContactInfo({
      name,
      email,
      phone,
      company
    });
    
    setIsSubmitting(true);
    
    try {
      const result = await submitOrder();
      
      if (result.success) {
        // Navigate to confirmation page
        setLocation('/confirmation');
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit order. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const backToService = () => {
    setLocation('/service-customizer');
  };
  
  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Complete Your Order</h2>
            <p className="text-xl text-cine-gray-300 max-w-3xl mx-auto">
              Review your order and provide your contact information
            </p>
          </div>
          
          {/* Checkout Form */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Contact Information */}
              <div className="lg:w-1/2">
                <div className="glassmorphism rounded-2xl p-8 mb-6">
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-cine-gray-300 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter your full name" 
                        className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-cine-gray-300 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter your email address" 
                        className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-cine-gray-300 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-cine-gray-300 mb-1">
                        Company (Optional)
                      </label>
                      <input 
                        type="text" 
                        id="company" 
                        placeholder="Enter your company name" 
                        className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/2">
                <div className="glassmorphism rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="pb-4 border-b border-cine-gray-500">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-cine-gray-300">Video Type:</span>
                        <span className="font-medium">{order.videoType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cine-gray-300">Video Length:</span>
                        <span className="font-medium">{order.videoLength}</span>
                      </div>
                    </div>
                    
                    <div className="pb-4 border-b border-cine-gray-500">
                      <div className="text-cine-gray-300 mb-2">Selected Features:</div>
                      {order.features.length > 0 ? (
                        <ul className="space-y-2">
                          {order.features.map((feature, index) => {
                            const featureItem = FEATURES.find(f => f.name === feature);
                            return (
                              <li key={index} className="flex justify-between items-center">
                                <span>{feature}</span>
                                <span className="font-medium text-cine-gold">
                                  {formatCurrency(featureItem?.price || 0)}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="text-cine-gray-500 text-sm italic">No features selected</p>
                      )}
                    </div>
                    
                    <div className="pb-4">
                      <div className="flex justify-between items-center text-xl font-semibold">
                        <span>Total:</span>
                        <span className="text-cine-gold">{formatCurrency(order.totalPrice)}</span>
                      </div>
                      <p className="text-xs text-cine-gray-300 mt-2">
                        A team member will contact you to finalize your order and arrange payment details.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-4 bg-cine-gold text-cine-black rounded-md font-semibold text-lg hover:bg-opacity-90 transition-colors transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cine-gold"
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Order'}
                  </button>
                  
                  <button 
                    className="w-full py-3 mt-4 bg-transparent border border-cine-gold text-cine-gold rounded-md font-medium hover:bg-cine-gold hover:bg-opacity-10 transition-colors"
                    onClick={backToService}
                    disabled={isSubmitting}
                  >
                    Back to Service Customizer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
