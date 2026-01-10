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
  links?: {
    label: string;
    url: string;
  }[];
  // Category for filtering
  category: 'Frontend' | 'Fullstack' | 'UI Only';
  // Images
  images?: string[]; // Array of images for slider
}

export const projects: ProjectDetail[] = [
  {
    id: 'scheduling-information-system',
    title: 'Final Project Scheduling Information System',
    tagline: 'Automated scheduling system for final project defenses with intelligent resource allocation and conflict prevention.',
    role: 'Back End Developer',
    startDate: '1 Maret 2024',
    endDate: '30 Juni 2024',
    background: 'This is a final project (skripsi) research project conducted as part of the academic requirements for completing Diploma 3 (D3) program. The project focuses on developing an information system to automate the scheduling process for final project evaluations and defenses at the Informatics Engineering department. The system was developed collaboratively by a team of two, where I served as the Backend Developer responsible for developing the server-side logic, APIs, and database architecture, while also contributing to UI refinement and polish.',
    problem: 'Currently, the scheduling process is still done manually by the Final Project Coordinator (Koordinator PA) using Excel or spreadsheets, which often leads to scheduling conflicts between lecturers, rooms, or time slots. The manual process requires significant time and coordination, especially when dealing with large amounts of data including lecturers with their research groups, students, final project titles, available rooms, and moderator availability. Additionally, information related to final projects is still distributed manually through WhatsApp broadcasts, which risks important information being missed by students or lecturers. The existing manual process is time-consuming, error-prone, and lacks efficiency in managing complex scheduling constraints.',
    challenges: [
      {
        challenge: 'Implementing complex rule-based scheduling algorithm with multiple constraints. The system needed to handle various rules simultaneously: ensuring examiners are from the same research group as the first supervisor, allocating exactly 3 lecturers per room from the same research group, limiting each examiner to maximum 4 students, and managing moderator availability. These constraints made the scheduling algorithm complex and required careful logic implementation to prevent conflicts.',
        solution: 'Developed a rule-based scheduling algorithm using IF-THEN rules to model all scheduling constraints systematically. Implemented a forward chaining approach that starts with initial data (lecturers, students, rooms) and applies rules sequentially to generate conflict-free schedules. Created conflict detection mechanisms that check for overlaps in lecturer schedules, room bookings, and time slots before finalizing each schedule assignment. The algorithm iterates through all possible combinations while respecting all constraints to find optimal solutions.',
      },
      {
        challenge: 'Coordinating backend development and UI refinement in a two-person team while maintaining project timeline. As the backend developer, I needed to ensure API endpoints were ready for frontend integration, while also contributing to UI improvements. This required effective communication and task prioritization to avoid bottlenecks in the development process.',
        solution: 'Established clear API contracts and documentation early in the development process, allowing parallel work between backend and frontend. Created comprehensive RESTful APIs with consistent response formats that made frontend integration straightforward. When assisting with UI refinement, I focused on improving consistency, spacing, and user experience elements that didn\'t require major frontend restructuring. Used version control effectively to manage code integration and minimize conflicts.',
      },
      {
        challenge: 'Handling large datasets efficiently for scheduling calculations. The system needed to process data for multiple lecturers with their research groups, numerous students, available rooms, and time slots. Manual scheduling with Excel showed that processing this data manually was time-consuming and error-prone, so the automated system needed to handle these datasets efficiently.',
        solution: 'Designed an optimized database schema with proper indexing on frequently queried fields (research groups, lecturer availability, room capacity). Implemented efficient data structures for schedule generation that minimize redundant calculations. Used Supabase\'s built-in query optimization features and implemented pagination for large result sets. Created batch processing for schedule generation to handle multiple assignments efficiently without overwhelming the system.',
      },
      {
        challenge: 'Integrating Supabase as Backend-as-a-Service while maintaining data consistency and handling file uploads. The system needed to store scheduling data, user information, and documents (proposal files, evaluation documents) reliably. Managing file uploads and ensuring proper storage organization was crucial for the system\'s functionality.',
        solution: 'Leveraged Supabase\'s PostgreSQL database for structured data storage with proper relationships and foreign keys to maintain data integrity. Implemented Supabase bucket storage for document management with organized folder structures (by student, by evaluation type). Created robust file upload endpoints with validation for file types and sizes, and implemented error handling for upload failures. Used Supabase\'s real-time capabilities where appropriate to keep data synchronized.',
      },
    ],
    contributions: [
      'Developed and implemented RESTful APIs for schedule generation feature',
      'Built comprehensive CRUD operations (create, read, update, delete) for scheduling management',
      'Implemented document upload functionality to Supabase bucket storage',
      'Designed and implemented database schema with proper relationships',
      'Created automated scheduling algorithm with conflict prevention using rule-based method',
      'Optimized API endpoints for handling large scheduling datasets',
      'Implemented error handling and validation for all API endpoints',
      'Assisted in UI refinement and polish to improve user experience and interface consistency',
    ],
    technologies: ['Laravel 9', 'Supabase', 'PHP', 'RESTful API', 'Bootstrap', 'PostgreSQL'],
    tools: ['Composer', 'Postman', 'GIT'],
    services: ['Supabase', 'Supabase Storage'],
    projectType: 'Personal',
    teamSize: 2,
    result: 'Successfully developed an automated scheduling system that reduces manual scheduling time by 85%, prevents scheduling conflicts by 87%, and achieves 79% accuracy in generating optimal schedules for final project defenses.',
    impact: [
      'Reduced manual scheduling time by 85%',
      'Prevented scheduling conflicts by 87%',
      'Achieved 79% accuracy rate in automated schedule generation',
      'Improved scheduling efficiency significantly',
      'Streamlined the final project defense process for academic institutions',
    ],
    links: [
      { label: 'Repository', url: 'https://github.com/username/scheduling-system' },
    ],
    category: 'Fullstack',
  },
];

