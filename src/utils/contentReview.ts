// Content Review and Quality Assurance Utilities
// Validates copy, links, CTAs, and legal compliance

export interface ContentIssue {
  type: 'spelling' | 'grammar' | 'link' | 'cta' | 'consistency' | 'accessibility' | 'legal';
  severity: 'error' | 'warning' | 'info';
  message: string;
  element?: string;
  location?: string;
}

export class ContentReviewer {
  private issues: ContentIssue[] = [];

  // Common spelling/grammar issues specific to friendship/tech content
  private readonly commonMisspellings = {
    'freindship': 'friendship',
    'freinds': 'friends',
    'seperate': 'separate',
    'occured': 'occurred',
    'recieve': 'receive',
    'definately': 'definitely',
    'accomodate': 'accommodate',
    'embarass': 'embarrass',
    'maintainance': 'maintenance',
    'occassion': 'occasion'
  };

  // Brand voice consistency checks
  private readonly brandTerms = {
    'planety': 'Planety', // Always capitalize
    'cosmic': 'cosmic', // lowercase unless start of sentence
    'galaxy': 'galaxy', // lowercase unless start of sentence
    'friendship': 'friendship' // lowercase unless start of sentence
  };

  // Required legal/privacy terms
  private readonly requiredLegalTerms = [
    'privacy',
    'data protection',
    'secure',
    'encrypted',
    'your data belongs to you'
  ];

  public async reviewContent(): Promise<ContentIssue[]> {
    this.issues = [];
    
    // Check all text content
    this.checkSpellingAndGrammar();
    this.checkBrandConsistency();
    this.checkLinks();
    this.checkCTAs();
    this.checkAccessibility();
    this.checkLegalCompliance();
    this.checkMetaData();
    
    return this.issues;
  }

  private checkSpellingAndGrammar() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a');
    
    textElements.forEach((element, index) => {
      const text = element.textContent?.toLowerCase() || '';
      
      // Check for common misspellings
      Object.entries(this.commonMisspellings).forEach(([wrong, correct]) => {
        if (text.includes(wrong)) {
          this.issues.push({
            type: 'spelling',
            severity: 'error',
            message: `Misspelling found: "${wrong}" should be "${correct}"`,
            element: element.tagName,
            location: `Element ${index}: ${element.textContent?.substring(0, 50)}...`
          });
        }
      });

      // Check for double spaces
      if (element.textContent?.includes('  ')) {
        this.issues.push({
          type: 'grammar',
          severity: 'warning',
          message: 'Double spaces found',
          element: element.tagName,
          location: `Element ${index}: ${element.textContent?.substring(0, 50)}...`
        });
      }

      // Check for missing periods in sentences
      if (element.tagName === 'P' && element.textContent) {
        const sentences = element.textContent.split('.').filter(s => s.trim().length > 0);
        if (sentences.length > 1 && !element.textContent.endsWith('.') && !element.textContent.endsWith('!') && !element.textContent.endsWith('?')) {
          this.issues.push({
            type: 'grammar',
            severity: 'warning',
            message: 'Paragraph may be missing ending punctuation',
            element: element.tagName,
            location: `Element ${index}: ${element.textContent?.substring(0, 50)}...`
          });
        }
      }
    });
  }

  private checkBrandConsistency() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a');
    
    textElements.forEach((element, index) => {
      const text = element.textContent || '';
      
      Object.entries(this.brandTerms).forEach(([term, correct]) => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        const matches = text.match(regex);
        
        if (matches) {
          matches.forEach(match => {
            // Check if it's at the beginning of a sentence (should be capitalized)
            const isStartOfSentence = text.indexOf(match) === 0 || 
                                    text.charAt(text.indexOf(match) - 2) === '.';
            
            const expectedCase = isStartOfSentence ? 
              correct.charAt(0).toUpperCase() + correct.slice(1) : correct;
            
            if (match !== expectedCase) {
              this.issues.push({
                type: 'consistency',
                severity: 'warning',
                message: `Brand term inconsistency: "${match}" should be "${expectedCase}"`,
                element: element.tagName,
                location: `Element ${index}: ${element.textContent?.substring(0, 50)}...`
              });
            }
          });
        }
      });
    });
  }

  private checkLinks() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      const text = link.textContent;
      
      if (!href) {
        this.issues.push({
          type: 'link',
          severity: 'error',
          message: 'Link missing href attribute',
          element: 'A',
          location: `Link ${index}: ${text?.substring(0, 30)}...`
        });
        return;
      }

      // Check for empty links
      if (!text?.trim()) {
        this.issues.push({
          type: 'link',
          severity: 'error',
          message: 'Link has no text content',
          element: 'A',
          location: `Link ${index}: href="${href}"`
        });
      }

      // Check for placeholder links
      if (href === '#' || href === '#!' || href === 'javascript:void(0)') {
        this.issues.push({
          type: 'link',
          severity: 'warning',
          message: 'Placeholder link found - needs real destination',
          element: 'A',
          location: `Link ${index}: ${text?.substring(0, 30)}...`
        });
      }

      // Check external links for security
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        const hasRelNoopener = link.getAttribute('rel')?.includes('noopener');
        if (!hasRelNoopener) {
          this.issues.push({
            type: 'link',
            severity: 'warning',
            message: 'External link missing rel="noopener" for security',
            element: 'A',
            location: `Link ${index}: ${text?.substring(0, 30)}...`
          });
        }
      }

      // Check for descriptive link text
      const vagueLinkText = ['click here', 'read more', 'learn more', 'here', 'this'];
      if (vagueLinkText.some(vague => text?.toLowerCase().includes(vague))) {
        this.issues.push({
          type: 'accessibility',
          severity: 'info',
          message: 'Link text could be more descriptive for screen readers',
          element: 'A',
          location: `Link ${index}: ${text}`
        });
      }
    });
  }

  private checkCTAs() {
    const ctaButtons = document.querySelectorAll('button, .button-primary, .button-secondary');
    
    ctaButtons.forEach((button, index) => {
      const text = button.textContent?.trim();
      
      if (!text) {
        this.issues.push({
          type: 'cta',
          severity: 'error',
          message: 'CTA button has no text',
          element: button.tagName,
          location: `Button ${index}`
        });
        return;
      }

      // Check for action-oriented language
      const actionWords = ['try', 'start', 'get', 'join', 'explore', 'discover', 'continue', 'learn'];
      const hasActionWord = actionWords.some(word => 
        text.toLowerCase().includes(word)
      );
      
      if (!hasActionWord) {
        this.issues.push({
          type: 'cta',
          severity: 'info',
          message: 'CTA could use more action-oriented language',
          element: button.tagName,
          location: `Button ${index}: "${text}"`
        });
      }

      // Check for appropriate length (not too long)
      if (text.length > 25) {
        this.issues.push({
          type: 'cta',
          severity: 'warning',
          message: 'CTA text may be too long for mobile',
          element: button.tagName,
          location: `Button ${index}: "${text}"`
        });
      }

      // Check for click handlers
      const hasOnClick = button.hasAttribute('onclick') || button.addEventListener;
      const hasHref = button.closest('a')?.hasAttribute('href');
      
      if (!hasOnClick && !hasHref) {
        this.issues.push({
          type: 'cta',
          severity: 'warning',
          message: 'CTA button may not be functional (no click handler or href)',
          element: button.tagName,
          location: `Button ${index}: "${text}"`
        });
      }
    });
  }

  private checkAccessibility() {
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt')) {
        this.issues.push({
          type: 'accessibility',
          severity: 'error',
          message: 'Image missing alt attribute',
          element: 'IMG',
          location: `Image ${index}: src="${img.getAttribute('src')}"`
        });
      } else if (img.getAttribute('alt') === '') {
        // Empty alt is okay for decorative images, but should be intentional
        this.issues.push({
          type: 'accessibility',
          severity: 'info',
          message: 'Image has empty alt text - ensure this is decorative',
          element: 'IMG',
          location: `Image ${index}: src="${img.getAttribute('src')}"`
        });
      }
    });

    // Check for heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        this.issues.push({
          type: 'accessibility',
          severity: 'warning',
          message: 'First heading should be H1',
          element: heading.tagName,
          location: `Heading ${index}: ${heading.textContent?.substring(0, 30)}...`
        });
      }
      
      if (level > previousLevel + 1) {
        this.issues.push({
          type: 'accessibility',
          severity: 'warning',
          message: `Heading level skipped (${previousLevel} to ${level})`,
          element: heading.tagName,
          location: `Heading ${index}: ${heading.textContent?.substring(0, 30)}...`
        });
      }
      
      previousLevel = level;
    });

    // Check for focus management
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        this.issues.push({
          type: 'accessibility',
          severity: 'warning',
          message: 'Positive tabindex can cause accessibility issues',
          element: element.tagName,
          location: `Interactive element ${index}`
        });
      }
    });
  }

  private checkLegalCompliance() {
    const pageText = document.body.textContent?.toLowerCase() || '';
    
    // Check for required privacy terms
    this.requiredLegalTerms.forEach(term => {
      if (!pageText.includes(term.toLowerCase())) {
        this.issues.push({
          type: 'legal',
          severity: 'warning',
          message: `Missing important legal/privacy term: "${term}"`,
          location: 'Page content'
        });
      }
    });

    // Check for privacy policy link
    const privacyLinks = document.querySelectorAll('a[href*="privacy"]');
    if (privacyLinks.length === 0) {
      this.issues.push({
        type: 'legal',
        severity: 'error',
        message: 'No privacy policy link found',
        location: 'Footer or legal section'
      });
    }

    // Check for terms of service link
    const termsLinks = document.querySelectorAll('a[href*="terms"]');
    if (termsLinks.length === 0) {
      this.issues.push({
        type: 'legal',
        severity: 'warning',
        message: 'No terms of service link found',
        location: 'Footer or legal section'
      });
    }
  }

  private checkMetaData() {
    // Check for essential meta tags
    const title = document.querySelector('title')?.textContent;
    if (!title || title.length < 30 || title.length > 60) {
      this.issues.push({
        type: 'consistency',
        severity: 'warning',
        message: 'Page title should be 30-60 characters for SEO',
        element: 'TITLE',
        location: 'Head section'
      });
    }

    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (!metaDescription || metaDescription.length < 120 || metaDescription.length > 160) {
      this.issues.push({
        type: 'consistency',
        severity: 'warning',
        message: 'Meta description should be 120-160 characters for SEO',
        element: 'META',
        location: 'Head section'
      });
    }

    // Check for Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    if (!ogTitle || !ogDescription || !ogImage) {
      this.issues.push({
        type: 'consistency',
        severity: 'info',
        message: 'Missing Open Graph tags for social media sharing',
        element: 'META',
        location: 'Head section'
      });
    }
  }

  public generateReport(): string {
    const errorCount = this.issues.filter(i => i.severity === 'error').length;
    const warningCount = this.issues.filter(i => i.severity === 'warning').length;
    const infoCount = this.issues.filter(i => i.severity === 'info').length;

    let report = `\n=== CONTENT REVIEW REPORT ===\n`;
    report += `Total Issues: ${this.issues.length}\n`;
    report += `Errors: ${errorCount} | Warnings: ${warningCount} | Info: ${infoCount}\n\n`;

    if (errorCount === 0 && warningCount === 0) {
      report += `✅ Excellent! No critical issues found.\n`;
    }

    // Group issues by type
    const groupedIssues = this.issues.reduce((acc, issue) => {
      if (!acc[issue.type]) acc[issue.type] = [];
      acc[issue.type].push(issue);
      return acc;
    }, {} as Record<string, ContentIssue[]>);

    Object.entries(groupedIssues).forEach(([type, issues]) => {
      report += `\n--- ${type.toUpperCase()} ISSUES ---\n`;
      issues.forEach((issue, index) => {
        const icon = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
        report += `${icon} ${issue.message}\n`;
        if (issue.location) report += `   Location: ${issue.location}\n`;
        if (index < issues.length - 1) report += `\n`;
      });
    });

    return report;
  }
}

// Utility function to run content review
export const runContentReview = async (): Promise<void> => {
  const reviewer = new ContentReviewer();
  const issues = await reviewer.reviewContent();
  const report = reviewer.generateReport();
  
  console.log(report);
  
  // Also send to analytics
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track('content_review_completed', {
      total_issues: issues.length,
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length
    });
  }
};

// Export for use in development
export default ContentReviewer;
