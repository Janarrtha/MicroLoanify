import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, CheckCircle, Clock, Download, Filter } from 'lucide-react';

const PaymentHistory = () => {
  const [loanData, setLoanData] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const storedLoan = localStorage.getItem('activeLoan');
    if (storedLoan) {
      setLoanData(JSON.parse(storedLoan));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  // Mock payment history if no real data
  const mockPayments = [
    {
      id: 1,
      amount: 250,
      date: '2025-01-15T10:00:00Z',
      type: 'payment',
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      amount: 250,
      date: '2024-12-15T10:00:00Z',
      type: 'payment',
      status: 'completed',
      method: 'Mobile Money'
    },
    {
      id: 3,
      amount: 250,
      date: '2024-11-15T10:00:00Z',
      type: 'payment',
      status: 'completed',
      method: 'Bank Transfer'
    }
  ];

  const payments = loanData?.paymentHistory || mockPayments;
  const filteredPayments = filterStatus === 'all' 
    ? payments 
    : payments.filter((payment: any) => payment.status === filterStatus);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Payment History
          </h1>
          <p className="text-xl text-gray-600">
            Track all your loan payments and transaction history.
          </p>
        </div>

        {/* Loan Summary */}
        {loanData && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">Original Amount</h3>
                <p className="text-2xl font-bold text-blue-600">${loanData.amount.toLocaleString()}</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">Total Paid</h3>
                <p className="text-2xl font-bold text-green-600">${loanData.totalPaid.toLocaleString()}</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">Remaining</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  ${((loanData.amount * 1.08) - loanData.totalPaid).toLocaleString()}
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">Payments Left</h3>
                <p className="text-2xl font-bold text-purple-600">{loanData.remainingPayments}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Transaction History</h2>
            
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Payments</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Payment List */}
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No payments found for the selected filter.</p>
              </div>
            ) : (
              filteredPayments.map((payment: any, index: number) => (
                <div key={payment.id || index} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${getStatusColor(payment.status || 'completed')}`}>
                      {getStatusIcon(payment.status || 'completed')}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Payment #{payment.id || index + 1}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {payment.method || 'Bank Transfer'} • {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status || 'completed')}`}>
                      {(payment.status || 'completed').charAt(0).toUpperCase() + (payment.status || 'completed').slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Next Payment Due */}
          {loanData && loanData.remainingPayments > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Next Payment Due</h3>
                  <p className="text-gray-600">
                    {new Date(loanData.nextPaymentDate).toLocaleDateString()} • ${loanData.monthlyPayment}
                  </p>
                </div>
                
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Make Payment
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;