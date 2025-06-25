import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  FileText, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  X
} from 'lucide-react';

const LoanDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [eligibilityData, setEligibilityData] = useState<any>(null);
  const [showLoanApplication, setShowLoanApplication] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [loanData, setLoanData] = useState<any>(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('userProfile');
    const storedEligibility = localStorage.getItem('eligibilityResult');
    const storedDocuments = localStorage.getItem('uploadedDocuments');
    const storedLoan = localStorage.getItem('activeLoan');
    
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    
    if (storedEligibility) {
      setEligibilityData(JSON.parse(storedEligibility));
    }

    if (storedDocuments) {
      setUploadedDocuments(JSON.parse(storedDocuments));
    }

    if (storedLoan) {
      setLoanData(JSON.parse(storedLoan));
    }
  }, []);

  const handleApplyForLoan = () => {
    setShowLoanApplication(true);
  };

  const handleSubmitLoanApplication = (loanAmount: number, repaymentPeriod: number) => {
    const newLoan = {
      id: Date.now(),
      amount: loanAmount,
      repaymentPeriod,
      monthlyPayment: Math.round((loanAmount * 1.08) / repaymentPeriod), // 8% interest
      remainingPayments: repaymentPeriod,
      totalPaid: 0,
      status: 'active',
      startDate: new Date().toISOString(),
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentHistory: []
    };

    localStorage.setItem('activeLoan', JSON.stringify(newLoan));
    setLoanData(newLoan);
    setShowLoanApplication(false);
    alert('Loan application approved! Your funds will be disbursed within 24 hours.');
  };

  const handleMakePayment = (amount: number) => {
    if (loanData) {
      const updatedLoan = {
        ...loanData,
        totalPaid: loanData.totalPaid + amount,
        remainingPayments: Math.max(0, loanData.remainingPayments - 1),
        nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        paymentHistory: [
          ...loanData.paymentHistory,
          {
            id: Date.now(),
            amount,
            date: new Date().toISOString(),
            type: 'payment'
          }
        ]
      };

      if (updatedLoan.remainingPayments === 0) {
        updatedLoan.status = 'completed';
      }

      localStorage.setItem('activeLoan', JSON.stringify(updatedLoan));
      setLoanData(updatedLoan);
      setShowPaymentModal(false);
      alert('Payment processed successfully!');
    }
  };

  const handleRerunAssessment = () => {
    navigate('/eligibility');
  };

  const handleViewDocuments = () => {
    setShowDocuments(true);
  };

  // Mock data if no stored data
  const defaultData = {
    score: 742,
    maxLoanAmount: 3500,
    eligible: true
  };

  const currentData = eligibilityData || defaultData;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back{userData?.name ? `, ${userData.name}` : ''}!
          </h1>
          <p className="text-xl text-gray-600">
            Here's your financial overview and loan status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credit Score Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your AI Credit Score</h2>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{currentData.score}</div>
                  <div className="text-sm text-gray-600">Credit Score</div>
                  <div className="text-sm text-green-600 font-semibold">+12 this month</div>
                </div>
                
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full"
                      style={{ width: `${(currentData.score - 300) / 550 * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Loan or Loan Eligibility */}
            {loanData ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Active Loan</h2>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">Loan Amount</h3>
                    <p className="text-2xl font-bold text-gray-900">${loanData.amount.toLocaleString()}</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">Monthly Payment</h3>
                    <p className="text-2xl font-bold text-gray-900">${loanData.monthlyPayment}</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">Remaining Payments</h3>
                    <p className="text-2xl font-bold text-gray-900">{loanData.remainingPayments}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Make Payment
                  </button>
                  <button
                    onClick={() => navigate('/payment-history')}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    View Payment History
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Loan Eligibility</h2>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                    <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">Max Loan Amount</h3>
                    <p className="text-2xl font-bold text-gray-900">${currentData.maxLoanAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Based on AI assessment</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">Repayment Terms</h3>
                    <p className="text-2xl font-bold text-gray-900">6-24 months</p>
                    <p className="text-sm text-gray-600">Flexible options available</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={handleApplyForLoan}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Apply for Loan</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {loanData?.paymentHistory?.slice(-3).map((payment: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Payment Made</h3>
                      <p className="text-sm text-gray-600">${payment.amount} payment processed</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Eligibility Assessment Completed</h3>
                    <p className="text-sm text-gray-600">AI analysis finished - You're pre-approved!</p>
                  </div>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Account Verified</h3>
                    <p className="text-sm text-gray-600">Your profile has been successfully verified</p>
                  </div>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleRerunAssessment}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Re-run Assessment</span>
                </button>
                
                <button 
                  onClick={() => navigate('/payment-history')}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <span>Payment History</span>
                </button>
                
                <button 
                  onClick={handleViewDocuments}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>View Documents</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900">Improve Your Score</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Connect more data sources</li>
                <li>• Maintain consistent business transactions</li>
                <li>• Make timely loan payments</li>
                <li>• Update your business information</li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help you with any questions about your loan application.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Loan Application Modal */}
        {showLoanApplication && (
          <LoanApplicationModal
            maxAmount={currentData.maxLoanAmount}
            onSubmit={handleSubmitLoanApplication}
            onClose={() => setShowLoanApplication(false)}
          />
        )}

        {/* Payment Modal */}
        {showPaymentModal && loanData && (
          <PaymentModal
            monthlyPayment={loanData.monthlyPayment}
            onSubmit={handleMakePayment}
            onClose={() => setShowPaymentModal(false)}
          />
        )}

        {/* Documents Modal */}
        {showDocuments && (
          <DocumentsModal
            documents={uploadedDocuments}
            onClose={() => setShowDocuments(false)}
          />
        )}
      </div>
    </div>
  );
};

// Loan Application Modal Component
const LoanApplicationModal = ({ maxAmount, onSubmit, onClose }: any) => {
  const [loanAmount, setLoanAmount] = useState(maxAmount);
  const [repaymentPeriod, setRepaymentPeriod] = useState(12);

  const handleSubmit = () => {
    onSubmit(loanAmount, repaymentPeriod);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply for Loan</h2>
        <p className="text-gray-600 mb-6">
          You're pre-approved for up to ${maxAmount.toLocaleString()}. 
          How much would you like to borrow?
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount: ${loanAmount.toLocaleString()}
          </label>
          <input
            type="range"
            min="500"
            max={maxAmount}
            step="100"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$500</span>
            <span>${maxAmount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repayment Period
          </label>
          <select 
            value={repaymentPeriod}
            onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="18">18 months</option>
            <option value="24">24 months</option>
          </select>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Monthly Payment:</span>
            <span className="font-semibold">${Math.round((loanAmount * 1.08) / repaymentPeriod)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Interest:</span>
            <span className="font-semibold">${Math.round(loanAmount * 0.08)}</span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Modal Component
const PaymentModal = ({ monthlyPayment, onSubmit, onClose }: any) => {
  const [paymentAmount, setPaymentAmount] = useState(monthlyPayment);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Make Payment</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Amount
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`$${monthlyPayment}`}
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum payment: ${monthlyPayment}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Bank Transfer</option>
            <option>Mobile Money</option>
            <option>Credit Card</option>
          </select>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(paymentAmount)}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Documents Modal Component
const DocumentsModal = ({ documents, onClose }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Documents</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No documents uploaded yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanDashboard;