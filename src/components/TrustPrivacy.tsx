import { Shield, Lock, Eye, UserCheck, Database, Heart } from 'lucide-react';

const TrustPrivacy = () => {
  const privacyFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Data Stays Private",
      description: "We never sell, share, or monetize your personal relationship information.",
      color: "text-planety-green",
      bgColor: "bg-planety-green/10",
      borderColor: "border-planety-green/20"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "You Control Everything",
      description: "Decide what to track, what to share, and how your data is used.",
      color: "text-planety-indigo",
      bgColor: "bg-planety-indigo/10", 
      borderColor: "border-planety-indigo/20"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Secure & Encrypted",
      description: "Your friendship data is encrypted and stored securely.",
      color: "text-planety-amber",
      bgColor: "bg-planety-amber/10",
      borderColor: "border-planety-amber/20"
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "No Public Profiles",
      description: "No follower counts, no public posts, no social pressure - just private friendship management.",
      color: "text-planety-orange",
      bgColor: "bg-planety-orange/10",
      borderColor: "border-planety-orange/20"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-planety-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-planety-indigo/10 mb-6">
            <Shield className="w-8 h-8 text-planety-indigo" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-planety-navy">
            Your Data is <span className="text-planety-indigo">Private</span>
          </h2>
          <p className="text-base text-planety-gray-600 mb-6">
            Your friendship information stays private and secure. We never sell your data or share it with third parties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {privacyFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card p-6 transition-all duration-300 hover:scale-105 hover:shadow-glow-sm border ${feature.borderColor} ${feature.bgColor}`}
            >
              <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color} ${feature.borderColor} border`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-medium mb-3 text-planety-navy">{feature.title}</h3>
              <p className="text-planety-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-planety-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-medium mb-4 text-planety-navy">
              Built on Trust, Powered by Care
            </h3>
            <p className="text-planety-gray-600 max-w-2xl mx-auto">
              Unlike social media platforms, Planety exists to strengthen your relationships, not exploit them. 
              We're committed to creating a safe space for meaningful connections.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-planety-green/10 flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-planety-green" />
              </div>
              <h4 className="font-display font-medium mb-2 text-planety-navy">Your Data, Your Rules</h4>
              <p className="text-sm text-planety-gray-600">
                Export, delete, or modify your data anytime. Complete transparency and control.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-planety-indigo/10 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-planety-indigo" />
              </div>
              <h4 className="font-display font-medium mb-2 text-planety-navy">Human-Centered Design</h4>
              <p className="text-sm text-planety-gray-600">
                Built by people who value real relationships over digital metrics and engagement.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-planety-amber/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-planety-amber" />
              </div>
              <h4 className="font-display font-medium mb-2 text-planety-navy">Cosmic Protection</h4>
              <p className="text-sm text-planety-gray-600">
                Enterprise-grade security with the warmth and care your friendships deserve.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy commitment */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-planety-indigo text-white rounded-full">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-medium">Read our Privacy Promise</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustPrivacy;
