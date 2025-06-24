import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MicroLoan AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/signup"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/signup') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Sign Up
            </Link>
            <Link
              to="/eligibility"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/eligibility') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Check Eligibility
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 ${
                isActive('/dashboard') ? 'shadow-lg' : ''
              }`}
            >
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block font-medium transition-colors hover:text-blue-600 ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className={`block font-medium transition-colors hover:text-blue-600 ${
                  isActive('/signup') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Sign Up
              </Link>
              <Link
                to="/eligibility"
                onClick={() => setIsOpen(false)}
                className={`block font-medium transition-colors hover:text-blue-600 ${
                  isActive('/eligibility') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Check Eligibility
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;