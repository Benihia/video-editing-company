import { useState, useEffect } from 'react';
import { VIDEO_LENGTHS, FEATURES } from '../constants';

export interface ServiceOrder {
  videoType: string;
  videoLength: string;
  features: string[];
  fileLink?: string;
  notes?: string;
  totalPrice: number;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

export function useServiceCustomizer() {
  const [order, setOrder] = useState<ServiceOrder>({
    videoType: 'Commercial',
    videoLength: '1-3 minutes',
    features: [],
    totalPrice: 850
  });

  // Update video type
  const updateVideoType = (type: string) => {
    setOrder(prev => ({
      ...prev,
      videoType: type
    }));
  };

  // Update video length
  const updateVideoLength = (length: string) => {
    const selectedLength = VIDEO_LENGTHS.find(item => item.name === length);
    const basePrice = selectedLength?.price || 0;
    
    setOrder(prev => {
      // Recalculate total with features
      const featuresPriceTotal = calculateFeaturesPriceTotal(prev.features);
      
      return {
        ...prev,
        videoLength: length,
        totalPrice: basePrice + featuresPriceTotal
      };
    });
  };

  // Calculate the total price for selected features
  const calculateFeaturesPriceTotal = (selectedFeatures: string[]) => {
    return selectedFeatures.reduce((total, featureName) => {
      const feature = FEATURES.find(f => f.name === featureName);
      return total + (feature?.price || 0);
    }, 0);
  };

  // Toggle a feature selection
  const toggleFeature = (featureName: string) => {
    setOrder(prev => {
      const features = prev.features.includes(featureName)
        ? prev.features.filter(f => f !== featureName)
        : [...prev.features, featureName];
      
      // Recalculate base price from length
      const selectedLength = VIDEO_LENGTHS.find(item => item.name === prev.videoLength);
      const basePrice = selectedLength?.price || 0;
      
      // Add feature prices
      const featuresPriceTotal = calculateFeaturesPriceTotal(features);
      
      return {
        ...prev,
        features,
        totalPrice: basePrice + featuresPriceTotal
      };
    });
  };

  // Update file link
  const updateFileLink = (link: string) => {
    setOrder(prev => ({
      ...prev,
      fileLink: link
    }));
  };

  // Update notes
  const updateNotes = (notes: string) => {
    setOrder(prev => ({
      ...prev,
      notes
    }));
  };

  // Update contact information
  const updateContactInfo = (info: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  }) => {
    setOrder(prev => ({
      ...prev,
      ...info
    }));
  };

  // Submit order to backend
  const submitOrder = async (): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: errorData.message || 'Failed to submit order' 
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting order:', error);
      return { 
        success: false, 
        error: 'Network error when submitting order' 
      };
    }
  };

  // Reset order to default values
  const resetOrder = () => {
    setOrder({
      videoType: 'Commercial',
      videoLength: '1-3 minutes',
      features: [],
      totalPrice: 850
    });
  };

  return {
    order,
    updateVideoType,
    updateVideoLength,
    toggleFeature,
    updateFileLink,
    updateNotes,
    updateContactInfo,
    submitOrder,
    resetOrder
  };
}
