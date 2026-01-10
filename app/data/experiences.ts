export interface ExperienceDetail {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  workType: string;
  achievements: string[];
  technologies: string[];
  // Extended fields for detail page
  companyInfo?: string;
  projectOverview?: string;
  responsibilities: string[];
  keyAchievements: string[];
  challenges?: {
    challenge: string;
    solution: string;
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  // Image
  image?: string;
  thumbnail?: string;
}

export const experiences: ExperienceDetail[] = [
  {
    id: 'backend-developer-scheduling-system',
    title: 'Back End Developer',
    company: 'Final Project Scheduling Information System',
    period: 'Mar 2024 - Jun 2024',
    location: 'Indonesia',
    workType: 'Fulltime',
    image: '/assets/images/experiences/scheduling-system.jpg',
    companyInfo: 'Final Project Scheduling Information System is an academic project focused on developing an automated scheduling system for final project defenses. The system aims to streamline the scheduling process for academic institutions by automating examiner allocation, room assignment, and time slot management.',
    projectOverview: 'Developed a comprehensive scheduling information system that automates the entire process of scheduling final project defenses. The system handles complex constraints including examiner availability, room capacity, time slot conflicts, and student preferences to generate optimal schedules automatically.',
    responsibilities: [
      'Developed and implemented RESTful APIs for schedule generation feature',
      'Built CRUD operations (create, read, update, delete) for scheduling management',
      'Implemented document upload functionality to Supabase bucket storage',
      'Designed database schema and relationships for scheduling system',
      'Created automated scheduling algorithm to prevent conflicts',
      'Integrated Supabase as Backend-as-a-Service for data management',
      'Optimized API performance for handling large scheduling datasets',
    ],
    achievements: [
      'Implemented an automated scheduling system, reducing manual scheduling time by up to 85%.',
      'Improved scheduling efficiency by ensuring the allocation of examiners, rooms, and time slots, thereby preventing scheduling conflicts by up to 87%.',
      'Achieved an accuracy rate of up to 79% in generating scheduling for final project defenses.',
    ],
    keyAchievements: [
      'Reduced manual scheduling time by 85% through automation',
      'Prevented scheduling conflicts by 87% with intelligent allocation algorithm',
      'Achieved 79% accuracy rate in automated schedule generation',
      'Successfully implemented RESTful APIs for all core functionalities',
      'Integrated Supabase storage for efficient document management',
    ],
    technologies: ['Laravel 9', 'Supabase', 'PHP', 'RESTful API'],
    challenges: [
      {
        challenge: 'Complex scheduling constraints requiring optimal resource allocation',
        solution: 'Developed a constraint-based scheduling algorithm that considers multiple factors including examiner availability, room capacity, and time preferences. Implemented conflict detection and resolution mechanisms to ensure optimal schedule generation.',
      },
      {
        challenge: 'Handling large datasets and ensuring API performance',
        solution: 'Optimized database queries with proper indexing, implemented pagination for large result sets, and used efficient data structures for schedule generation. Leveraged Supabase\'s built-in performance optimizations.',
      },
      {
        challenge: 'Managing file uploads and storage efficiently',
        solution: 'Integrated Supabase bucket storage for document management, implemented proper file validation, and created efficient upload endpoints with progress tracking.',
      },
    ],
    links: [
      { label: 'Project Repository', url: 'https://github.com/username/scheduling-system' },
    ],
  },
  {
    id: 'frontend-developer-telkom',
    title: 'Front End Developer Intern',
    company: 'PT Telkom Indonesia Tbk',
    period: 'Jul 2023 - Jan 2024',
    location: 'Bandung, Indonesia',
    workType: 'Internship',
    image: '/assets/images/experiences/telkom-indonesia.jpg',
    companyInfo: 'PT Telkom Indonesia Tbk is a state-owned enterprise (BUMN) and the largest telecommunications and digital service provider in Indonesia. The company plays a vital role in building and operating national connectivity infrastructure, including fixed and mobile networks, broadband services, data centers, and digital platforms. As a key driver of Indonesia’s digital transformation, Telkom delivers end-to-end ICT solutions for government institutions, enterprises, and consumers, supporting innovation and digitalization across various industries.',
    projectOverview: 'During my internship at DDB Telkom, a digital unit under PT Telkom Indonesia Tbk, I worked as a Frontend Developer Intern in the Digital Operation & Assurance division from July to January 2024. Throughout this internship, I collaborated with experienced professionals and contributed to several web-based projects focused on improving the quality and reliability of digital products. One of the primary projects involved developing the user interface for an internal application designed to ensure digital product quality through structured evaluation processes such as Heuristic Evaluation, Usability Testing, Software Testing, Security Testing, and Service Operation. The application aimed to support quality assurance activities by providing a clear, responsive, and user-friendly interface. In this project, I utilized HTML, CSS, JavaScript, Bootstrap along with Vue.js and Nuxt frameworks to build responsive frontend components. I worked closely with backend developers to integrate APIs, ensure seamless data flow, and maintain optimal application performance. Additionally, I participated in debugging and cross-browser testing to ensure consistent functionality across different devices and environments. During the internship period, I also took part in internal training sessions organized by DDB Telkom, covering topics such as software development practices and project management using Agile methodologies. These experiences provided valuable insights into digital operation & assurance processes, strengthened my technical foundation, and enhanced my understanding of teamwork and professional workflows within a large-scale telecommunications company.',
    responsibilities: [
      'Translated designs into responsive and attractive user interfaces using Bootstrap, Vue.js and Nuxt.js.',
      'Worked closely with backend developers to integrate APIs, improving data exchange and application functionality',
      'Developed interactive user interfaces to improve user experience',
      'Participated in sprint planning and agile development processes',
      'Developed API requirements documentation',
      'Participated in bug testing and fixing',
      'Collaborated with cross-functional teams including designers and product managers',
    ],
    achievements: [
      'Translated designs into responsive and attractive user interfaces using Bootstrap, Vue.js and Nuxt.js',
      'Worked closely with the backend developers to integrate APIs, improving data exchange and application functionality.',
      'Developing interactive user interfaces, improving user experience and increasing customer satisfaction by 20%.',
      'Successfully completed the development of 13 features over 11 sprints.',
      'Developed APIs requirements and participated in bug testing and fixing.',
    ],
    keyAchievements: [
      'Increased customer satisfaction by 20% through improved user interfaces',
      'Successfully completed 13 features across 11 sprints',
      'Improved data exchange efficiency through better API integration',
      'Contributed to multiple production-ready applications',
      'Gained experience in enterprise-level frontend development',
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'JavaScript', 'RESTful API', 'CSS', 'HTML', 'Bootstrap'],
    challenges: [
      {
        challenge: 'As a Frontend Developer Intern, one of the main challenges was adapting to a fast-paced Agile working environment with two-week sprint cycles. As this was the beginning of my professional career, I needed to quickly understand the existing codebase, development workflow, and technologies such as Vue.js and Nuxt while still delivering features within tight deadlines.',
        solution: 'To overcome these challenges, I adopted a proactive learning approach by studying documentation, reviewing existing code, and seeking guidance from senior developers through discussions and code reviews. I broke down tasks into smaller, manageable components to ensure steady progress and reduce the risk of missing sprint deadlines.',
      },
      {
        challenge: 'Another challenge was handling frequent requirement changes during sprint execution. Product needs and priorities could evolve based on feedback from stakeholders, requiring rapid adjustments to UI components and application flow. Balancing the need to learn deeply while maintaining productivity and meeting sprint targets was a significant challenge.',
        solution: 'I also embraced Agile principles by staying flexible and responsive to changes, regularly communicating progress and blockers during daily stand-ups, and quickly iterating on feedback. By continuously improving my understanding of the technologies used and aligning my work with sprint goals, I was able to adapt efficiently to the development process and consistently deliver frontend features on time.',
      },
    ],
    links: [
      { label: 'Internship Experience', url: 'https://www.linkedin.com/posts/azhrul-azim-ripai_hello-everyone-i-am-excited-to-share-activity-7217493145565978624-QySw?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfnNE8BLp3h6SKlx6HnGsdHFTJONUE0jRw' },
    ],
  },
];

