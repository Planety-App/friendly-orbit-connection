// Accessibility Testing Utilities
// Automated WCAG compliance checking

export interface AccessibilityIssue {
  type: 'color_contrast' | 'keyboard_navigation' | 'screen_reader' | 'focus_management' | 'aria_labels';
  severity: 'error' | 'warning' | 'info';
  message: string;
  element?: HTMLElement;
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriterion: string;
}

export class AccessibilityTester {
  private issues: AccessibilityIssue[] = [];

  public async runAccessibilityTests(): Promise<AccessibilityIssue[]> {
    this.issues = [];
    
    await this.testColorContrast();
    this.testKeyboardNavigation();
    this.testScreenReaderSupport();
    this.testFocusManagement();
    this.testARIALabels();
    this.testSemanticHTML();
    
    return this.issues;
  }

  private async testColorContrast() {
    // Get all text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, input, label');
    
    for (const element of textElements) {
      const styles = window.getComputedStyle(element);
      const textColor = styles.color;
      const backgroundColor = this.getEffectiveBackgroundColor(element);
      
      if (textColor && backgroundColor) {
        const contrast = this.calculateContrast(textColor, backgroundColor);
        const fontSize = parseFloat(styles.fontSize);
        const fontWeight = styles.fontWeight;
        
        // Determine if text is large (18pt+ or 14pt+ bold)
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
        
        // WCAG AA requirements: 4.5:1 for normal text, 3:1 for large text
        const requiredContrast = isLargeText ? 3 : 4.5;
        
        if (contrast < requiredContrast) {
          this.issues.push({
            type: 'color_contrast',
            severity: 'error',
            message: `Insufficient color contrast: ${contrast.toFixed(2)}:1 (required: ${requiredContrast}:1)`,
            element: element as HTMLElement,
            wcagLevel: 'AA',
            wcagCriterion: '1.4.3 Contrast (Minimum)'
          });
        }
        
        // WCAG AAA requirements: 7:1 for normal text, 4.5:1 for large text
        const aaaRequiredContrast = isLargeText ? 4.5 : 7;
        if (contrast < aaaRequiredContrast) {
          this.issues.push({
            type: 'color_contrast',
            severity: 'info',
            message: `Below AAA contrast standard: ${contrast.toFixed(2)}:1 (AAA requires: ${aaaRequiredContrast}:1)`,
            element: element as HTMLElement,
            wcagLevel: 'AAA',
            wcagCriterion: '1.4.6 Contrast (Enhanced)'
          });
        }
      }
    }
  }

  private getEffectiveBackgroundColor(element: HTMLElement): string | null {
    let current = element;
    
    while (current && current !== document.body) {
      const styles = window.getComputedStyle(current);
      const bgColor = styles.backgroundColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
      }
      
      current = current.parentElement as HTMLElement;
    }
    
    // Default to white background
    return 'rgb(255, 255, 255)';
  }

  private calculateContrast(color1: string, color2: string): number {
    const rgb1 = this.parseColor(color1);
    const rgb2 = this.parseColor(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const l1 = this.getRelativeLuminance(rgb1);
    const l2 = this.getRelativeLuminance(rgb2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private parseColor(color: string): [number, number, number] | null {
    // Handle rgb() format
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
    }
    
    // Handle rgba() format
    const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (rgbaMatch) {
      return [parseInt(rgbaMatch[1]), parseInt(rgbaMatch[2]), parseInt(rgbaMatch[3])];
    }
    
    // Handle hex format
    const hexMatch = color.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
      return [
        parseInt(hexMatch[1], 16),
        parseInt(hexMatch[2], 16),
        parseInt(hexMatch[3], 16)
      ];
    }
    
    return null;
  }

  private getRelativeLuminance([r, g, b]: [number, number, number]): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  private testKeyboardNavigation() {
    // Test that all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex], [role="button"], [role="link"]'
    );
    
    interactiveElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      
      // Check if element is focusable
      const tabIndex = htmlElement.tabIndex;
      if (tabIndex < 0 && !['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'A'].includes(htmlElement.tagName)) {
        this.issues.push({
          type: 'keyboard_navigation',
          severity: 'error',
          message: 'Interactive element not keyboard accessible',
          element: htmlElement,
          wcagLevel: 'A',
          wcagCriterion: '2.1.1 Keyboard'
        });
      }
      
      // Check for keyboard event handlers
      const hasKeyboardHandler = htmlElement.onkeydown || htmlElement.onkeyup || htmlElement.onkeypress;
      const hasClickHandler = htmlElement.onclick;
      
      if (hasClickHandler && !hasKeyboardHandler && htmlElement.tagName !== 'BUTTON' && htmlElement.tagName !== 'A') {
        this.issues.push({
          type: 'keyboard_navigation',
          severity: 'warning',
          message: 'Click handler without keyboard equivalent',
          element: htmlElement,
          wcagLevel: 'A',
          wcagCriterion: '2.1.1 Keyboard'
        });
      }
    });
  }

  private testScreenReaderSupport() {
    // Test for proper heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        this.issues.push({
          type: 'screen_reader',
          severity: 'error',
          message: 'Page should start with H1',
          element: heading as HTMLElement,
          wcagLevel: 'A',
          wcagCriterion: '1.3.1 Info and Relationships'
        });
      }
      
      if (level > previousLevel + 1) {
        this.issues.push({
          type: 'screen_reader',
          severity: 'warning',
          message: `Heading level skipped (H${previousLevel} to H${level})`,
          element: heading as HTMLElement,
          wcagLevel: 'A',
          wcagCriterion: '1.3.1 Info and Relationships'
        });
      }
      
      previousLevel = level;
    });

    // Test for alt text on images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        this.issues.push({
          type: 'screen_reader',
          severity: 'error',
          message: 'Image missing alt attribute',
          element: img,
          wcagLevel: 'A',
          wcagCriterion: '1.1.1 Non-text Content'
        });
      }
    });

    // Test for form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const htmlInput = input as HTMLInputElement;
      const hasLabel = document.querySelector(`label[for="${htmlInput.id}"]`) || 
                      htmlInput.getAttribute('aria-label') ||
                      htmlInput.getAttribute('aria-labelledby');
      
      if (!hasLabel && htmlInput.type !== 'hidden') {
        this.issues.push({
          type: 'screen_reader',
          severity: 'error',
          message: 'Form input missing label',
          element: htmlInput,
          wcagLevel: 'A',
          wcagCriterion: '1.3.1 Info and Relationships'
        });
      }
    });
  }

  private testFocusManagement() {
    // Test for visible focus indicators
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      
      // Simulate focus to test visibility
      htmlElement.focus();
      const styles = window.getComputedStyle(htmlElement, ':focus');
      
      // Check if there's a visible focus indicator
      const hasOutline = styles.outline !== 'none' && styles.outline !== '0px';
      const hasBoxShadow = styles.boxShadow !== 'none';
      const hasBackground = styles.backgroundColor !== 'transparent';
      
      if (!hasOutline && !hasBoxShadow && !hasBackground) {
        this.issues.push({
          type: 'focus_management',
          severity: 'error',
          message: 'No visible focus indicator',
          element: htmlElement,
          wcagLevel: 'AA',
          wcagCriterion: '2.4.7 Focus Visible'
        });
      }
      
      htmlElement.blur(); // Remove focus after test
    });
  }

  private testARIALabels() {
    // Test for proper ARIA usage
    const elementsWithRole = document.querySelectorAll('[role]');
    
    elementsWithRole.forEach(element => {
      const role = element.getAttribute('role');
      const htmlElement = element as HTMLElement;
      
      // Check if interactive roles have accessible names
      const interactiveRoles = ['button', 'link', 'tab', 'menuitem', 'option'];
      if (interactiveRoles.includes(role || '')) {
        const hasAccessibleName = htmlElement.textContent?.trim() ||
                                htmlElement.getAttribute('aria-label') ||
                                htmlElement.getAttribute('aria-labelledby');
        
        if (!hasAccessibleName) {
          this.issues.push({
            type: 'aria_labels',
            severity: 'error',
            message: `Interactive element with role="${role}" missing accessible name`,
            element: htmlElement,
            wcagLevel: 'A',
            wcagCriterion: '4.1.2 Name, Role, Value'
          });
        }
      }
    });

    // Test for aria-expanded on collapsible elements
    const collapsibleElements = document.querySelectorAll('[aria-controls]');
    collapsibleElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      if (!htmlElement.hasAttribute('aria-expanded')) {
        this.issues.push({
          type: 'aria_labels',
          severity: 'warning',
          message: 'Collapsible element missing aria-expanded',
          element: htmlElement,
          wcagLevel: 'AA',
          wcagCriterion: '4.1.2 Name, Role, Value'
        });
      }
    });
  }

  private testSemanticHTML() {
    // Test for proper landmark usage
    const landmarks = document.querySelectorAll('main, nav, header, footer, aside, section, article');
    
    if (!document.querySelector('main')) {
      this.issues.push({
        type: 'screen_reader',
        severity: 'warning',
        message: 'Page missing main landmark',
        wcagLevel: 'A',
        wcagCriterion: '1.3.1 Info and Relationships'
      });
    }

    // Test for list structure
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      const listItems = list.querySelectorAll('> li');
      if (listItems.length === 0) {
        this.issues.push({
          type: 'screen_reader',
          severity: 'warning',
          message: 'Empty list element',
          element: list as HTMLElement,
          wcagLevel: 'A',
          wcagCriterion: '1.3.1 Info and Relationships'
        });
      }
    });
  }

  public generateAccessibilityReport(): string {
    const errorCount = this.issues.filter(i => i.severity === 'error').length;
    const warningCount = this.issues.filter(i => i.severity === 'warning').length;
    const infoCount = this.issues.filter(i => i.severity === 'info').length;

    let report = `\n=== ACCESSIBILITY REPORT ===\n`;
    report += `Total Issues: ${this.issues.length}\n`;
    report += `Errors: ${errorCount} | Warnings: ${warningCount} | Info: ${infoCount}\n\n`;

    if (errorCount === 0) {
      report += `✅ No critical accessibility errors found!\n`;
    } else {
      report += `❌ ${errorCount} critical accessibility issues need fixing\n`;
    }

    // Group by WCAG level
    const levelCounts = {
      A: this.issues.filter(i => i.wcagLevel === 'A').length,
      AA: this.issues.filter(i => i.wcagLevel === 'AA').length,
      AAA: this.issues.filter(i => i.wcagLevel === 'AAA').length
    };

    report += `\nWCAG Compliance:\n`;
    report += `Level A: ${levelCounts.A} issues\n`;
    report += `Level AA: ${levelCounts.AA} issues\n`;
    report += `Level AAA: ${levelCounts.AAA} issues\n\n`;

    // Detailed issues
    this.issues.forEach((issue, index) => {
      const icon = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
      report += `${icon} [${issue.wcagLevel}] ${issue.message}\n`;
      report += `   WCAG: ${issue.wcagCriterion}\n`;
      if (issue.element) {
        report += `   Element: ${issue.element.tagName}${issue.element.id ? '#' + issue.element.id : ''}${issue.element.className ? '.' + issue.element.className.split(' ')[0] : ''}\n`;
      }
      report += `\n`;
    });

    return report;
  }
}

// Utility function to run accessibility tests
export const runAccessibilityTests = async (): Promise<void> => {
  const tester = new AccessibilityTester();
  const issues = await tester.runAccessibilityTests();
  const report = tester.generateAccessibilityReport();
  
  console.log(report);
  
  // Send results to analytics
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.track('accessibility_test_completed', {
      total_issues: issues.length,
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      wcag_a_issues: issues.filter(i => i.wcagLevel === 'A').length,
      wcag_aa_issues: issues.filter(i => i.wcagLevel === 'AA').length,
      wcag_aaa_issues: issues.filter(i => i.wcagLevel === 'AAA').length
    });
  }
};

export default AccessibilityTester;
