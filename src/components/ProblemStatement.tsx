import { MessageCircle, Heart, TrendingDown, Users } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section className="py-8 sm:py-12 bg-planety-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-planety-navy">
            Why Friendships Fade 
            <span className="block text-planety-indigo">(And How to Fix It)</span>
          </h2>
          <p className="text-base text-planety-gray-600 mb-6">
            Social media doesn't help you maintain real friendships. You need a better system.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Problems */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-planety-red/10 flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-planety-red" />
              </div>
              <div>
                <h3 className="text-lg font-display font-medium mb-1 text-planety-navy">
                  You forget to reach out to friends
                </h3>
                <p className="text-sm text-planety-gray-600">
                  Life gets busy and you lose touch with people you care about. You remember too late.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-planety-orange/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-planety-orange" />
              </div>
              <div>
                <h3 className="text-lg font-display font-medium mb-1 text-planety-navy">
                  Staying connected feels overwhelming
                </h3>
                <p className="text-sm text-planety-gray-600">
                  Between work, family, and daily life, you need a system to help you remember who to contact and when.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-planety-indigo/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-planety-indigo" />
              </div>
              <div>
                <h3 className="text-lg font-display font-medium mb-1 text-planety-navy">
                  Social media doesn't help maintain friendships
                </h3>
                <p className="text-sm text-planety-gray-600">
                  Liking posts isn't the same as having real conversations. You need actual connection, not endless scrolling.
                </p>
              </div>
            </div>
          </div>
          
          {/* Visual comparison */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              {/* Social Media Side */}
              <div className="bg-white p-6 rounded-2xl border border-planety-gray-200 relative">
                <div className="absolute -top-3 left-4 bg-planety-red text-white px-3 py-1 rounded-full text-sm font-medium">
                  Social Media
                </div>
                <div className="space-y-4 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-planety-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-planety-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-planety-gray-200 rounded w-1/2"></div>
                    </div>
                    <Heart className="w-5 h-5 text-planety-gray-400" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-planety-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-planety-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-planety-gray-200 rounded w-3/4"></div>
                    </div>
                    <MessageCircle className="w-5 h-5 text-planety-gray-400" />
                  </div>
                  <div className="text-center text-planety-gray-400 text-sm">
                    Endless scrolling, shallow interactions
                  </div>
                </div>
              </div>
              
              {/* Planety Side */}
              <div className="bg-gradient-to-br from-planety-indigo/10 to-planety-amber/10 p-6 rounded-2xl border border-planety-indigo/20 relative">
                <div className="absolute -top-3 left-4 bg-planety-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  Planety
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-planety-indigo flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-planety-navy">Coffee with Sarah tomorrow?</div>
                      <div className="text-xs text-planety-gray-600">Gentle reminder • Close Friend</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-planety-amber flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-planety-green flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-planety-navy">Share a memory with Alex</div>
                      <div className="text-xs text-planety-gray-600">Mission • Activity Buddy</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-planety-indigo/20">
                      <span className="text-xs"></span>
                    </div>
                  </div>
                  <div className="text-center text-planety-indigo text-sm font-medium">
                    Intentional connections, meaningful moments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transition */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-planety-indigo text-white rounded-full font-medium">
            <span>Here's how Planety helps:</span>
            <div className="ml-2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
