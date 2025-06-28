import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Briefcase,
  Upload,
  ArrowRight,
  BarChart3,
  DollarSign,
  FileText,
  Smartphone,
  Share2,
  MessageSquare,
  Users,
  Calendar,
  X,
  CheckCircle,
  Mail,
  Lock,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

/* ── Supabase ─────────────────────────────────────────────── */
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

/* ── Component ────────────────────────────────────────────── */
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* unified form state */
  const [formData, setFormData] = useState({
    /* auth info */
    email: '',
    password: '',
    /* basic info */
    name: '',
    country: '',
    businessType: '',
    /* business questions */
    weeklyTransactions: '',
    monthlyRevenue: '',
    recordKeeping: '',
    mobileMoney: '',
    socialMediaPromotion: '',
    communicationMethod: '',
    staffCount: '',
    businessDuration: '',
  });

  /* ── select lists ──────────────────────────────────────── */
  const countries = [
    'Afghanistan','Albania','Algeria','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahrain','Bangladesh',
    'Belarus','Belgium','Bolivia','Bosnia and Herzegovina','Brazil','Bulgaria','Cambodia','Cameroon','Canada','Chile',
    'China','Colombia','Costa Rica','Croatia','Czech Republic','Denmark','Dominican Republic','Ecuador','Egypt',
    'El Salvador','Estonia','Ethiopia','Finland','France','Georgia','Germany','Ghana','Greece','Guatemala','Honduras',
    'Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan',
    'Kazakhstan','Kenya','Kuwait','Latvia','Lebanon','Lithuania','Luxembourg','Malaysia','Mexico','Morocco',
    'Netherlands','New Zealand','Nicaragua','Nigeria','Norway','Pakistan','Panama','Paraguay','Peru','Philippines',
    'Poland','Portugal','Qatar','Romania','Russia','Saudi Arabia','Serbia','Singapore','Slovakia','Slovenia',
    'South Africa','South Korea','Spain','Sri Lanka','Sweden','Switzerland','Thailand','Turkey','Ukraine',
    'United Arab Emirates','United Kingdom','United States','Uruguay','Venezuela','Vietnam','Yemen','Zimbabwe'
  ];

  const businessTypes = [
    'Agriculture & Farming','Automotive','Beauty & Personal Care','Construction','Consulting','E-commerce',
    'Education & Training','Entertainment','Fashion & Apparel','Financial Services','Food & Beverage','Healthcare',
    'Home Services','Manufacturing','Marketing & Advertising','Non-profit','Professional Services','Real Estate',
    'Retail','Technology','Transportation','Travel & Tourism','Wholesale Trade','Other'
  ];

  /* ── handlers ──────────────────────────────────────────── */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConnectData = () => {
    setShowUploadModal(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.email || !formData.password || !formData.name || !formData.country || !formData.businessType) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Basic password validation
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
    }
    setCurrentStep(2);
  };
  const handlePrevStep = () => setCurrentStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    /* basic validation for business questions */
    const requiredBusiness = [
      'weeklyTransactions','monthlyRevenue','recordKeeping','mobileMoney',
      'socialMediaPromotion','communicationMethod','staffCount','businessDuration',
    ] as const;
    for (const f of requiredBusiness) {
      if (!formData[f]) {
        alert('Please answer all business questions');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      console.log('🚀 Starting registration process...');
      
      // Insert into new user_profiles table
      const profileData = {
        email: formData.email,
        name: formData.name,
        country: formData.country,
        business_type: formData.businessType,
        weekly_transactions: formData.weeklyTransactions,
        monthly_revenue: formData.monthlyRevenue,
        record_keeping: formData.recordKeeping,
        mobile_money: formData.mobileMoney,
        social_media_promotion: formData.socialMediaPromotion,
        communication_method: formData.communicationMethod,
        staff_count: formData.staffCount,
        business_duration: formData.businessDuration,
      };

      console.log('📝 Inserting profile data:', profileData);

      const { data, error } = await supabase
        .from('user_profiles')
        .insert([profileData])
        .select();

      if (error) {
        console.error('❌ Supabase insert error:', error);
        alert('Failed to save profile: ' + error.message);
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Profile data saved successfully:', data);

      // Store user data and uploaded files in localStorage
      if (data && data[0]) {
        localStorage.setItem('userId', data[0].id);
        localStorage.setItem('userProfile', JSON.stringify(formData));
        
        if (uploadedFiles.length > 0) {
          localStorage.setItem('uploadedDocuments', JSON.stringify(
            uploadedFiles.map(file => ({
              name: file.name,
              size: file.size,
              type: file.type,
              uploadDate: new Date().toISOString()
            }))
          ));
        }
      }
      
      console.log('✅ Registration complete, navigating to eligibility...');
      navigate('/eligibility');
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  /* ── small UI helpers (step indicator) ─────────────────── */
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>1</div>
        <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}/>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>2</div>
      </div>
    </div>
  );

  /* ── step-1: basic info UI ─────────────────────────────── */
  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
          <input
            id="email" name="email" type="email" required
            value={formData.email} onChange={handleInputChange}
            placeholder="Enter your email address"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
          <input
            id="password" name="password" type="password" required
            value={formData.password} onChange={handleInputChange}
            placeholder="Create a secure password"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Password should be at least 6 characters long
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
          <input
            id="name" name="name" required
            value={formData.name} onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10"/>
          <select
            id="country" name="country" required
            value={formData.country} onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="">Select your country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Business Type */}
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
          Business Type
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10"/>
          <select
            id="businessType" name="businessType" required
            value={formData.businessType} onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="">Select business type</option>
            {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Connect data CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center text-gray-900">
          <Upload className="w-5 h-5 mr-2 text-blue-600"/> Upload Supporting Documents (Optional)
        </h3>
        <p className="text-gray-600 mb-4">
          Upload financial documents, business licenses, or other supporting materials to improve your loan assessment.
        </p>
        <button
          type="button" onClick={handleConnectData}
          className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          disabled={isSubmitting}
        >
          Upload Documents
        </button>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* continue button */}
      <button
        type="button" onClick={handleNextStep}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        disabled={isSubmitting}
      >
        <span>Continue to Business Questions</span>
        <ArrowRight className="w-5 h-5"/>
      </button>
    </div>
  );

  /* ── step-2: business questions UI ─────────────────────── */
  const renderBusinessQuestions = () => (
    <div className="space-y-8">
      {/* Weekly Transactions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600"/>
          How many transactions does your business process weekly?
        </label>
        <div className="space-y-3">
          {['1-10', '11-50', '51-100', '100+'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="weeklyTransactions"
                value={option}
                checked={formData.weeklyTransactions === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Monthly Revenue */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-blue-600"/>
          What is your approximate monthly revenue?
        </label>
        <div className="space-y-3">
          {['Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', 'Over $10,000'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="monthlyRevenue"
                value={option}
                checked={formData.monthlyRevenue === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Record Keeping */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600"/>
          How do you keep track of your business records?
        </label>
        <div className="space-y-3">
          {['Digital software/apps', 'Spreadsheets', 'Paper records', 'Memory/No formal records'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="recordKeeping"
                value={option}
                checked={formData.recordKeeping === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mobile Money */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-blue-600"/>
          Do you use mobile money services for your business?
        </label>
        <div className="space-y-3">
          {['Yes, regularly', 'Yes, occasionally', 'No, but interested', 'No, not available in my area'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="mobileMoney"
                value={option}
                checked={formData.mobileMoney === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Social Media Promotion */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2 text-blue-600"/>
          Do you promote your business on social media?
        </label>
        <div className="space-y-3">
          {['Yes, actively', 'Yes, occasionally', 'No, but planning to', 'No, not interested'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="socialMediaPromotion"
                value={option}
                checked={formData.socialMediaPromotion === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Communication Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600"/>
          How do you primarily communicate with customers?
        </label>
        <div className="space-y-3">
          {['Phone calls', 'Text messages/WhatsApp', 'Email', 'In-person only'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="communicationMethod"
                value={option}
                checked={formData.communicationMethod === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Staff Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600"/>
          How many people work in your business?
        </label>
        <div className="space-y-3">
          {['Just me', '2-5 people', '6-10 people', 'More than 10 people'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="staffCount"
                value={option}
                checked={formData.staffCount === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Business Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600"/>
          How long have you been running this business?
        </label>
        <div className="space-y-3">
          {['Less than 6 months', '6 months - 1 year', '1-3 years', 'More than 3 years'].map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="businessDuration"
                value={option}
                checked={formData.businessDuration === option}
                onChange={handleInputChange}
                className="mr-3 text-blue-600"
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Complete Registration</span>
          )}
        </button>
      </div>
    </div>
  );

  /* ── main JSX ──────────────────────────────────────────── */
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join MicroLoan AI
          </h1>
          <p className="text-xl text-gray-600">
            {currentStep === 1
              ? 'Start your journey to financial inclusion with just a few details.'
              : 'Help us understand your business better for accurate loan assessment.'}
          </p>
        </div>

        {renderStepIndicator()}

        {/* form wrapper */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 ? renderBasicInfo() : renderBusinessQuestions()}
          </form>

          {currentStep === 1 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/dashboard" className="text-blue-600 hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>

        {currentStep === 1 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Documents</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select files to upload
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Uploaded Files:</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;