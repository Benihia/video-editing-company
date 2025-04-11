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
  ArrowRight,
  Film,
  Clock,
  CheckCircle,
  Sparkles,
  PlusCircle,
  MinusCircle
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
  const [activeTab, setActiveTab] = useState<number>(0);
  
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
  
  // Tabs for the configurator
  const tabs = [
    { name: "Type & Length", icon: <Film size={18} /> },
    { name: "Features", icon: <Sparkles size={18} /> },
    { name: "Files & Notes", icon: <Upload size={18} /> }
  ];
  
  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Customize Your Video</h2>
            <p className="text-lg text-cine-gray-300 max-w-2xl mx-auto">
              Build your perfect editing package in three simple steps
            </p>
          </div>
          
          {/* Service Customizer Form */}
          <div className="max-w-6xl mx-auto">
            {/* Tab navigation for small screens */}
            <div className="md:hidden flex w-full mb-6">
              <div className="bg-cine-gray-700/70 w-full rounded-lg p-1.5 flex justify-between">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center justify-center p-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                      activeTab === index 
                        ? "bg-cine-gold text-cine-black" 
                        : "text-white hover:bg-cine-gray-600"
                    }`}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    <span className="truncate">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Form Section */}
              <div className="lg:w-2/3">
                <div className="glassmorphism rounded-xl p-6 md:p-8 mb-6">
                  {/* Progress steps - visible on medium screens and up */}
                  <div className="hidden md:flex mb-8 border-b border-cine-gray-600 pb-4">
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex items-center mr-8 pb-4 ${
                          activeTab === index 
                            ? "border-b-2 border-cine-gold text-cine-gold" 
                            : "text-cine-gray-300 hover:text-white"
                        } transition-colors`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                          activeTab === index ? "bg-cine-gold text-cine-black" : "bg-cine-gray-600 text-white"
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Type & Length Tab */}
                  <div className={activeTab === 0 ? "block" : "hidden"}>
                    {/* Video Type Cards */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">What type of video do you need?</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {VIDEO_TYPES.map((type) => (
                          <div 
                            key={type.id}
                            onClick={() => handleVideoTypeChange(type.name)}
                            className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                              order.videoType === type.name 
                                ? 'bg-cine-gold/20 border-2 border-cine-gold shadow-glow-sm' 
                                : 'bg-cine-gray-700/50 hover:bg-cine-gray-700 border border-cine-gray-600'
                            }`}
                          >
                            <div className="flex items-start">
                              <div className={`p-2.5 rounded-lg mr-3 ${order.videoType === type.name ? 'bg-cine-gold' : 'bg-cine-gray-600'}`}>
                                <Film size={22} className={order.videoType === type.name ? 'text-cine-black' : 'text-white'} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{type.name}</h4>
                                <p className="text-sm text-cine-gray-300 mt-1">{type.description}</p>
                              </div>
                              {order.videoType === type.name && (
                                <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-cine-gold" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Video Length Selector */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">How long will your video be?</h3>
                      
                      <div className="space-y-3">
                        {VIDEO_LENGTHS.map((length) => (
                          <div 
                            key={length.id}
                            onClick={() => updateVideoLength(length.name)}
                            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                              order.videoLength === length.name 
                                ? 'bg-cine-gold/20 border-2 border-cine-gold' 
                                : 'bg-cine-gray-700/50 hover:bg-cine-gray-700 border border-cine-gray-600'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`mr-3 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                                order.videoLength === length.name ? 'border-cine-gold' : 'border-cine-gray-400'
                              }`}>
                                {order.videoLength === length.name && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-cine-gold"></div>
                                )}
                              </div>
                              <div>
                                <span className="block font-medium">{length.name}</span>
                                {length.description && (
                                  <span className="text-sm text-cine-gray-300">{length.description}</span>
                                )}
                              </div>
                            </div>
                            <div className="text-cine-gold font-semibold">
                              {length.price > 0 ? formatCurrency(length.price) : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <button 
                        onClick={() => setActiveTab(1)}
                        className="flex items-center px-6 py-3 bg-cine-gold text-cine-black rounded-lg font-medium hover:bg-white transition-colors"
                      >
                        Continue
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Features Tab */}
                  <div className={activeTab === 1 ? "block" : "hidden"}>
                    <h3 className="text-xl font-semibold mb-4">Enhance your video with premium features</h3>
                    <p className="text-cine-gray-300 mb-6">Select the options that will make your video stand out.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {FEATURES.map((feature) => (
                        <div 
                          key={feature.id}
                          onClick={() => handleFeatureToggle(feature.name)}
                          className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                            order.features.includes(feature.name) 
                              ? 'bg-cine-gold/20 border-2 border-cine-gold' 
                              : 'bg-cine-gray-700/50 hover:bg-cine-gray-700 border border-cine-gray-600'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{feature.name}</h4>
                              <p className="text-sm text-cine-gray-300 mt-1 mb-3">{feature.description}</p>
                              <div className="text-cine-gold font-semibold">{formatCurrency(feature.price)}</div>
                            </div>
                            <div className="ml-2">
                              {order.features.includes(feature.name) ? (
                                <div className="w-7 h-7 rounded-full bg-cine-gold flex items-center justify-center">
                                  <MinusCircle size={18} className="text-cine-black" />
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-cine-gray-600 flex items-center justify-center">
                                  <PlusCircle size={18} className="text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button 
                        onClick={() => setActiveTab(0)}
                        className="flex items-center px-6 py-3 bg-cine-gray-700 text-white rounded-lg font-medium hover:bg-cine-gray-600 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setActiveTab(2)}
                        className="flex items-center px-6 py-3 bg-cine-gold text-cine-black rounded-lg font-medium hover:bg-white transition-colors"
                      >
                        Continue
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Files & Notes Tab */}
                  <div className={activeTab === 2 ? "block" : "hidden"}>
                    {/* File Uploader */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Share your media files</h3>
                      <p className="text-cine-gray-300 mb-4">Upload footage or provide a link to your files.</p>
                      
                      <div className="flex flex-col space-y-4">
                        <label className="border-2 border-dashed border-cine-gray-500 rounded-lg p-6 text-center hover:border-cine-gold transition-colors cursor-pointer">
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileUpload}
                            accept="video/*,image/*,application/zip"
                          />
                          <div className="bg-cine-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-cine-gold" />
                          </div>
                          <p className="font-medium mb-1">Drag files here or click to browse</p>
                          <p className="text-sm text-cine-gray-300">Accepts video, image and ZIP files (up to 1GB)</p>
                          
                          {isUploading && (
                            <div className="mt-4">
                              <div className="w-full bg-cine-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-cine-gold h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-cine-gray-300 mt-1">Uploading: {uploadProgress}%</p>
                            </div>
                          )}
                          
                          {fileUrl && (
                            <div className="mt-4 text-cine-gold flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>File uploaded successfully!</span>
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
                      <h3 className="text-xl font-semibold mb-4">Project Notes</h3>
                      <p className="text-cine-gray-300 mb-4">Any specific instructions or details for your project?</p>
                      
                      <textarea 
                        rows={4} 
                        placeholder="Describe your vision, preferences, or any special requests..." 
                        className="w-full px-4 py-3 bg-cine-gray-700 border border-cine-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                        value={order.notes || ''}
                        onChange={handleNotesChange}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button 
                        onClick={() => setActiveTab(1)}
                        className="flex items-center px-6 py-3 bg-cine-gray-700 text-white rounded-lg font-medium hover:bg-cine-gray-600 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={proceedToCheckout}
                        className="flex items-center px-6 py-3 bg-cine-gold text-cine-black rounded-lg font-medium hover:bg-white transition-colors"
                      >
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary Section */}
              <div className="lg:w-1/3">
                <div className="glassmorphism rounded-xl p-6 sticky top-28">
                  <h3 className="text-xl font-semibold border-b border-cine-gray-600 pb-3 mb-4">Order Summary</h3>
                  
                  {/* Order Summary */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center mb-3">
                      <Film className="w-5 h-5 text-cine-gold mr-2" />
                      <span className="text-sm text-cine-gray-300">Video Details</span>
                    </div>
                    
                    <div className="pl-7 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cine-gray-300">Type:</span>
                        <span className="font-medium">{order.videoType || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cine-gray-300">Length:</span>
                        <span className="font-medium">{order.videoLength}</span>
                      </div>
                    </div>

                    <div className="flex items-center mt-5 mb-3">
                      <Sparkles className="w-5 h-5 text-cine-gold mr-2" />
                      <span className="text-sm text-cine-gray-300">Selected Features</span>
                    </div>
                    
                    <div className="pl-7">
                      {order.features.length > 0 ? (
                        <ul className="space-y-2">
                          {order.features.map((feature, index) => {
                            const featureItem = FEATURES.find(f => f.name === feature);
                            return (
                              <li key={index} className="flex justify-between items-center">
                                <span className="text-sm">{feature}</span>
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
                    
                    {/* Price total */}
                    <div className="mt-6 pt-4 border-t border-cine-gray-600">
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-cine-gold">{formatCurrency(order.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Estimated delivery */}
                  <div className="mt-6 bg-cine-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 text-cine-gold mr-1.5" />
                      <h4 className="font-medium text-sm">Estimated Delivery:</h4>
                    </div>
                    <p className="text-cine-gray-300 text-sm">
                      {order.videoLength === 'Up to 30 seconds' && '1-2 business days'}
                      {order.videoLength === '30-60 seconds' && '2-3 business days'}
                      {order.videoLength === '1-3 minutes' && '3-5 business days'}
                      {order.videoLength === '3-5 minutes' && '5-7 business days'}
                      {order.videoLength === '5-10 minutes' && '7-10 business days'}
                      {order.videoLength === 'Custom length' && 'To be determined'}
                    </p>
                  </div>
                  
                  {/* Mobile checkout button */}
                  <div className="md:hidden mt-6">
                    <button 
                      className="w-full py-3.5 bg-cine-gold text-cine-black rounded-lg font-semibold hover:bg-white transition-colors flex items-center justify-center"
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
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