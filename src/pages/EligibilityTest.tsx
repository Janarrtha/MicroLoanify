import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, ArrowRight, CheckCircle, Clock, XCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const EligibilityTest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateEligibilityScore = (userData: any) => {
    let score = 600; // Base score
    let factors = [];
    let eligibilityReasons = [];
    let riskFactors = [];

    // Weekly Transactions Analysis
    if (userData.weeklyTransactions === '100+') {
      score += 80;
      factors.push({ name: 'Transaction Volume', score: 95, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('High transaction volume indicates strong business activity');
    } else if (userData.weeklyTransactions === '51-100') {
      score += 60;
      factors.push({ name: 'Transaction Volume', score: 85, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Good transaction volume shows consistent business operations');
    } else if (userData.weeklyTransactions === '11-50') {
      score += 30;
      factors.push({ name: 'Transaction Volume', score: 70, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Moderate transaction volume indicates developing business');
    } else {
      score += 10;
      factors.push({ name: 'Transaction Volume', score: 45, status: 'poor', impact: 'negative' });
      riskFactors.push('Low transaction volume may indicate limited business activity');
    }

    // Monthly Revenue Analysis
    if (userData.monthlyRevenue === 'Over $10,000') {
      score += 70;
      factors.push({ name: 'Revenue Strength', score: 92, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Strong monthly revenue demonstrates business viability');
    } else if (userData.monthlyRevenue === '$5,000 - $10,000') {
      score += 50;
      factors.push({ name: 'Revenue Strength', score: 80, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Solid revenue base supports loan repayment capacity');
    } else if (userData.monthlyRevenue === '$1,000 - $5,000') {
      score += 25;
      factors.push({ name: 'Revenue Strength', score: 65, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Moderate revenue requires careful loan sizing');
    } else {
      score += 5;
      factors.push({ name: 'Revenue Strength', score: 40, status: 'poor', impact: 'negative' });
      riskFactors.push('Low revenue may limit repayment ability');
    }

    // Record Keeping Analysis
    if (userData.recordKeeping === 'Digital software/apps') {
      score += 50;
      factors.push({ name: 'Financial Management', score: 90, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Digital record keeping shows strong financial discipline');
    } else if (userData.recordKeeping === 'Spreadsheets') {
      score += 30;
      factors.push({ name: 'Financial Management', score: 75, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Spreadsheet tracking demonstrates financial awareness');
    } else if (userData.recordKeeping === 'Paper records') {
      score += 15;
      factors.push({ name: 'Financial Management', score: 60, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Paper records show basic financial tracking');
    } else {
      score -= 20;
      factors.push({ name: 'Financial Management', score: 35, status: 'poor', impact: 'negative' });
      riskFactors.push('Lack of record keeping indicates poor financial management');
    }

    // Mobile Money Usage
    if (userData.mobileMoney === 'Yes, regularly') {
      score += 40;
      factors.push({ name: 'Digital Finance Adoption', score: 85, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Regular mobile money usage shows digital financial literacy');
    } else if (userData.mobileMoney === 'Yes, occasionally') {
      score += 25;
      factors.push({ name: 'Digital Finance Adoption', score: 70, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Occasional mobile money usage indicates digital awareness');
    } else if (userData.mobileMoney === 'No, but interested') {
      score += 10;
      factors.push({ name: 'Digital Finance Adoption', score: 55, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Interest in mobile money shows willingness to adopt digital finance');
    } else {
      score += 5;
      factors.push({ name: 'Digital Finance Adoption', score: 40, status: 'poor', impact: 'negative' });
      riskFactors.push('Limited digital finance adoption may restrict verification options');
    }

    // Social Media Promotion
    if (userData.socialMediaPromotion === 'Yes, actively') {
      score += 35;
      factors.push({ name: 'Business Visibility', score: 88, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Active social media presence indicates business growth mindset');
    } else if (userData.socialMediaPromotion === 'Yes, occasionally') {
      score += 20;
      factors.push({ name: 'Business Visibility', score: 70, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Some social media activity shows marketing awareness');
    } else if (userData.socialMediaPromotion === 'No, but planning to') {
      score += 10;
      factors.push({ name: 'Business Visibility', score: 55, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Plans for social media show growth orientation');
    } else {
      score += 5;
      factors.push({ name: 'Business Visibility', score: 45, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Limited online presence may restrict business growth');
    }

    // Communication Methods
    if (userData.communicationMethod === 'Email') {
      score += 30;
      factors.push({ name: 'Customer Communication', score: 85, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Email communication shows professional business operations');
    } else if (userData.communicationMethod === 'Text messages/WhatsApp') {
      score += 25;
      factors.push({ name: 'Customer Communication', score: 80, status: 'good', impact: 'positive' });
      eligibilityReasons.push('WhatsApp/SMS usage indicates modern customer service');
    } else if (userData.communicationMethod === 'Phone calls') {
      score += 15;
      factors.push({ name: 'Customer Communication', score: 65, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Phone communication provides direct customer interaction');
    } else {
      score -= 10;
      factors.push({ name: 'Customer Communication', score: 40, status: 'poor', impact: 'negative' });
      riskFactors.push('Limited customer communication may affect business relationships');
    }

    // Staff Count Analysis
    if (userData.staffCount === 'More than 10 people') {
      score += 45;
      factors.push({ name: 'Business Scale', score: 90, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Large team indicates established business operations');
    } else if (userData.staffCount === '6-10 people') {
      score += 35;
      factors.push({ name: 'Business Scale', score: 80, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Growing team shows business expansion');
    } else if (userData.staffCount === '2-5 people') {
      score += 20;
      factors.push({ name: 'Business Scale', score: 70, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Small team indicates business growth potential');
    } else {
      score += 10;
      factors.push({ name: 'Business Scale', score: 55, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Solo operation is common for small businesses');
    }

    // Business Duration
    if (userData.businessDuration === 'More than 3 years') {
      score += 60;
      factors.push({ name: 'Business Maturity', score: 95, status: 'excellent', impact: 'positive' });
      eligibilityReasons.push('Established business history demonstrates stability');
    } else if (userData.businessDuration === '1-3 years') {
      score += 40;
      factors.push({ name: 'Business Maturity', score: 80, status: 'good', impact: 'positive' });
      eligibilityReasons.push('Good business track record shows sustainability');
    } else if (userData.businessDuration === '6 months - 1 year') {
      score += 20;
      factors.push({ name: 'Business Maturity', score: 65, status: 'fair', impact: 'neutral' });
      eligibilityReasons.push('Developing business with some operational history');
    } else {
      score += 5;
      factors.push({ name: 'Business Maturity', score: 45, status: 'poor', impact: 'negative' });
      riskFactors.push('New business with limited operational history increases risk');
    }

    // Determine eligibility and loan amount
    const eligible = score >= 650;
    let maxLoanAmount = 0;
    let loanTier = '';

    if (score >= 800) {
      maxLoanAmount = Math.floor(Math.random() * 2000) + 4000; // $4000-$6000
      loanTier = 'Premium';
    } else if (score >= 750) {
      maxLoanAmount = Math.floor(Math.random() * 1500) + 2500; // $2500-$4000
      loanTier = 'Standard Plus';
    } else if (score >= 700) {
      maxLoanAmount = Math.floor(Math.random() * 1000) + 1500; // $1500-$2500
      loanTier = 'Standard';
    } else if (score >= 650) {
      maxLoanAmount = Math.floor(Math.random() * 500) + 500; // $500-$1000
      loanTier = 'Starter';
    }

    return {
      score: Math.min(score, 850), // Cap at 850
      eligible,
      maxLoanAmount,
      loanTier,
      factors,
      eligibilityReasons,
      riskFactors
    };
  };

  const handleGenerateScore = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userProfile');
    let calculatedResult;

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      calculatedResult = calculateEligibilityScore(userData);
    } else {
      // Fallback for demo purposes
      calculatedResult = {
        score: 720,
        eligible: true,
        maxLoanAmount: 2000,
        loanTier: 'Standard',
        factors: [
          { name: 'Business History', score: 85, status: 'good', impact: 'positive' },
          { name: 'Financial Patterns', score: 92, status: 'excellent', impact: 'positive' },
          { name: 'Payment Behavior', score: 78, status: 'good', impact: 'positive' },
          { name: 'Social Verification', score: 88, status: 'excellent', impact: 'positive' },
        ],
        eligibilityReasons: ['Demo mode - please complete signup for personalized assessment'],
        riskFactors: []
      };
    }
    
    setResult(calculatedResult);
    setIsLoading(false);
    
    // Store result for dashboard
    localStorage.setItem('eligibilityResult', JSON.stringify(calculatedResult));
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 750) return 'from-green-600 to-emerald-600';
    if (score >= 700) return 'from-blue-600 to-indigo-600';
    if (score >= 650) return 'from-yellow-600 to-orange-600';
    return 'from-red-600 to-pink-600';
  };

  const getFactorColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Loan Eligibility Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Our advanced AI analyzes your business data to determine loan eligibility.
          </p>
        </div>

        {!result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Your AI Assessment?
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI will analyze your business profile, transaction patterns, and digital footprint 
              to provide you with a personalized loan eligibility score and detailed explanation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What We Analyze</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Business transaction volume</li>
                  <li>• Revenue patterns & stability</li>
                  <li>• Financial management practices</li>
                  <li>• Digital adoption indicators</li>
                  <li>• Business maturity & scale</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Your Benefits</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personalized assessment</li>
                  <li>• Detailed eligibility explanation</li>
                  <li>• No impact on credit score</li>
                  <li>• Transparent scoring process</li>
                  <li>• Improvement recommendations</li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={handleGenerateScore}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing Your Business...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate My Score</span>
                </>
              )}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              AI Processing Your Business Data...
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Analyzing transaction patterns and business metrics...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Main Result Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className={`w-16 h-16 ${result.eligible ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {result.eligible ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {result.eligible ? 'Congratulations! You\'re Pre-Approved' : 'Application Needs Improvement'}
              </h2>
              <p className="text-gray-600 mb-6">
                {result.eligible 
                  ? `Based on our AI analysis, you qualify for a ${result.loanTier} microloan.`
                  : 'Your current business profile doesn\'t meet our minimum requirements, but we can help you improve.'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className={`p-6 bg-gradient-to-br ${getScoreGradient(result.score)} bg-opacity-10 rounded-xl`}>
                  <h3 className={`text-3xl font-bold mb-2 ${getScoreColor(result.score)}`}>{result.score}</h3>
                  <p className="text-gray-600">AI Credit Score</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {result.score >= 750 ? 'Excellent' : 
                     result.score >= 700 ? 'Good' : 
                     result.score >= 650 ? 'Fair' : 'Needs Improvement'}
                  </p>
                </div>
                {result.eligible && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">${result.maxLoanAmount.toLocaleString()}</h3>
                    <p className="text-gray-600">Max Loan Amount</p>
                    <p className="text-sm text-gray-500 mt-1">{result.loanTier} Tier</p>
                  </div>
                )}
              </div>
            </div>

            {/* Assessment Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Assessment Breakdown</h3>
              <div className="space-y-4">
                {result.factors.map((factor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getFactorColor(factor.status)}`}></div>
                      <span className="font-medium text-gray-900">{factor.name}</span>
                      {getImpactIcon(factor.impact)}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{factor.score}/100</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getFactorColor(factor.status)}`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {result.eligible ? 'Why You Qualified' : 'Areas for Improvement'}
              </h3>
              
              {result.eligibilityReasons.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Positive Factors
                  </h4>
                  <ul className="space-y-2">
                    {result.eligibilityReasons.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.riskFactors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Factors
                  </h4>
                  <ul className="space-y-2">
                    {result.riskFactors.map((risk: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!result.eligible && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommendations to Improve Your Score:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Increase your business transaction volume</li>
                    <li>• Implement digital record keeping systems</li>
                    <li>• Start using mobile money for business transactions</li>
                    <li>• Establish a social media presence for your business</li>
                    <li>• Use WhatsApp Business for customer communication</li>
                    <li>• Continue operating your business to build history</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={handleViewDashboard}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
              >
                <span>View Your Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityTest;