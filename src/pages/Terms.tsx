import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
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
              <h1 className="text-xl font-display font-semibold">Terms of Service</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h1 className="text-3xl font-display font-bold text-planety-navy mb-6">
              Terms of Service
            </h1>
            
            <p className="text-lg text-planety-gray-600 mb-8">
              Welcome to Planety! These terms outline how you can use our friendship management platform.
            </p>

            <div className="bg-planety-green/5 p-6 rounded-xl border border-planety-green/20 mb-8">
              <h2 className="text-xl font-display font-semibold text-planety-navy mb-3">
                Simple Terms
              </h2>
              <p className="text-planety-gray-600">
                We believe in keeping things simple. Use Planety to strengthen your friendships, 
                respect others' privacy, and help us build a positive community.
              </p>
            </div>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              What Planety Provides
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-planety-gray-600 mb-8">
              <li>Tools to track and manage your personal friendships</li>
              <li>Reminders to help you stay connected</li>
              <li>A private space to record memories and notes</li>
              <li>Insights to help you strengthen relationships</li>
            </ul>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              Your Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-planety-gray-600 mb-8">
              <li>Use the service for personal, non-commercial purposes</li>
              <li>Respect your friends' privacy and consent</li>
              <li>Keep your account information secure</li>
              <li>Don't use Planety for spam or harassment</li>
            </ul>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              Privacy & Data
            </h2>
            <p className="text-planety-gray-600 mb-6">
              Your friendship data is private and belongs to you. We're committed to protecting 
              your information as outlined in our{' '}
              <Link to="/privacy" className="text-planety-indigo hover:underline">
                Privacy Promise
              </Link>.
            </p>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              Account Termination
            </h2>
            <p className="text-planety-gray-600 mb-8">
              You can delete your account anytime. We may suspend accounts that violate these 
              terms, but we'll always try to resolve issues through communication first.
            </p>

            <h2 className="text-2xl font-display font-semibold text-planety-navy mb-4">
              Changes to Terms
            </h2>
            <p className="text-planety-gray-600 mb-8">
              We may update these terms occasionally. We'll notify you of significant changes 
              and give you time to review them before they take effect.
            </p>

            <div className="bg-planety-indigo/5 p-6 rounded-xl border border-planety-indigo/20 mb-8">
              <h3 className="text-lg font-display font-semibold text-planety-navy mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-planety-gray-600">
                We're here to help! Contact us at{' '}
                <a href="mailto:app.planety@gmail.com?subject=Terms Question" className="text-planety-indigo hover:underline">
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

export default Terms;
