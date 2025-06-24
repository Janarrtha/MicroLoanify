import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is MicroLoan AI?",
          answer: "MicroLoan AI is an AI-powered microlending platform that provides access to small business loans for the unbanked and underbanked. We use alternative data sources and machine learning to assess creditworthiness without requiring traditional credit history."
        },
        {
          question: "Who can apply for a microloan?",
          answer: "Anyone with a business or business idea can apply, regardless of their credit history. We specialize in serving entrepreneurs who may not qualify for traditional bank loans, including those in developing markets and underserved communities."
        },
        {
          question: "How much can I borrow?",
          answer: "Loan amounts range from $500 to $10,000, depending on your business profile and AI assessment results. New borrowers typically start with smaller amounts and can access larger loans as they build their credit history with us."
        },
        {
          question: "How long does the application process take?",
          answer: "The entire process can be completed in under 30 minutes. Our AI provides instant pre-approval decisions, and funds can be disbursed within 24-48 hours of final approval."
        }
      ]
    },
    {
      category: "AI Assessment",
      questions: [
        {
          question: "How does the AI assessment work?",
          answer: "Our AI analyzes over 100 data points including business transaction patterns, digital footprint, mobile money usage, social media presence, and operational metrics to create a comprehensive creditworthiness profile."
        },
        {
          question: "What data do you use for assessment?",
          answer: "We use alternative data sources such as business transaction volume, mobile money usage, social media activity, communication patterns, business duration, staff size, and financial management practices. We never access your personal banking information without permission."
        },
        {
          question: "Is the AI assessment accurate?",
          answer: "Our AI model has been trained on thousands of successful loan cases and continuously improves its accuracy. It has a 95% accuracy rate in predicting loan repayment success, significantly higher than traditional credit scoring methods."
        },
        {
          question: "Can I improve my AI credit score?",
          answer: "Yes! Your score improves as you demonstrate good business practices, make timely payments, increase transaction volume, and maintain consistent business operations. We provide personalized recommendations for improvement."
        }
      ]
    },
    {
      category: "Loans & Repayment",
      questions: [
        {
          question: "What are the interest rates?",
          answer: "Interest rates range from 4-12% annually, depending on your AI assessment results. Better business metrics and lower risk profiles receive lower rates. There are no hidden fees or origination charges."
        },
        {
          question: "What are the repayment terms?",
          answer: "Repayment terms range from 6 to 24 months, depending on your loan amount and preference. You can choose weekly, bi-weekly, or monthly payment schedules that align with your business cash flow."
        },
        {
          question: "What happens if I miss a payment?",
          answer: "We offer a 7-day grace period for late payments. If you're experiencing difficulties, contact us immediately - we work with borrowers to create modified payment plans and avoid default situations."
        },
        {
          question: "Can I pay off my loan early?",
          answer: "Yes! There are no prepayment penalties. Paying off your loan early can save you money on interest and improve your credit score for future loans."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "Is my data secure?",
          answer: "Yes, we use bank-level security including 256-bit SSL encryption, secure cloud infrastructure, and comply with international standards like GDPR, SOC 2, and ISO 27001. Your data is never shared without your consent."
        },
        {
          question: "How do you protect my privacy?",
          answer: "We follow privacy-by-design principles, collecting only necessary data and using it solely for loan assessment and servicing. You have full control over your data and can request deletion at any time."
        },
        {
          question: "Do you share my information with third parties?",
          answer: "We never sell your personal information. We only share data with authorized partners (like payment processors) as necessary to provide our services, and only with your explicit consent."
        }
      ]
    },
    {
      category: "Support & Account",
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our support team via email, phone, or live chat. Premium customers get priority support with dedicated account managers. Our support hours are 24/7 for urgent issues."
        },
        {
          question: "Can I have multiple loans?",
          answer: "Once you've successfully repaid your first loan, you may be eligible for additional loans with better terms and higher amounts. We encourage responsible borrowing aligned with your business needs."
        },
        {
          question: "How do I update my business information?",
          answer: "You can update your business information anytime through your dashboard. Regular updates help improve your AI score and may qualify you for better loan terms."
        },
        {
          question: "What if my business situation changes?",
          answer: "Contact us immediately if your business situation changes significantly. We can work with you to modify payment terms or provide guidance on managing your loan during difficult periods."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about MicroLoan AI, our AI assessment process, 
            and how to get the most out of our platform.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@microloanai.com"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Email Support
            </a>
            <a
              href="tel:+1-800-MICROLOAN"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;