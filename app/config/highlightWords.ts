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
  'PT Pubmedia Digital Sains',
  'PT Merapi Tani Instrumen',
  'PT Siber Integrasi Teknologi',
  'Agares',
  'Invaderzone',
  'Mertani',
  'Telkom',
  // Technologies
  'TypeScript',
  'Next.js',
  'Microservices',
  'Docker',
  'Kubernetes',
  'Laravel V10',
  'React.js',
  'Tailwind CSS',
  'Tailwind',
  
  // Methodologies & Frameworks
  'Scrum',
  'Kanban',
  'DevOps',
  'CI/CD',
  
  // Add your custom words here
  'Isitasi',
  'UI/UX Design',
  'UI/UX',
  '10-day',
  'payment gateway',
  'sectorOne',
  'AI',
  'breach.invaderzone.com',
  'tracker.invaderzone.com',
  'invaderzone.com',
  'reusable frontend components',
  'doi.pubmedia.co.id'
  // Words will be matched with word boundaries to avoid substring matches
];

/**
 * Custom regex patterns for complex matching
 * These patterns will be applied in addition to the custom words above
 */
export const customHighlightPatterns: RegExp[] = [
  // Percentages: 85%, 87%, 79%, 20%, etc.
  /(\d+%)/g,
  
  // Numbers with plus sign: 20+, 17+, etc.
  /(\d+\+)/g,
  
  // Standalone numbers (with word boundaries): 20, 17, 15, 13, 11, etc.
  /\b(\d+)\b/g,
  
  // Numbers with common units/words: 13 features, 11 sprints, etc. (with word boundaries)
  /\b(\d+\s+(?:features?|sprints?|months?|years?|days?|weeks?|users?|applications?|projects?|teams?|sprints?|components?|tables?|issues?|hours?|developers?))\b/gi,
  
  // Technologies (case-insensitive) - with word boundaries to avoid substring matches
  /\b(Laravel\s+(?:V|v)?\d+|Laravel\s+V\d+|Laravel\s+v\d+|Supabase|Vue\.js|Nuxt|Nuxt\.js|PHP|JavaScript|Vuex|Bootstrap|React|TypeScript|Next\.js|Svelte|SCSS|MySQL|PostgreSQL|XML|OAI|Postman)\b/gi,
  // Technologies with spaces (RESTful API, Cursor Pro, Tailwind CSS)
  /(RESTful\s+API|Cursor\s+Pro|Tailwind\s+CSS)/gi,
  // Single word technologies that need word boundaries
  /\b(CSS|HTML|GIT|Tailwind)\b/gi,
  
  // Key technical terms (with word boundaries to avoid matching substrings)
  /\b(CRUD|API|APIs|RESTful|Backend-as-a-Service|BaaS|Microservices|Docker|Kubernetes|IoT|XML\s+parsing|XML\s+OAI)\b/gi,
  
  // Methodology terms
  /\b(Agile|sprint|sprints|Scrum|Kanban|DevOps|CI\/CD)\b/gi,
];

