import { useState } from 'react';
import { Plus, Minus, MessageCircle, Shield, Users, Clock, Briefcase } from 'lucide-react';

const faqs = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    question: "How is this different from social media?",
    answer: "Unlike social media that focuses on broadcasting and consuming content, Planety is designed for intentional, private relationship management. There are no feeds, ads, or public profiles - just meaningful tools to help you stay connected with the people who matter most. It's about quality connections, not quantity metrics.",
    category: "Platform"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    question: "Is my friendship data private?",
    answer: "Absolutely. Your friendship data is completely private and belongs to you. We use end-to-end encryption, never sell your data, and you have complete control over what information you track and share. Planety is built privacy-first, unlike social platforms that monetize your personal information.",
    category: "Privacy"
  },
  {
    icon: <Users className="w-5 h-5" />,
    question: "What if my friends don't use Planety?",
    answer: "Planety works great even if your friends aren't on the platform! You can track your relationships, set reminders to reach out, and manage your side of the friendship. When you do connect with friends, you can choose to share memories and coordinate through the app, but it's designed to help you be a better friend regardless.",
    category: "Usage"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    question: "How much time does this require?",
    answer: "Planety is designed to save you time, not consume it. Most interactions take just a few seconds - checking a gentle reminder, logging a memory, or seeing your friendship constellation. The goal is to help you be more intentional with your existing interactions, not add more tasks to your day.",
    category: "Time"
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    question: "Can I use this for professional relationships?",
    answer: "While Planety is primarily designed for personal friendships, many users find it helpful for maintaining professional relationships too. You can create different friend 'planets' for work connections, track important conversations, and set reminders for professional check-ins. The cosmic metaphor works for any meaningful relationship you want to nurture.",
    category: "Professional"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-planety-navy">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-planety-gray-600">
            Everything you need to know about transforming your friendships with Planety.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-planety-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'shadow-lg border-planety-indigo/30' : 'hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-planety-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    openIndex === index ? 'bg-planety-indigo text-white' : 'bg-planety-indigo/10 text-planety-indigo'
                  }`}>
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-medium text-planety-navy">
                      {faq.question}
                    </h3>
                    <span className="text-sm text-planety-gray-600">{faq.category}</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  openIndex === index ? 'bg-planety-indigo text-white' : 'bg-planety-gray-200 text-planety-gray-600'
                }`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-4">
                  <div className="ml-14">
                    <p className="text-planety-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional help section */}
        <div className="mt-8 text-center">
          <div className="bg-planety-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-display font-medium mb-4 text-planety-navy">
              Still have questions?
            </h3>
            <p className="text-planety-gray-600 mb-6">
              We're here to help you navigate your friendship galaxy. Reach out to our cosmic support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button-primary">
                Contact Support
              </button>
              <button className="button-secondary">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
