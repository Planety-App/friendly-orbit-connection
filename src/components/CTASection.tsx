import { Star, Rocket, Share2, Copy } from 'lucide-react';
import { useRef } from 'react';
import { useAnalytics, useIntersectionTracking, useFormTracking } from '@/hooks/useAnalytics';

const CTASection = () => {
  const ctaRef = useRef<HTMLElement>(null);
  const { trackCTAClick, trackEvent } = useAnalytics();
  const { trackFormStart } = useFormTracking('waitlist_signup');
  
  // Track when CTA section comes into view
  useIntersectionTracking(ctaRef, 'cta_section_viewed', {
    section: 'cta',
    form_type: 'waitlist_signup'
  });
  return (
    <section ref={ctaRef} id="cta-section" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-planety-indigo/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/6 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-planety-navy/10 blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto glass-card p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-planety-indigo/20 to-planety-navy/20 relative overflow-hidden shadow-glow-sm hover:shadow-glow-md transition-all duration-500">
          {/* Decorative floating stars */}
          <div className="absolute top-6 sm:top-8 left-6 sm:left-8 text-planety-indigo/30 animate-float" style={{animationDelay: '0.5s'}}>
            <Star className="w-4 sm:w-6 h-4 sm:h-6" />
          </div>
          <div className="absolute bottom-6 sm:bottom-8 right-8 sm:right-12 text-planety-navy/30 animate-float" style={{animationDelay: '1.2s'}}>
            <Star className="w-6 sm:w-8 h-6 sm:h-8" />
          </div>
          <div className="absolute top-1/2 right-6 sm:right-8 text-planety-amber/30 animate-float" style={{animationDelay: '0.8s'}}>
            <Star className="w-4 sm:w-5 h-4 sm:h-5" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to Transform Your <span className="text-planety-indigo">Friendships</span>?
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto">
              Join our waitlist to be among the first to experience Planety when we launch. We'll send you updates and early access opportunities.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                className="button-secondary flex items-center"
                onClick={async () => {
                  const url = window.location.origin;
                  try {
                    await navigator.clipboard.writeText(`${url}?ref=friend`);
                    trackEvent('referral_link_copied');
                  } catch {}
                }}
                aria-label="Copy referral link"
              >
                <Copy className="w-4 h-4 mr-2" /> Copy referral link
              </button>
              <button
                className="button-secondary flex items-center"
                onClick={() => {
                  const text = encodeURIComponent('Join me on Planety — a better way to keep up with friends!');
                  const shareUrl = encodeURIComponent(window.location.origin);
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
                  trackEvent('share_clicked', { network: 'twitter' });
                }}
                aria-label="Share on X"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScTYSPGHT0jR7_wQ0VCFRNo3_tig9spiIAPeFFQ9kpQdBGPwQ/viewform?embedded=true" 
              width="640" 
              height="720" 
              className="border-0 w-full max-w-2xl mx-auto bg-transparent"
              title="Join Waitlist Form"
              onLoad={() => {
                trackCTAClick('waitlist_form', 'cta_section');
                trackFormStart();
              }}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
      
      {/* Visual connector */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/50 to-transparent"></div>
    </section>
  );
};

export default CTASection;
