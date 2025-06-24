import React from 'react';
import { Shield, Eye, Lock, Users } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: January 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At MicroLoan AI, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              AI-powered microlending platform and related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              Information We Collect
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Name, email address, phone number, and contact information</li>
                  <li>Government-issued identification numbers</li>
                  <li>Date of birth and demographic information</li>
                  <li>Business information and employment details</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Financial Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Bank account information and transaction history</li>
                  <li>Credit history and credit scores</li>
                  <li>Income and expense information</li>
                  <li>Loan application and repayment data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Alternative Data</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Mobile money usage patterns</li>
                  <li>Social media activity (with your consent)</li>
                  <li>Business transaction patterns</li>
                  <li>Digital footprint and online behavior</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-green-600" />
              How We Use Your Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Loan Processing</h3>
                <p className="text-gray-600">
                  We use your information to assess your creditworthiness, process loan applications, 
                  and make lending decisions using our AI algorithms.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Service Improvement</h3>
                <p className="text-gray-600">
                  Your data helps us improve our AI models, enhance user experience, 
                  and develop new features and services.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Communication</h3>
                <p className="text-gray-600">
                  We use your contact information to send you important updates about your account, 
                  loan status, and relevant financial education content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-purple-600" />
              Information Sharing
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Service Providers:</strong> With trusted partners who help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>256-bit SSL encryption for all data transmission</li>
              <li>Secure cloud infrastructure with regular security audits</li>
              <li>Multi-factor authentication and access controls</li>
              <li>Regular security training for all employees</li>
              <li>Compliance with SOC 2, ISO 27001, and other security standards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your personal information:
            </p>
            
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal information for as long as necessary to provide our services 
              and comply with legal obligations. Loan-related data is typically retained for 7 years 
              after loan completion, while marketing data may be deleted upon request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Transfers</h2>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data during international transfers, 
              including standard contractual clauses and adequacy decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-600">
              Our services are not intended for individuals under 18 years of age. 
              We do not knowingly collect personal information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on our website and sending you an email notification. 
              Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacy@microloanai.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (800) MICROLOAN</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;