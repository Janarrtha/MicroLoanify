import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: January 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using MicroLoan AI's services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-blue-600" />
              Service Description
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                MicroLoan AI provides AI-powered microlending services, including:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Credit assessment using alternative data sources</li>
                <li>Microloan origination and servicing</li>
                <li>Financial education and business support</li>
                <li>Credit building and reporting services</li>
                <li>Mobile and web-based platform access</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Requirements</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                To use our services, you must:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Be at least 18 years of age</li>
                <li>Have legal capacity to enter into contracts</li>
                <li>Provide accurate and complete information</li>
                <li>Have a valid business or business plan</li>
                <li>Meet our creditworthiness criteria</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan Terms and Conditions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Loan Amounts and Terms</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Loan amounts range from $500 to $10,000</li>
                  <li>Repayment terms from 6 to 24 months</li>
                  <li>Interest rates determined by AI assessment (4-12% annually)</li>
                  <li>No origination fees or prepayment penalties</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Repayment Obligations</h3>
                <p className="text-gray-600">
                  You agree to repay your loan according to the agreed schedule. Late payments may incur fees 
                  and negatively impact your credit score. We offer payment modification options for borrowers 
                  experiencing financial hardship.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Account Security</h3>
                <p className="text-gray-600">
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Accurate Information</h3>
                <p className="text-gray-600">
                  You must provide accurate, current, and complete information during registration 
                  and loan application processes. Misrepresentation may result in account termination.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Prohibited Uses</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Using our services for illegal activities</li>
                  <li>Attempting to circumvent our security measures</li>
                  <li>Providing false or misleading information</li>
                  <li>Interfering with other users' access to our services</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
              Risks and Disclaimers
            </h2>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> Borrowing money involves financial risk. Consider the following:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Loans must be repaid regardless of business success</li>
                <li>Late payments may affect your credit score</li>
                <li>Our AI assessment is not a guarantee of business success</li>
                <li>Interest rates and fees will increase the total amount owed</li>
                <li>Default may result in collection activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600">
              All content, features, and functionality of our platform are owned by MicroLoan AI 
              and are protected by copyright, trademark, and other intellectual property laws. 
              You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Use</h2>
            <p className="text-gray-600">
              Your privacy is important to us. Our collection and use of personal information 
              is governed by our Privacy Policy, which is incorporated into these Terms by reference. 
              By using our services, you consent to our data practices as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              To the maximum extent permitted by law, MicroLoan AI shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to 
              loss of profits, data, or business opportunities, arising from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Arbitration Agreement</h3>
                <p className="text-gray-600">
                  Any disputes arising from these Terms or our services will be resolved through 
                  binding arbitration rather than in court, except for small claims court matters.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Governing Law</h3>
                <p className="text-gray-600">
                  These Terms are governed by the laws of the State of California, 
                  without regard to conflict of law principles.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-600">
              We may terminate or suspend your account and access to our services at any time, 
              with or without notice, for conduct that we believe violates these Terms or is harmful 
              to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these Terms at any time. We will notify you of material changes 
              via email or through our platform. Your continued use of our services after such changes 
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> legal@microloanai.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (800) MICROLOAN</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </section>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-blue-800 font-medium">
              By using MicroLoan AI's services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;