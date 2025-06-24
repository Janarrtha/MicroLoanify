import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  CreditCard, 
  Shield, 
  TrendingUp,
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the support you need to succeed with MicroLoan AI. Find guides, 
            contact support, and access resources to make the most of our platform.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Live Chat</h3>
            <p className="text-gray-600 mb-6">
              Get instant help from our support team. Available 24/7 for urgent issues.
            </p>
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Phone Support</h3>
            <p className="text-gray-600 mb-6">
              Speak directly with our support specialists for personalized assistance.
            </p>
            <a
              href="tel:+1-800-MICROLOAN"
              className="block w-full py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              Call Now
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Email Support</h3>
            <p className="text-gray-600 mb-6">
              Send us detailed questions and receive comprehensive responses.
            </p>
            <a
              href="mailto:support@microloanai.com"
              className="block w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse Help Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/faq" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Getting Started</h3>
                  <p className="text-sm text-gray-600">Application process & basics</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-medium">View Articles</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link to="/faq" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assessment</h3>
                  <p className="text-sm text-gray-600">How our AI scoring works</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 group-hover:text-green-700">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link to="/faq" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Loans & Payments</h3>
                  <p className="text-sm text-gray-600">Managing your loan</p>
                </div>
              </div>
              <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                <span className="text-sm font-medium">Get Help</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link to="/security" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Security & Privacy</h3>
                  <p className="text-sm text-gray-600">Data protection & safety</p>
                </div>
              </div>
              <div className="flex items-center text-red-600 group-hover:text-red-700">
                <span className="text-sm font-medium">Security Info</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Account Management</h3>
                  <p className="text-sm text-gray-600">Profile & settings help</p>
                </div>
              </div>
              <div className="flex items-center text-yellow-600 group-hover:text-yellow-700">
                <span className="text-sm font-medium">Manage Account</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Troubleshooting</h3>
                  <p className="text-sm text-gray-600">Common issues & solutions</p>
                </div>
              </div>
              <div className="flex items-center text-indigo-600 group-hover:text-indigo-700">
                <span className="text-sm font-medium">Fix Issues</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Support Hours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600">24/7 for urgent issues</p>
              <p className="text-gray-600">9 AM - 6 PM for general support</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600">Monday - Friday: 8 AM - 8 PM</p>
              <p className="text-gray-600">Saturday: 9 AM - 5 PM</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600">24/7 - We respond within</p>
              <p className="text-gray-600">2 hours during business days</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Support</h2>
          <p className="text-red-700 mb-6">
            For urgent issues like suspected fraud, account security concerns, or payment emergencies:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1-800-EMERGENCY"
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Emergency Hotline
            </a>
            <a
              href="mailto:emergency@microloanai.com"
              className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
            >
              Emergency Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;