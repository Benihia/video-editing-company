import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { 
  useServiceCustomizer,
  ServiceOrder 
} from '@/lib/hooks/useServiceCustomizer';
import { 
  VIDEO_TYPES, 
  VIDEO_LENGTHS, 
  FEATURES 
} from '@/lib/constants';
import { 
  ChevronDown,
  Upload,
  ArrowRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ServiceCustomizer() {
  const [location, setLocation] = useLocation();
  const {
    order,
    updateVideoType,
    updateVideoLength,
    toggleFeature,
    updateFileLink,
    updateNotes
  } = useServiceCustomizer();
  
  const [fileUrl, setFileUrl] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const handleVideoTypeChange = (type: string) => {
    updateVideoType(type);
  };
  
  const handleVideoLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    updateVideoLength(selectedOption.text);
  };
  
  const handleFeatureToggle = (feature: string) => {
    toggleFeature(feature);
  };
  
  const handleFileLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFileLink(e.target.value);
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNotes(e.target.value);
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsUploading(true);
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);
      
      // Upload file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(interval);
      
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      
      const data = await response.json();
      setFileUrl(data.path);
      updateFileLink(data.path);
      setUploadProgress(100);
      
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  const proceedToCheckout = () => {
    setLocation('/checkout');
  };
  
  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Customize Your Video</h2>
            <p className="text-xl text-cine-gray-300 max-w-3xl mx-auto">
              Build your perfect video editing package with our intuitive configurator
            </p>
          </div>
          
          {/* Service Customizer Form */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Section */}
              <div className="lg:w-2/3">
                <div className="glassmorphism rounded-2xl p-8 mb-6">
                  {/* Video Type Selector */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Video Type</h3>
                    <p className="text-cine-gray-300 mb-4">Select the type of video you need.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {VIDEO_TYPES.map((type) => (
                        <label 
                          key={type.id}
                          className={`relative flex items-center p-4 rounded-lg border cursor-pointer hover:border-cine-gold transition-colors ${
                            order.videoType === type.name 
                              ? 'border-cine-gold' 
                              : 'border-cine-gray-500'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="videoType" 
                            value={type.id} 
                            className="hidden"
                            checked={order.videoType === type.name}
                            onChange={() => handleVideoTypeChange(type.name)}
                          />
                          <div className="mr-3 w-5 h-5 rounded-full border-2 border-cine-gray-300 flex-shrink-0 flex items-center justify-center">
                            <div className={`w-3 h-3 rounded-full bg-cine-gold ${
                              order.videoType === type.name ? 'block' : 'hidden'
                            }`}></div>
                          </div>
                          <div>
                            <span className="block font-medium">{type.name}</span>
                            <span className="text-sm text-cine-gray-300">{type.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Video Length Selector */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Video Length</h3>
                    <p className="text-cine-gray-300 mb-4">Select the approximate length of your final video.</p>
                    
                    <div className="relative">
                      <select 
                        id="videoLength" 
                        className="block w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                        onChange={handleVideoLengthChange}
                        value={VIDEO_LENGTHS.find(item => item.name === order.videoLength)?.id || '180'}
                      >
                        {VIDEO_LENGTHS.map((length) => (
                          <option key={length.id} value={length.id}>
                            {length.name} {length.price > 0 && `($${length.price})`} {length.description && `(${length.description})`}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cine-white">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Features Selector */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Features & Add-ons</h3>
                    <p className="text-cine-gray-300 mb-4">Select the features you'd like to include in your video.</p>
                    
                    <div className="space-y-4">
                      {FEATURES.map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between p-4 rounded-lg border border-cine-gray-500">
                          <div>
                            <span className="block font-medium">{feature.name}</span>
                            <span className="text-sm text-cine-gray-300">{feature.description}</span>
                          </div>
                          <div className="relative inline-block w-12 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id={`feature-${feature.id}`} 
                              className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-cine-white border-4 border-cine-gray-300 appearance-none cursor-pointer transition-all duration-300 ease-in-out ${
                                order.features.includes(feature.name) ? 'right-0 border-cine-gold' : 'right-6'
                              }`}
                              checked={order.features.includes(feature.name)}
                              onChange={() => handleFeatureToggle(feature.name)}
                              data-price={feature.price}
                            />
                            <label 
                              htmlFor={`feature-${feature.id}`} 
                              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                                order.features.includes(feature.name) ? 'bg-cine-gold' : 'bg-cine-gray-500'
                              }`}
                            ></label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* File Uploader */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Media Upload</h3>
                    <p className="text-cine-gray-300 mb-4">Upload your footage or provide a link to your files.</p>
                    
                    <div className="flex flex-col space-y-4">
                      <label className="border-2 border-dashed border-cine-gray-500 rounded-lg p-8 text-center hover:border-cine-gold transition-colors cursor-pointer">
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileUpload}
                          accept="video/*,image/*,application/zip"
                        />
                        <Upload className="mx-auto w-12 h-12 text-cine-gray-300 mb-4" />
                        <p className="text-cine-gray-300 mb-2">Drag and drop your files here</p>
                        <p className="text-sm text-cine-gray-500">or</p>
                        <button className="mt-2 px-4 py-2 bg-cine-gold text-cine-black rounded-md font-medium hover:bg-opacity-90 transition-colors">
                          Browse Files
                        </button>
                        <p className="text-xs text-cine-gray-500 mt-2">Maximum file size: 1GB per file</p>
                        
                        {isUploading && (
                          <div className="mt-4">
                            <div className="w-full bg-cine-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-cine-gold h-2.5 rounded-full transition-all duration-300" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-cine-gray-300 mt-1">Uploading: {uploadProgress}%</p>
                          </div>
                        )}
                        
                        {fileUrl && (
                          <div className="mt-4 text-cine-gold">
                            File uploaded successfully!
                          </div>
                        )}
                      </label>
                      
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Or paste a link to your files (Google Drive, Dropbox, etc.)" 
                          className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                          value={order.fileLink || ''}
                          onChange={handleFileLinkChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Notes Field */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Project Notes</h3>
                    <p className="text-cine-gray-300 mb-4">Share any specific instructions or details about your project.</p>
                    
                    <textarea 
                      rows={4} 
                      placeholder="Describe your vision, preferences, or any special requests..." 
                      className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                      value={order.notes || ''}
                      onChange={handleNotesChange}
                    ></textarea>
                  </div>
                  
                  <div className="hidden md:block">
                    <button 
                      className="w-full py-4 bg-cine-gold text-cine-black rounded-md font-semibold text-lg hover:bg-opacity-90 transition-colors transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cine-gold"
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary Section */}
              <div className="lg:w-1/3">
                <div className="glassmorphism rounded-2xl p-8 sticky top-28">
                  <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
                  
                  {/* Order Summary */}
                  <div id="order-summary" className="space-y-4 mb-6">
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
                      <p className="text-xs text-cine-gray-300 mt-2">Prices are estimates. Final quote may be adjusted based on project complexity.</p>
                    </div>
                  </div>
                  
                  <div className="md:hidden">
                    <button 
                      className="w-full py-4 bg-cine-gold text-cine-black rounded-md font-semibold text-lg hover:bg-opacity-90 transition-colors transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cine-gold"
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
