// Analytics and Event Tracking for Planety Landing Page
// Implements comprehensive conversion funnel monitoring

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

export interface ConversionFunnelStep {
  step: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private funnelSteps: ConversionFunnelStep[] = [];
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking() {
    // Track page load
    this.track('page_load', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    // Track scroll depth
    this.initializeScrollTracking();
    
    // Track time on page
    this.initializeTimeTracking();
  }

  private initializeScrollTracking() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }

      scrollThresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          this.track('scroll_depth', { 
            percentage: threshold,
            section: this.getCurrentSection()
          });
        }
      });
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  private initializeTimeTracking() {
    const startTime = Date.now();
    
    // Track time milestones
    const timeThresholds = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    const trackedTimes = new Set<number>();

    const trackTime = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      timeThresholds.forEach(threshold => {
        if (timeSpent >= threshold && !trackedTimes.has(threshold)) {
          trackedTimes.add(threshold);
          this.track('time_on_page', { 
            seconds: threshold,
            engagement_level: this.getEngagementLevel(threshold)
          });
        }
      });
    };

    setInterval(trackTime, 5000); // Check every 5 seconds

    // Track when user leaves page
    window.addEventListener('beforeunload', () => {
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      this.track('page_exit', { 
        total_time_seconds: totalTime,
        max_scroll_percent: this.getMaxScrollPercent()
      });
    });
  }

  private getCurrentSection(): string {
    const sections = [
      { id: 'hero', name: 'Hero' },
      { id: 'problem-statement', name: 'Problem Statement' },
      { id: 'how-it-works', name: 'How It Works' },
      { id: 'features-section', name: 'Features' },
      { id: 'testimonials', name: 'Testimonials' },
      { id: 'trust-privacy', name: 'Trust & Privacy' },
      { id: 'faq', name: 'FAQ' },
      { id: 'cta-section', name: 'CTA' }
    ];

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          return section.name;
        }
      }
    }
    
    return 'Unknown';
  }

  private getEngagementLevel(seconds: number): string {
    if (seconds >= 300) return 'very_high';
    if (seconds >= 120) return 'high';
    if (seconds >= 60) return 'medium';
    if (seconds >= 30) return 'low';
    return 'very_low';
  }

  private getMaxScrollPercent(): number {
    return Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
  }

  // Public methods for tracking specific events
  public track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: new Date().toISOString(),
        url: window.location.href
      },
      timestamp: new Date()
    };

    this.events.push(analyticsEvent);
    
    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    this.sendToAnalyticsService(analyticsEvent);
    
    console.log('Analytics Event:', analyticsEvent);
  }

  public trackConversionStep(step: string, metadata?: Record<string, any>) {
    const funnelStep: ConversionFunnelStep = {
      step,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        sessionId: this.sessionId,
        userId: this.userId
      }
    };

    this.funnelSteps.push(funnelStep);
    
    this.track('conversion_funnel_step', {
      funnel_step: step,
      step_number: this.funnelSteps.length,
      ...metadata
    });
  }

  public setUserId(userId: string) {
    this.userId = userId;
    this.track('user_identified', { userId });
  }

  // Conversion funnel tracking methods
  public trackHeroEngagement() {
    this.trackConversionStep('hero_engagement');
  }

  public trackProblemRecognition() {
    this.trackConversionStep('problem_recognition');
  }

  public trackSolutionInterest() {
    this.trackConversionStep('solution_interest');
  }

  public trackFeatureExploration(feature: string) {
    this.trackConversionStep('feature_exploration', { feature });
  }

  public trackTrustBuilding() {
    this.trackConversionStep('trust_building');
  }

  public trackCTAClick(ctaType: string, location: string) {
    this.trackConversionStep('cta_click', { ctaType, location });
  }

  public trackFormStart() {
    this.trackConversionStep('form_start');
  }

  public trackFormSubmit(formType: string) {
    this.trackConversionStep('form_submit', { formType });
  }

  public trackEmailValidation() {
    this.trackConversionStep('email_validation');
  }

  // Button and interaction tracking
  public trackButtonClick(buttonText: string, location: string, destination?: string) {
    this.track('button_click', {
      button_text: buttonText,
      location,
      destination,
      section: this.getCurrentSection()
    });
  }

  public trackLinkClick(linkText: string, url: string, location: string) {
    this.track('link_click', {
      link_text: linkText,
      url,
      location,
      section: this.getCurrentSection()
    });
  }

  public trackVideoPlay(videoTitle: string) {
    this.track('video_play', { video_title: videoTitle });
  }

  public trackFeatureInteraction(featureType: string, action: string) {
    this.track('feature_interaction', {
      feature_type: featureType,
      action,
      section: this.getCurrentSection()
    });
  }

  public trackTestimonialInteraction(testimonialIndex: number, action: string) {
    this.track('testimonial_interaction', {
      testimonial_index: testimonialIndex,
      action
    });
  }

  public trackFAQInteraction(questionIndex: number, action: 'open' | 'close') {
    this.track('faq_interaction', {
      question_index: questionIndex,
      action
    });
  }

  // Performance tracking
  public trackPerformanceMetrics() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.track('performance_metrics', {
        page_load_time: navigation.loadEventEnd - navigation.fetchStart,
        dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        first_paint: this.getFirstPaint(),
        largest_contentful_paint: this.getLargestContentfulPaint()
      });
    }
  }

  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  private getLargestContentfulPaint(): number | null {
    if ('PerformanceObserver' in window) {
      let lcp = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcp = lastEntry.startTime;
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        return lcp;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  private sendToAnalyticsService(event: AnalyticsEvent) {
    // Integration with Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event.event, event.properties);
    }

    // Integration with Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Custom', {
        event_name: event.event,
        ...event.properties
      });
    }

    // Integration with Mixpanel
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track(event.event, event.properties);
    }

    // Send to custom analytics endpoint
    this.sendToCustomEndpoint(event);
  }

  private async sendToCustomEndpoint(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }

  // A/B Testing support
  public getABTestVariant(testName: string): string {
    const storedVariant = localStorage.getItem(`ab_test_${testName}`);
    if (storedVariant) {
      return storedVariant;
    }

    // Simple A/B test assignment
    const variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(`ab_test_${testName}`, variant);
    
    this.track('ab_test_assignment', {
      test_name: testName,
      variant
    });

    return variant;
  }

  // Export data for analysis
  public exportData() {
    return {
      events: this.events,
      funnelSteps: this.funnelSteps,
      sessionId: this.sessionId,
      userId: this.userId
    };
  }
}

// Create global analytics instance
export const analytics = new Analytics();

// Auto-track performance metrics when page loads
window.addEventListener('load', () => {
  analytics.trackPerformanceMetrics();
});

// Export for use in components
export default analytics;
