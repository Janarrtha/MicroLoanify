import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  ArrowRight,
  BarChart3,
  DollarSign,
  FileText,
  Smartphone,
  Share2,
  MessageSquare,
  Users,
  Calendar,
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

  /* unified form state */
  const [formData, setFormData] = useState({
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

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.country || !formData.businessType) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setCurrentStep(2);
  };
  const handlePrevStep = () => setCurrentStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* basic validation for business questions */
    const requiredBusiness = [
      'weeklyTransactions','monthlyRevenue','recordKeeping','mobileMoney',
      'socialMediaPromotion','communicationMethod','staffCount','businessDuration',
    ] as const;
    for (const f of requiredBusiness) {
      if (!formData[f]) {
        alert('Please answer all business questions');
        return;
      }
    }

    /* insert into Supabase */
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          /* basic */
          name:              formData.name,
          country:           formData.country,
          business_type:     formData.businessType,
          /* business answers 1-col-per-field */
          weekly_transactions:    formData.weeklyTransactions,
          monthly_revenue:        formData.monthlyRevenue,
          record_keeping:         formData.recordKeeping,
          mobile_money:           formData.mobileMoney,
          social_media_promotion: formData.socialMediaPromotion,
          communication_method:   formData.communicationMethod,
          staff_count:            formData.staffCount,
          business_duration:      formData.businessDuration,
        },
      ])
      .select();

    if (error) {
      console.error('❌ Supabase insert error:', error.message);
      alert('Something went wrong – please try again.');
      return;
    }

    localStorage.setItem('userId', data![0].id);   // keep uuid for later
    navigate('/eligibility');
  };

  const handleConnectData = () =>
    alert('Data-connection feature coming soon!');

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

      {/* Optional connect-data CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center text-gray-900">
          <LinkIcon className="w-5 h-5 mr-2 text-blue-600"/> Connect Your Data (Optional)
        </h3>
        <p className="text-gray-600 mb-4">
          Securely connect your financial accounts to improve your loan assessment and get better rates.
        </p>
        <button
          type="button" onClick={handleConnectData}
          className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white"
        >
          Connect Data Sources
        </button>
      </div>

      {/* continue button */}
      <button
        type="button" onClick={handleNextStep}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2"
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
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700"
        >
          Complete Registration
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
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;