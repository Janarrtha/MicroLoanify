import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Shield, TrendingUp, Users, CheckCircle, Clock, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How MicroLoan AI Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform revolutionizes microlending by using alternative data sources 
            to assess creditworthiness for the unbanked and underbanked.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Sign Up & Profile</h3>
            <p className="text-gray-600">
              Create your account and provide basic information about your business, 
              including transaction patterns and operational details.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. AI Assessment</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes your business data, transaction history, 
              and alternative credit indicators to determine your creditworthiness.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. Get Funded</h3>
            <p className="text-gray-600">
              Receive instant loan approval with personalized terms and competitive rates. 
              Funds are disbursed quickly to your preferred account.
            </p>
          </div>
        </div>

        {/* Detailed Process */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The AI Assessment Process</h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                <p className="text-gray-600">
                  We gather information about your business operations, transaction patterns, 
                  digital footprint, and financial behavior through secure, privacy-compliant methods.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our machine learning algorithms analyze over 100 data points including business 
                  stability, cash flow patterns, social verification, and repayment capacity.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Credit Score Generation</h3>
                <p className="text-gray-600">
                  A personalized credit score is generated based on your unique business profile, 
                  determining your loan eligibility and terms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Decision</h3>
                <p className="text-gray-600">
                  Receive your loan decision within minutes, not days. Our automated system 
                  provides transparent explanations for all decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Data Sources */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Alternative Data Sources We Use</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Business Transactions</h3>
              <p className="text-sm text-gray-600">Volume, frequency, and patterns of business transactions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Digital Footprint</h3>
              <p className="text-sm text-gray-600">Social media presence, online reviews, and digital engagement</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Mobile Money Usage</h3>
              <p className="text-sm text-gray-600">Mobile payment patterns and financial behavior</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Business Operations</h3>
              <p className="text-sm text-gray-600">Staff size, business duration, and operational complexity</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Financial Management</h3>
              <p className="text-sm text-gray-600">Record keeping practices and financial organization</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Communication Patterns</h3>
              <p className="text-sm text-gray-600">Customer interaction methods and business communication</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of entrepreneurs who have accessed funding through our AI-powered platform.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 space-x-2"
          >
            <span>Start Your Application</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;