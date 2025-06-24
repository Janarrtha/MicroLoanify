import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fair, competitive rates with no hidden fees. Our AI-powered assessment 
            ensures you get the best possible terms based on your business profile.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Starter Tier */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">Perfect for new businesses</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">8-12%</div>
              <p className="text-sm text-gray-600">Annual Interest Rate</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Loan amounts: $500 - $1,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">6-12 month terms</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">No origination fees</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Basic credit building</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Mobile app access</span>
              </div>
            </div>
            
            <Link
              to="/signup"
              className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center block"
            >
              Get Started
            </Link>
          </div>

          {/* Standard Tier */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Most Popular</span>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
              <p className="text-gray-600 mb-4">For growing businesses</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">6-10%</div>
              <p className="text-sm text-gray-600">Annual Interest Rate</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Loan amounts: $1,500 - $4,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">6-18 month terms</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">No origination fees</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Advanced credit building</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Priority customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Business insights dashboard</span>
              </div>
            </div>
            
            <Link
              to="/signup"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-center block"
            >
              Get Started
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">For established businesses</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">4-8%</div>
              <p className="text-sm text-gray-600">Annual Interest Rate</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Loan amounts: $4,000 - $10,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">12-24 month terms</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">No origination fees</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Premium credit building</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Dedicated account manager</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Advanced analytics & reporting</span>
              </div>
            </div>
            
            <Link
              to="/signup"
              className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors text-center block"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What's Included</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">No Hidden Fees</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• No origination fees</li>
                <li>• No prepayment penalties</li>
                <li>• No application fees</li>
                <li>• No monthly maintenance fees</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Flexible Terms</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Choose your repayment schedule</li>
                <li>• Early repayment options</li>
                <li>• Grace period for late payments</li>
                <li>• Loan modification assistance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pricing FAQ</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How are interest rates determined?</h3>
              <p className="text-gray-600">
                Our AI analyzes your business profile, transaction history, and alternative credit data 
                to determine your personalized interest rate. Better business metrics lead to lower rates.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Are there any additional fees?</h3>
              <p className="text-gray-600">
                No. We believe in transparent pricing with no hidden fees. The interest rate is the only 
                cost associated with your loan.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I pay off my loan early?</h3>
              <p className="text-gray-600">
                Yes! You can pay off your loan early without any prepayment penalties. This can help 
                you save on interest and improve your credit score faster.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Your Rate?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get a personalized rate quote in minutes with no impact to your credit score.
          </p>
          <Link
            to="/eligibility"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 space-x-2"
          >
            <span>Check Your Rate</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;