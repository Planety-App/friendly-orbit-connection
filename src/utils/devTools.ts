// Development Tools for Quality Assurance
// Run comprehensive tests and validations

import { ContentReviewer, runContentReview } from './contentReview';
import { AccessibilityTester, runAccessibilityTests } from './accessibilityTest';
import { analytics } from '@/lib/analytics';

// Global development tools interface
declare global {
  interface Window {
    devTools: {
      runContentReview: () => Promise<void>;
      runAccessibilityTests: () => Promise<void>;
      runAllTests: () => Promise<void>;
      exportAnalytics: () => any;
      testPerformance: () => void;
      validateForms: () => void;
      checkLinks: () => Promise<void>;
    };
  }
}

// Performance testing utilities
export const testPerformance = () => {
  console.log('\n🚀 PERFORMANCE TEST STARTING...\n');
  
  // Test Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log(`📊 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
      });
    });
    
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });
    } catch (e) {
      console.warn('Some performance metrics not available');
    }
  }

  // Test network performance
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    console.log(`🌐 Network: ${connection.effectiveType} (${connection.downlink} Mbps)`);
    
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      console.warn('⚠️  Slow network detected - test mobile performance');
    }
  }

  // Test resource loading
  const resources = performance.getEntriesByType('resource');
  const slowResources = resources.filter(r => r.duration > 1000);
  
  if (slowResources.length > 0) {
    console.warn(`⚠️  ${slowResources.length} slow resources detected:`);
    slowResources.forEach(r => {
      console.log(`   ${r.name}: ${r.duration.toFixed(2)}ms`);
    });
  } else {
    console.log('✅ All resources loading efficiently');
  }

  // Test memory usage
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log(`💾 Memory: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB used`);
  }
};

// Form validation testing
export const validateForms = () => {
  console.log('\n📝 FORM VALIDATION TEST\n');
  
  const forms = document.querySelectorAll('form, iframe[src*="forms.google"]');
  
  if (forms.length === 0) {
    console.warn('⚠️  No forms found on page');
    return;
  }

  forms.forEach((form, index) => {
    if (form.tagName === 'IFRAME') {
      console.log(`✅ Form ${index + 1}: Google Form embed detected`);
      
      // Test iframe accessibility
      const title = form.getAttribute('title');
      if (!title) {
        console.warn('⚠️  Google Form iframe missing title attribute');
      }
    } else {
      const htmlForm = form as HTMLFormElement;
      console.log(`📋 Form ${index + 1}: ${htmlForm.action || 'No action'}`);
      
      // Test form inputs
      const inputs = htmlForm.querySelectorAll('input, select, textarea');
      inputs.forEach((input, inputIndex) => {
        const htmlInput = input as HTMLInputElement;
        const hasLabel = document.querySelector(`label[for="${htmlInput.id}"]`) ||
                        htmlInput.getAttribute('aria-label') ||
                        htmlInput.closest('label');
        
        if (!hasLabel && htmlInput.type !== 'hidden') {
          console.warn(`⚠️  Input ${inputIndex + 1} missing label`);
        }
        
        if (htmlInput.required && !htmlInput.getAttribute('aria-required')) {
          console.warn(`⚠️  Required input ${inputIndex + 1} missing aria-required`);
        }
      });
    }
  });
};

// Link checking utility
export const checkLinks = async () => {
  console.log('\n🔗 LINK VALIDATION TEST\n');
  
  const links = document.querySelectorAll('a[href]');
  const results = {
    total: links.length,
    internal: 0,
    external: 0,
    placeholders: 0,
    broken: 0
  };

  for (const link of links) {
    const href = link.getAttribute('href');
    const text = link.textContent?.trim();
    
    if (!href) continue;

    if (href.startsWith('#') || href === 'javascript:void(0)') {
      results.placeholders++;
      console.warn(`⚠️  Placeholder link: "${text}" -> ${href}`);
    } else if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      results.external++;
      console.log(`🌐 External: "${text}" -> ${href}`);
      
      // Check if external link has security attributes
      const rel = link.getAttribute('rel');
      if (!rel?.includes('noopener')) {
        console.warn(`⚠️  External link missing rel="noopener": ${href}`);
      }
    } else {
      results.internal++;
      console.log(`🏠 Internal: "${text}" -> ${href}`);
    }
  }

  console.log(`\n📊 Link Summary:`);
  console.log(`   Total: ${results.total}`);
  console.log(`   Internal: ${results.internal}`);
  console.log(`   External: ${results.external}`);
  console.log(`   Placeholders: ${results.placeholders}`);
  
  if (results.placeholders > 0) {
    console.warn(`⚠️  ${results.placeholders} placeholder links need real destinations`);
  } else {
    console.log('✅ No placeholder links found');
  }
};

// Comprehensive test runner
export const runAllTests = async () => {
  console.log('\n🧪 RUNNING ALL QUALITY ASSURANCE TESTS\n');
  console.log('='.repeat(50));
  
  const startTime = Date.now();
  
  try {
    // 1. Content Review
    await runContentReview();
    
    // 2. Accessibility Tests
    await runAccessibilityTests();
    
    // 3. Performance Tests
    testPerformance();
    
    // 4. Form Validation
    validateForms();
    
    // 5. Link Checking
    await checkLinks();
    
    const endTime = Date.now();
    console.log('\n' + '='.repeat(50));
    console.log(`✅ All tests completed in ${endTime - startTime}ms`);
    
    // Track test completion
    analytics.track('qa_tests_completed', {
      duration_ms: endTime - startTime,
      test_types: ['content', 'accessibility', 'performance', 'forms', 'links']
    });
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    analytics.track('qa_tests_failed', { error: error.toString() });
  }
};

// Export analytics data
export const exportAnalytics = () => {
  const data = analytics.exportData();
  console.log('📊 Analytics Data:', data);
  
  // Create downloadable file
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `planety-analytics-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  return data;
};

// Initialize development tools in browser console
export const initDevTools = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.devTools = {
      runContentReview,
      runAccessibilityTests,
      runAllTests,
      exportAnalytics,
      testPerformance,
      validateForms,
      checkLinks
    };
    
    console.log(`
🛠️  Planety Dev Tools Loaded!

Available commands:
  devTools.runAllTests()        - Run complete QA test suite
  devTools.runContentReview()  - Check copy and content issues
  devTools.runAccessibilityTests() - WCAG compliance testing
  devTools.testPerformance()   - Performance metrics
  devTools.validateForms()     - Form validation check
  devTools.checkLinks()        - Link validation
  devTools.exportAnalytics()   - Download analytics data

Usage: Open browser console and type any command above.
    `);
  }
};

// Auto-initialize in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDevTools);
  } else {
    initDevTools();
  }
}
