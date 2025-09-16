import { useEffect, useCallback } from 'react';
import { analytics } from '@/lib/analytics';

// Custom hook for analytics tracking in React components
export const useAnalytics = () => {
  // Track component mount
  useEffect(() => {
    analytics.track('component_mount', {
      component: 'useAnalytics_hook'
    });
  }, []);

  // Memoized tracking functions
  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    analytics.track(event, properties);
  }, []);

  const trackButtonClick = useCallback((buttonText: string, location: string, destination?: string) => {
    analytics.trackButtonClick(buttonText, location, destination);
  }, []);

  const trackLinkClick = useCallback((linkText: string, url: string, location: string) => {
    analytics.trackLinkClick(linkText, url, location);
  }, []);

  const trackConversionStep = useCallback((step: string, metadata?: Record<string, any>) => {
    analytics.trackConversionStep(step, metadata);
  }, []);

  const trackFeatureInteraction = useCallback((featureType: string, action: string) => {
    analytics.trackFeatureInteraction(featureType, action);
  }, []);

  return {
    trackEvent,
    trackButtonClick,
    trackLinkClick,
    trackConversionStep,
    trackFeatureInteraction,
    trackHeroEngagement: analytics.trackHeroEngagement.bind(analytics),
    trackProblemRecognition: analytics.trackProblemRecognition.bind(analytics),
    trackSolutionInterest: analytics.trackSolutionInterest.bind(analytics),
    trackTrustBuilding: analytics.trackTrustBuilding.bind(analytics),
    trackCTAClick: analytics.trackCTAClick.bind(analytics),
    trackFormStart: analytics.trackFormStart.bind(analytics),
    trackFormSubmit: analytics.trackFormSubmit.bind(analytics),
    trackEmailValidation: analytics.trackEmailValidation.bind(analytics)
  };
};

// Hook for intersection observer tracking (scroll into view)
export const useIntersectionTracking = (elementRef: React.RefObject<HTMLElement>, eventName: string, metadata?: Record<string, any>) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          analytics.track(eventName, {
            ...metadata,
            element_id: element.id,
            element_class: element.className
          });
          observer.unobserve(element); // Track only once
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, eventName, metadata]);
};

// Hook for form tracking
export const useFormTracking = (formName: string) => {
  const trackFormStart = useCallback(() => {
    analytics.trackFormStart();
    analytics.track('form_start', { form_name: formName });
  }, [formName]);

  const trackFormSubmit = useCallback((success: boolean, errorMessage?: string) => {
    analytics.trackFormSubmit(formName);
    analytics.track('form_submit', { 
      form_name: formName,
      success,
      error_message: errorMessage
    });
  }, [formName]);

  const trackFormFieldInteraction = useCallback((fieldName: string, action: 'focus' | 'blur' | 'change') => {
    analytics.track('form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
      action
    });
  }, [formName]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormFieldInteraction
  };
};

// Hook for A/B testing
export const useABTest = (testName: string) => {
  const variant = analytics.getABTestVariant(testName);
  
  useEffect(() => {
    analytics.track('ab_test_view', {
      test_name: testName,
      variant
    });
  }, [testName, variant]);

  return variant;
};
