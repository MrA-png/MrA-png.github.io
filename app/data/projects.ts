export interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  role: string;
  startDate: string; // Format: "15 Januari 2024"
  endDate?: string; // Format: "20 Maret 2024" (optional, jika masih ongoing bisa kosong)
  // Background / Context
  background: string;
  problem: string;
  // Challenges & Solutions
  challenges: {
    challenge: string;
    solution: string;
  }[];
  // My Contribution
  contributions: string[];
  // Tech Stack
  technologies: string[];
  tools?: string[];
  services?: string[];
  // Project Info
  client?: string;
  company?: string;
  partner?: string;
  projectType: 'Client' | 'Internal' | 'Personal';
  teamSize?: number;
  // Result / Impact
  result: string;
  impact?: string[];
  // Preview & Links
  liveDemo?: string;
  repository?: string;
  screenshots?: string[];
  // Category for filtering
  category: 'Frontend' | 'Fullstack' | 'UI Only';
  // Images
  image?: string;
  thumbnail?: string;
}

export const projects: ProjectDetail[] = [
  {
    id: 'scheduling-information-system',
    title: 'Final Project Scheduling Information System',
    tagline: 'Automated scheduling system for final project defenses with intelligent resource allocation and conflict prevention.',
    role: 'Back End Developer',
    startDate: '1 Maret 2024',
    endDate: '30 Juni 2024',
    background: 'The Final Project Scheduling Information System was developed to address the challenges faced by academic institutions in manually scheduling final project defenses. The system automates the complex process of allocating examiners, rooms, and time slots while preventing scheduling conflicts.',
    problem: 'Academic institutions struggle with manual scheduling processes that are time-consuming, error-prone, and often result in conflicts. The existing manual process requires significant administrative effort and frequently leads to scheduling conflicts, examiner unavailability, and inefficient resource utilization.',
    challenges: [
      {
        challenge: 'Complex scheduling constraints requiring optimal resource allocation',
        solution: 'Developed a constraint-based scheduling algorithm that considers multiple factors including examiner availability, room capacity, and time preferences. Implemented conflict detection and resolution mechanisms to ensure optimal schedule generation with 87% conflict prevention rate.',
      },
      {
        challenge: 'Handling large datasets and ensuring API performance',
        solution: 'Optimized database queries with proper indexing, implemented pagination for large result sets, and used efficient data structures for schedule generation. Leveraged Supabase\'s built-in performance optimizations to handle concurrent requests.',
      },
      {
        challenge: 'Managing file uploads and storage efficiently',
        solution: 'Integrated Supabase bucket storage for document management, implemented proper file validation, and created efficient upload endpoints with progress tracking. This enabled seamless document handling for final project submissions.',
      },
    ],
    contributions: [
      'Developed and implemented RESTful APIs for schedule generation feature',
      'Built comprehensive CRUD operations (create, read, update, delete) for scheduling management',
      'Implemented document upload functionality to Supabase bucket storage',
      'Designed and implemented database schema with proper relationships',
      'Created automated scheduling algorithm with conflict prevention',
      'Optimized API endpoints for handling large scheduling datasets',
      'Implemented error handling and validation for all API endpoints',
    ],
    technologies: ['Laravel 9', 'Supabase', 'PHP', 'RESTful API'],
    tools: ['Composer', 'Postman', 'Git'],
    services: ['Supabase', 'Supabase Storage'],
    projectType: 'Personal',
    teamSize: 1,
    result: 'Successfully developed an automated scheduling system that reduces manual scheduling time by 85%, prevents scheduling conflicts by 87%, and achieves 79% accuracy in generating optimal schedules for final project defenses.',
    impact: [
      'Reduced manual scheduling time by 85%',
      'Prevented scheduling conflicts by 87%',
      'Achieved 79% accuracy rate in automated schedule generation',
      'Improved scheduling efficiency significantly',
      'Streamlined the final project defense process for academic institutions',
    ],
    repository: 'https://github.com/username/scheduling-system',
    category: 'Fullstack',
  },
  {
    id: 'telkom-frontend-internship',
    title: 'PT Telkom Indonesia Frontend Development',
    tagline: 'Frontend development internship focusing on responsive UI development, API integration, and user experience improvement.',
    role: 'Front End Developer Intern',
    startDate: '1 Juli 2023',
    endDate: '31 Januari 2024',
    background: 'Worked as a Frontend Developer Intern at PT Telkom Indonesia Tbk, the largest telecommunications company in Indonesia. Contributed to various digital transformation projects, focusing on translating designs into responsive user interfaces and integrating backend APIs to improve application functionality.',
    problem: 'The company needed to modernize their digital platforms with responsive, user-friendly interfaces. Existing applications lacked proper API integration, had poor user experience, and were not optimized for various device sizes. There was a need to improve customer satisfaction and streamline development processes.',
    challenges: [
      {
        challenge: 'Translating complex designs into responsive Vue.js and Nuxt components',
        solution: 'Created reusable component library following Vue.js best practices. Used CSS Grid and Flexbox for responsive layouts, implemented proper component composition, and ensured cross-browser compatibility. This enabled faster development and consistent UI across projects.',
      },
      {
        challenge: 'API integration and ensuring smooth data exchange',
        solution: 'Worked closely with backend developers to understand API contracts and data structures. Implemented proper error handling, loading states, and used Vuex for state management to ensure consistent data flow. Created API requirement documentation to facilitate better collaboration.',
      },
      {
        challenge: 'Meeting sprint deadlines while maintaining code quality across 11 sprints',
        solution: 'Adopted agile development practices, participated actively in sprint planning and daily standups. Prioritized tasks effectively, implemented code reviews, and focused on delivering 13 features across 11 sprints while maintaining high code quality standards.',
      },
    ],
    contributions: [
      'Translated designs into responsive and attractive user interfaces using Vue.js and Nuxt',
      'Worked closely with backend developers to integrate APIs, improving data exchange and application functionality',
      'Developed interactive user interfaces to improve user experience',
      'Successfully completed development of 13 features over 11 sprints',
      'Developed API requirements documentation for better team collaboration',
      'Participated in bug testing and fixing to ensure application stability',
      'Collaborated with cross-functional teams including designers and product managers',
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'JavaScript', 'RESTful API', 'CSS', 'HTML'],
    tools: ['Vuex', 'Git', 'Postman', 'VS Code'],
    services: ['PT Telkom Indonesia APIs'],
    company: 'PT Telkom Indonesia Tbk',
    projectType: 'Client',
    teamSize: 5,
    result: 'Successfully contributed to multiple production-ready applications during the internship. Improved user experience and increased customer satisfaction by 20% through better UI/UX implementation. Completed 13 features across 11 sprints, demonstrating strong development capabilities and teamwork.',
    impact: [
      'Increased customer satisfaction by 20% through improved user interfaces',
      'Successfully completed 13 features across 11 sprints',
      'Improved data exchange efficiency through better API integration',
      'Enhanced user experience across multiple digital platforms',
      'Contributed to production-ready applications used by thousands of users',
    ],
    category: 'Frontend',
    image: '/assets/images/projects/telkom-frontend.jpg',
  },
];

