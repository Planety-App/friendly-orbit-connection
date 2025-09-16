import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

// Performance monitoring component that tracks Core Web Vitals
const PerformanceMonitor = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            analytics.track('core_web_vital_lcp', {
              value: lastEntry.startTime,
              rating: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'needs_improvement' : 'poor'
            });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP tracking not supported');
        }

        // First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              analytics.track('core_web_vital_fid', {
                value: entry.processingStart - entry.startTime,
                rating: entry.processingStart - entry.startTime <= 100 ? 'good' : 
                       entry.processingStart - entry.startTime <= 300 ? 'needs_improvement' : 'poor'
              });
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID tracking not supported');
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            
            analytics.track('core_web_vital_cls', {
              value: clsValue,
              rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs_improvement' : 'poor'
            });
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS tracking not supported');
        }
      }
    };

    // Track network information
    const trackNetworkInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        analytics.track('network_info', {
          effective_type: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          save_data: connection.saveData
        });
      }
    };

    // Track device information
    const trackDeviceInfo = () => {
      analytics.track('device_info', {
        user_agent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookie_enabled: navigator.cookieEnabled,
        online: navigator.onLine,
        screen_width: screen.width,
        screen_height: screen.height,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        device_pixel_ratio: window.devicePixelRatio,
        color_depth: screen.colorDepth
      });
    };

    // Track page visibility changes
    const trackVisibilityChange = () => {
      let visibilityStartTime = Date.now();
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const visibleTime = Date.now() - visibilityStartTime;
          analytics.track('page_visibility_hidden', {
            visible_time_ms: visibleTime
          });
        } else {
          visibilityStartTime = Date.now();
          analytics.track('page_visibility_visible');
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    // Track errors
    const trackErrors = () => {
      const handleError = (event: ErrorEvent) => {
        analytics.track('javascript_error', {
          message: event.message,
          filename: event.filename,
          line_number: event.lineno,
          column_number: event.colno,
          stack: event.error?.stack
        });
      };

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        analytics.track('unhandled_promise_rejection', {
          reason: event.reason?.toString(),
          stack: event.reason?.stack
        });
      };

      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    };

    // Track resource loading performance
    const trackResourcePerformance = () => {
      if ('PerformanceObserver' in window) {
        try {
          const resourceObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              // Only track slow resources (>1s load time)
              if (entry.duration > 1000) {
                analytics.track('slow_resource_load', {
                  name: entry.name,
                  duration: entry.duration,
                  size: (entry as any).transferSize,
                  type: (entry as any).initiatorType
                });
              }
            });
          });
          resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
          console.warn('Resource performance tracking not supported');
        }
      }
    };

    // Initialize all tracking
    const cleanupFunctions: (() => void)[] = [];
    
    // Run immediately
    trackWebVitals();
    trackNetworkInfo();
    trackDeviceInfo();
    trackResourcePerformance();
    
    // Set up continuous tracking
    cleanupFunctions.push(trackVisibilityChange());
    cleanupFunctions.push(trackErrors());

    // Track battery status if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        analytics.track('battery_status', {
          charging: battery.charging,
          level: battery.level,
          charging_time: battery.chargingTime,
          discharging_time: battery.dischargingTime
        });
      });
    }

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;
