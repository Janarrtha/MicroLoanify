import React from 'react';
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bank-Level Security
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your data security and privacy are our top priorities. We employ industry-leading 
            security measures to protect your personal and financial information.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">256-bit SSL Encryption</h3>
            <p className="text-gray-600">
              All data transmission is protected with military-grade encryption, 
              the same standard used by major banks and financial institutions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Server className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Secure Cloud Infrastructure</h3>
            <p className="text-gray-600">
              Our systems are hosted on enterprise-grade cloud infrastructure with 
              99.9% uptime and automatic security updates.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Privacy by Design</h3>
            <p className="text-gray-600">
              We collect only the minimum data necessary and never share your 
              personal information with third parties without your consent.
            </p>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regulatory Compliance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">GDPR Compliant</h3>
              </div>
              <p className="text-gray-600">
                Full compliance with European General Data Protection Regulation, 
                ensuring your data rights are protected globally.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">SOC 2 Type II</h3>
              </div>
              <p className="text-gray-600">
                Independently audited security controls that meet the highest 
                standards for data protection and system reliability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">PCI DSS Compliant</h3>
              </div>
              <p className="text-gray-600">
                Payment Card Industry Data Security Standard compliance for 
                secure handling of payment information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">ISO 27001</h3>
              </div>
              <p className="text-gray-600">
                International standard for information security management 
                systems, ensuring comprehensive security practices.
              </p>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Protect Your Data</h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data Encryption</h3>
                <p className="text-gray-600">
                  All sensitive data is encrypted both in transit and at rest using AES-256 encryption. 
                  Your personal information is never stored in plain text.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Access Controls</h3>
                <p className="text-gray-600">
                  Multi-factor authentication, role-based access controls, and regular access reviews 
                  ensure only authorized personnel can access your data.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Server className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Infrastructure</h3>
                <p className="text-gray-600">
                  Our systems are hosted in secure data centers with 24/7 monitoring, 
                  intrusion detection, and automated threat response.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Continuous Monitoring</h3>
                <p className="text-gray-600">
                  Real-time security monitoring, vulnerability scanning, and incident response 
                  procedures to detect and respond to threats immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Practices */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Security Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                What We Do
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Regular security audits and penetration testing</li>
                <li>• Employee security training and background checks</li>
                <li>• Incident response and disaster recovery plans</li>
                <li>• Regular software updates and security patches</li>
                <li>• Data backup and recovery procedures</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
                What You Can Do
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use a strong, unique password for your account</li>
                <li>• Enable two-factor authentication when available</li>
                <li>• Keep your contact information up to date</li>
                <li>• Log out of your account when using shared devices</li>
                <li>• Report suspicious activity immediately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Security?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our security team is here to address any concerns you may have.
          </p>
          <a
            href="mailto:security@microloanai.com"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Contact Security Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default Security;