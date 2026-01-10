/**
 * Custom Highlight Words Configuration
 * 
 * Add words or phrases here that you want to be highlighted in bold
 * across experience and project sections.
 * 
 * Format:
 * - Use word boundaries (\b) for exact word matching
 * - Use regex patterns for more complex matching
 * - Case-insensitive matching is applied automatically
 */

export const customHighlightWords: string[] = [
  // Company names
  'PT Telkom Indonesia Tbk',
  'DDB Telkom',
  'BUMN',
  // Technologies
  'React',
  'TypeScript',
  'Next.js',
  'Microservices',
  'Docker',
  'Kubernetes',
  
  // Methodologies & Frameworks
  'Scrum',
  'Kanban',
  'DevOps',
  'CI/CD',
  
  // Add your custom words here
  // Words will be matched with word boundaries to avoid substring matches
];

/**
 * Custom regex patterns for complex matching
 * These patterns will be applied in addition to the custom words above
 */
export const customHighlightPatterns: RegExp[] = [
  // Add custom regex patterns here if needed
  // Example: /\b(React|Vue|Angular)\b/gi
];

