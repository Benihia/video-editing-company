import React from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { Check } from 'lucide-react';
import { calculateDeliveryEstimate, generateOrderRef } from '@/lib/utils';
import { useServiceCustomizer } from '@/lib/hooks/useServiceCustomizer';

export default function OrderConfirmation() {
  const { order } = useServiceCustomizer();
  const orderRef = generateOrderRef();
  const estimatedDelivery = calculateDeliveryEstimate(order.videoLength);
  
  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center glassmorphism rounded-2xl p-12">
            <div className="w-20 h-20 mx-auto bg-cine-gold bg-opacity-20 rounded-full flex items-center justify-center mb-8">
              <Check className="w-10 h-10 text-cine-gold" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Order Submitted Successfully!</h2>
            <p className="text-xl text-cine-gray-300 mb-8">
              Thank you for choosing CineWave Studios. We've received your order details and will contact you shortly to discuss the next steps.
            </p>
            
            <div className="p-6 bg-cine-black bg-opacity-50 rounded-lg mb-8">
              <div className="text-left">
                <div className="mb-3">
                  <span className="text-cine-gray-300">Order Reference:</span>
                  <span className="font-medium ml-2">{orderRef}</span>
                </div>
                <div>
                  <span className="text-cine-gray-300">Estimated Delivery:</span>
                  <span className="font-medium ml-2">{estimatedDelivery}</span>
                </div>
              </div>
            </div>
            
            <Link href="/">
              <a className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-cine-black bg-cine-gold hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cine-gold">
                Return to Homepage
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
