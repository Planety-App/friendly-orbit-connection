import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 border-b border-border">
        <div className="container px-4 mx-auto">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="flex items-center gap-2 text-planety-indigo hover:text-planety-navy transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Planety</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-planety-indigo flex items-center justify-center">
                <span className="text-white text-sm">P</span>
              </div>
              <h1 className="text-xl font-display font-semibold">Privacy Promise</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h1 className="text-3xl font-display font-bold text-planety-navy mb-6">
              Your Friendship Data is Sacred
            </h1>
            
            <p className="text-lg text-planety-gray-600 mb-8">
              At Planety, we believe your personal relationships are private. Here's our commitment to protecting your friendship data.
            </p>

            <div className="bg-planety-indigo/5 p-6 rounded-xl border border-planety-indigo/20 mb-8">
              <h2 className="text-xl font-display font-semibold text-planety-navy mb-3">
                Our Core Privacy Principles
              </h2>
              <ul className="space-y-2 text-planety-gray-600">
                <li>• Your friendship data belongs to you, not us</li>
                <li>• We never sell or share your personal information</li>
                <li>• All data is encrypted and stored securely</li>
                <li>• You can export or delete your data anytime</li>
              </ul>
            </div>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              What We Collect
            </h2>
            <p className="text-planety-gray-600 mb-6">
              We only collect information necessary to help you maintain your friendships:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-planety-gray-600 mb-8">
              <li>Contact information you choose to add</li>
              <li>Notes and memories you create</li>
              <li>Interaction preferences and reminder settings</li>
              <li>Basic usage analytics to improve the app</li>
            </ul>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              How We Protect Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-planety-gray-600 mb-8">
              <li>End-to-end encryption for sensitive information</li>
              <li>Secure servers with industry-standard protection</li>
              <li>Regular security audits and updates</li>
              <li>Limited access on a need-to-know basis</li>
            </ul>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              Your Rights
            </h2>
            <p className="text-planety-gray-600 mb-4">You have complete control over your data:</p>
            <ul className="list-disc pl-6 space-y-2 text-planety-gray-600 mb-8">
              <li>Access and download all your information</li>
              <li>Correct or update any data</li>
              <li>Delete your account and all associated data</li>
              <li>Opt out of any communications</li>
            </ul>

            <div className="bg-planety-amber/10 p-6 rounded-xl border border-planety-amber/20 mb-8">
              <h3 className="text-lg font-display font-semibold text-planety-navy mb-2">
                Questions About Privacy?
              </h3>
              <p className="text-planety-gray-600">
                Contact our privacy team at{' '}
                <a href="mailto:app.planety@gmail.com?subject=Privacy Question" className="text-planety-indigo hover:underline">
                  app.planety@gmail.com
                </a>
              </p>
            </div>

            <p className="text-sm text-planety-gray-600">
              Last updated: September 16, 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
