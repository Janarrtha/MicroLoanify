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
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const LoanDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [eligibilityData, setEligibilityData] = useState<any>(null);
  const [showLoanApplication, setShowLoanApplication] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [loanData, setLoanData] = useState<any>(null);
  const [paymentCards, setPaymentCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>('');

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

    // Load payment cards
    loadPaymentCards();
  }, []);

  const loadPaymentCards = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('payment_cards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading payment cards:', error);
      } else {
        setPaymentCards(data || []);
        // Set default card as selected
        const defaultCard = data?.find(card => card.is_default);
        if (defaultCard) {
          setSelectedCard(defaultCard.id);
        }
      }
    } catch (error) {
      console.error('Error loading payment cards:', error);
    }
  };

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

  const handleMakePayment = (amount: number, cardId: string) => {
    if (loanData && cardId) {
      const selectedCardInfo = paymentCards.find(card => card.id === cardId);
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
            type: 'payment',
            card_used: `****${selectedCardInfo?.card_number_last4}`,
            card_type: selectedCardInfo?.card_type
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
    } else {
      alert('Please select a payment card');
    }
  };

  const handleRerunAssessment = () => {
    navigate('/eligibility');
  };

  const handleViewDocuments = () => {
    setShowDocuments(true);
  };

  const handleAddCard = () => {
    setShowAddCard(true);
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

            {/* Payment Cards Management */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment Cards</h2>
                <button
                  onClick={handleAddCard}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Card</span>
                </button>
              </div>

              {paymentCards.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No payment cards added yet</p>
                  <button
                    onClick={handleAddCard}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Add Your First Card
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentCards.map((card) => (
                    <PaymentCardItem
                      key={card.id}
                      card={card}
                      onDelete={() => {
                        // Handle card deletion
                        loadPaymentCards();
                      }}
                    />
                  ))}
                </div>
              )}
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
                      <p className="text-sm text-gray-600">
                        ${payment.amount} payment processed
                        {payment.card_used && ` via ${payment.card_type} ${payment.card_used}`}
                      </p>
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
            paymentCards={paymentCards}
            selectedCard={selectedCard}
            onCardSelect={setSelectedCard}
            onSubmit={handleMakePayment}
            onClose={() => setShowPaymentModal(false)}
          />
        )}

        {/* Add Card Modal */}
        {showAddCard && (
          <AddCardModal
            onClose={() => setShowAddCard(false)}
            onCardAdded={() => {
              loadPaymentCards();
              setShowAddCard(false);
            }}
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

// Payment Card Item Component
const PaymentCardItem = ({ card, onDelete }: any) => {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this card?')) {
      try {
        const { error } = await supabase
          .from('payment_cards')
          .delete()
          .eq('id', card.id);

        if (error) {
          console.error('Error deleting card:', error);
          alert('Failed to delete card');
        } else {
          onDelete();
        }
      } catch (error) {
        console.error('Error deleting card:', error);
        alert('Failed to delete card');
      }
    }
  };

  const getCardIcon = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getCardIcon(card.card_type)}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{card.card_name}</h3>
            <p className="text-sm text-gray-600">
              {card.card_type.toUpperCase()} ****{card.card_number_last4}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="text-xs text-gray-500">
        Expires {card.expiry_month.toString().padStart(2, '0')}/{card.expiry_year}
        {card.is_default && <span className="ml-2 text-blue-600 font-semibold">• Default</span>}
      </div>
    </div>
  );
};

// Add Card Modal Component
const AddCardModal = ({ onClose, onCardAdded }: any) => {
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    isDefault: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const detectCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
    if (number.startsWith('3')) return 'Amex';
    return 'Unknown';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not found. Please sign up again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const cardType = detectCardType(cardData.cardNumber);
      const last4 = cardData.cardNumber.slice(-4);

      const { error } = await supabase
        .from('payment_cards')
        .insert([
          {
            user_id: userId,
            card_name: cardData.cardName,
            card_number_last4: last4,
            card_type: cardType,
            expiry_month: parseInt(cardData.expiryMonth),
            expiry_year: parseInt(cardData.expiryYear),
            cardholder_name: cardData.cardholderName,
            is_default: cardData.isDefault
          }
        ]);

      if (error) {
        console.error('Error adding card:', error);
        alert('Failed to add card. Please try again.');
      } else {
        alert('Card added successfully!');
        onCardAdded();
      }
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Failed to add card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Payment Card</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Name (for your reference)
            </label>
            <input
              type="text"
              name="cardName"
              required
              value={cardData.cardName}
              onChange={handleInputChange}
              placeholder="e.g., Personal Visa, Business Card"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              required
              value={cardData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Month
              </label>
              <select
                name="expiryMonth"
                required
                value={cardData.expiryMonth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {(i + 1).toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Year
              </label>
              <select
                name="expiryYear"
                required
                value={cardData.expiryYear}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              required
              value={cardData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardholderName"
              required
              value={cardData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={cardData.isDefault}
              onChange={handleInputChange}
              className="mr-2"
              disabled={isSubmitting}
            />
            <label className="text-sm text-gray-700">
              Set as default payment method
            </label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Card'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Security Note:</strong> In production, card details would be securely tokenized. 
            This is a demo environment.
          </p>
        </div>
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
const PaymentModal = ({ monthlyPayment, paymentCards, selectedCard, onCardSelect, onSubmit, onClose }: any) => {
  const [paymentAmount, setPaymentAmount] = useState(monthlyPayment);

  const handleSubmit = () => {
    if (!selectedCard) {
      alert('Please select a payment card');
      return;
    }
    onSubmit(paymentAmount, selectedCard);
  };

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
            Payment Card
          </label>
          {paymentCards.length === 0 ? (
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <p className="text-gray-500 mb-2">No payment cards available</p>
              <p className="text-sm text-gray-400">Add a card in the Payment Cards section</p>
            </div>
          ) : (
            <select 
              value={selectedCard}
              onChange={(e) => onCardSelect(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a card</option>
              {paymentCards.map((card: any) => (
                <option key={card.id} value={card.id}>
                  {card.card_name} - {card.card_type} ****{card.card_number_last4}
                </option>
              ))}
            </select>
          )}
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