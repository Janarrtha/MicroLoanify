import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">MicroLoan AI</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering the unbanked with AI-driven financial inclusion. 
              Access microloans and build your credit history with intelligent lending solutions.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>on</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-white">Bolt.new</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MicroLoan AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;