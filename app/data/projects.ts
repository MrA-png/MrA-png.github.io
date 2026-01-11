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
    id: 'isyara-multimodal-sign-language-translation',
    title: 'ISYARA - Multimodal Sign Language Translation System',
    tagline: 'Web-based multimodal translation system that converts audio, text, and video inputs into Indonesian Sign Language (BISINDO) gestures using speech recognition, NLP, and gesture rendering to support inclusive communication.',
    role: 'Fullstack Developer & Researcher',
    startDate: '1 Januari 2024',
    endDate: '15 Januari 2025',
    background: 'ISYARA is a research project developed as part of academic research to address communication accessibility challenges for individuals with hearing impairments in Indonesia. The project aims to develop a web-based multimodal translation platform that converts Indonesian audio, text, and video inputs into BISINDO (Bahasa Isyarat Indonesia) gestures. According to the World Health Organization, more than 5% of the global population (approximately 466 million people) have hearing loss, and in Indonesia, people with disabilities still face systemic barriers in education, health services, and access to information. This system serves as both a communication aid and an interactive learning platform for individuals interested in acquiring BISINDO skills.',
    problem: 'People with hearing impairments in Indonesia face significant challenges in accessing information due to limited sign language interpreter availability and the lack of contextual and interactive learning platforms. Traditional communication methods rely heavily on spoken language in audio and video formats, creating barriers for individuals with hearing loss. There is a lack of integrated, real-time web-based systems that can process multimodal audio, text, and video inputs to generate sign language in the Indonesian context. Existing solutions are either single-modal, lack contextual processing, or have language limitations that prevent effective use for BISINDO.',
    challenges: [
      {
        challenge: 'Implementing a comprehensive NLP pipeline that accurately processes Indonesian text and maps it to BISINDO gesture videos. The system needed to handle tokenization, normalization, stemming using Sastrawi, and map processed tokens to corresponding sign language gesture videos stored in Supabase. Additionally, the system required synonym handling and fallback mechanisms for unknown words using fingerspelling.',
        solution: 'Developed a four-stage NLP architecture: Recognition/Conversion (processing multimodal inputs and transcribing audio/video using ASR), Segmentation and Parsing (applying preprocessing tasks including tokenization, lowercasing, normalization, and stemming), Matching (comparing tokens with gesture database entries, performing synonym lookups, and using fingerspelling fallback), and Processing (compiling matched gesture videos in order based on original sentence structure). Implemented Sastrawi for Indonesian language stemming and created a synonym table to extend vocabulary coverage without duplicating media assets.',
      },
      {
        challenge: 'Integrating multiple input modalities (audio, text, video) into a unified translation system. The system needed to handle speech recognition from audio files, extract audio from video files using MoviePy, transcribe speech using Google Cloud Speech-to-Text API, and process text inputs directly. Each modality required different preprocessing steps before entering the NLP pipeline.',
        solution: 'Built a modular architecture using React-Flask that separates input processing by modality. For audio and video inputs, implemented audio extraction using MoviePy, applied noise filtering (high-pass and low-pass filters), and used Google Cloud Speech-to-Text API for transcription. Text inputs bypass the recognition stage and go directly to the NLP pipeline. Created unified API endpoints that handle all input types and route them to appropriate processing modules, ensuring consistent output format regardless of input modality.',
      },
      {
        challenge: 'Building and managing a comprehensive gesture dataset with efficient storage and retrieval. The system required a curated dataset of 393 entries including word-level BISINDO gestures (206 clips), alphabet gestures (26 clips), and composite letter sequences (161 clips). All video files needed to be stored efficiently in Supabase Storage with organized path schemes for fast retrieval during translation.',
        solution: 'Collected word-level BISINDO gestures from publicly available tutorial videos on YouTube, created consistent 3D animations for alphabet gestures, and implemented automatic generation of composite letter sequences for spelling new or unseen words. Organized all video files in Supabase Storage under a structured path scheme that maximizes reuse and reduces redundancy. Implemented gesture caching mechanism that significantly improves performance on repeated inputs, reducing processing time from 71 seconds to 1 second for text-to-sign translation and from 14-19 minutes to 2-4 minutes for video translation.',
      },
      {
        challenge: 'Achieving high accuracy in speech transcription and gesture translation while maintaining acceptable processing times. The system needed to achieve high word-level accuracy in speech transcription and accurate gesture mapping, especially for first-time inputs where gestures might not be cached.',
        solution: 'Implemented Google Cloud Speech-to-Text API with audio preprocessing (noise filtering) to achieve 95.1% word-level accuracy with 3.68% WER and 2.06% CER. For gesture translation, implemented a comprehensive matching system with synonym lookup and fingerspelling fallback, achieving 77.27% F1-score on first-time inputs and 100% accuracy on repeated tests. The gesture caching system ensures that once gestures are processed, subsequent translations are nearly instantaneous, dramatically improving user experience for repeated content.',
      },
    ],
    contributions: [
      'Developed complete web-based multimodal translation system using React.js and Flask',
      'Implemented comprehensive NLP pipeline with four sequential stages (Recognition, Segmentation, Matching, Processing)',
      'Integrated Google Cloud Speech-to-Text API for accurate audio transcription (95.1% accuracy)',
      'Built audio extraction system using MoviePy for processing video inputs',
      'Created gesture matching system with synonym handling and fingerspelling fallback mechanism',
      'Designed and implemented Supabase database schema for gesture storage and management',
      'Developed gesture caching system that improves performance from 71 seconds to 1 second for repeated inputs',
      'Built responsive React.js frontend with support for multiple input modes (video upload, text input, voice input)',
      'Implemented RESTful API architecture for seamless frontend-backend communication',
      'Created comprehensive gesture dataset with 393 entries (word-level, alphabet, composite sequences)',
      'Achieved 100% accuracy on repeated tests through efficient gesture caching',
      'Published research paper in IEEE Xplore documenting system architecture and experimental results',
    ],
    technologies: ['React.js', 'Flask', 'Python', 'JavaScript', 'Supabase', 'PostgreSQL', 'RESTful API', 'NLP', 'Sastrawi', 'MoviePy', 'Google Cloud Speech-to-Text'],
    tools: ['GIT', 'Postman', 'Supabase CLI'],
    services: ['Supabase', 'Supabase Storage', 'Google Cloud Speech-to-Text API'],
    projectType: 'Personal',
    teamSize: 1,
    result: 'Successfully developed a multimodal translation system achieving 95.1% speech transcription accuracy, 77.27% F1-score on first-time text inputs, and 100% accuracy on repeated tests. The system significantly improves processing time through gesture caching (from 71 seconds to 1 second for text, and from 14-19 minutes to 2-4 minutes for video). The research was published in IEEE Xplore, contributing to accessibility technology for the Deaf community in Indonesia.',
    impact: [
      'Achieved 95.1% word-level accuracy in speech transcription with 3.68% WER',
      'Improved text-to-sign translation from 77.27% F1-score (first-time) to 100% accuracy (repeated)',
      'Reduced processing time from 71 seconds to 1 second for repeated text inputs',
      'Reduced video translation time from 14-19 minutes to 2-4 minutes through gesture caching',
      'Published research paper in IEEE Xplore (Document ID: 11161638)',
      'Created comprehensive gesture dataset with 393 entries supporting BISINDO translation',
      'Developed system serving as both communication aid and interactive learning platform',
      'Contributed to accessibility technology for Deaf community in Indonesia',
    ],
    links: [
      { label: 'IEEE Xplore Paper', url: 'https://ieeexplore.ieee.org/document/11161638' },
    ],
    category: 'Fullstack',
    images: [
      '/assets/images/articles/isyara/tampilan-1.png',
      '/assets/images/articles/isyara/tampilan-2.png',
      '/assets/images/articles/isyara/desain-sistem.png',
      '/assets/images/articles/isyara/Arsitektur-NLP.png',
      '/assets/images/articles/isyara/poster.png',
    ],
  },
  {
    id: 'invaderzone-frontend',
    title: 'Invaderzone Frontend Development',
    tagline: 'Rapid frontend development for WhatsApp Stresser & Tracker dashboard platforms with AI-assisted development, delivering two production-ready websites in 3 days.',
    role: 'Front End Developer',
    startDate: '1 Desember 2025',
    endDate: '3 Desember 2025',
    background: 'Invaderzone is a web application project under PT Siber Integrasi Teknologi, focused on developing web-based tools and platforms. This project involved creating frontend interfaces for two separate platforms: breach.invaderzone.com (a WhatsApp stresser dashboard) and tracker.invaderzone.com (a WhatsApp tracker dashboard), along with the main invaderzone.com platform. The project required rapid development within an extremely tight 3-day deadline while maintaining high code quality, security standards, and user experience. The solution was initially developed as a unified codebase and later split into two separate platforms.',
    problem: 'The client needed two fully functional frontend dashboards (breach.invaderzone.com and tracker.invaderzone.com) to be developed within a very tight 3-day deadline. Both platforms required responsive, user-friendly interfaces with secure authentication, smooth API integration, and pixel-perfect implementation of design specifications. The challenge was to deliver production-ready frontend solutions for both websites simultaneously while ensuring the codebase could be easily separated into two distinct platforms after development. Traditional development approaches would not meet the aggressive timeline, requiring innovative solutions to accelerate development velocity without compromising code quality.',
    challenges: [
      {
        challenge: 'Developing frontend interfaces for two separate websites within an extremely tight 3-day deadline while maintaining code quality and user experience standards. The project required performing UI slicing from design into responsive and reusable frontend components for both platforms, integrating with backend APIs, and ensuring secure authentication and smooth data flow. Additionally, the solution needed to be structured in a way that could be split into two separate platforms after development.',
        solution: 'Leveraged Cursor Pro (AI-assisted development) to accelerate development velocity while maintaining code quality. Adopted a systematic approach to UI slicing, breaking down designs into reusable component architecture that could be shared and adapted for both platforms. Implemented secure authentication patterns and API integration best practices from the start, ensuring consistency across both websites. Used responsive design principles and component reusability to speed up development. Structured the codebase with modular architecture that allowed for easy separation into two distinct platforms. Maintained constant communication with backend teams to ensure API contracts were clear and integration was seamless. Focused on delivering core functionality first, then refined details, ensuring both platforms met design and functionality requirements within the tight deadline.',
      },
      {
        challenge: 'Ensuring code architecture supports easy separation into two distinct platforms after development. The unified codebase needed to be modular enough to allow clean separation without major refactoring, while still maintaining code reusability during the initial development phase.',
        solution: 'Designed a modular component architecture with clear separation of concerns. Created shared components and utilities that could be easily duplicated or split when separating the platforms. Used feature-based folder structure that made it straightforward to identify and extract platform-specific code. Implemented configuration-based approach for platform-specific features, allowing easy customization without code duplication. This architecture enabled smooth separation of the codebase into two independent platforms after development completion.',
      },
      {
        challenge: 'Maintaining pixel-perfect implementation of design specifications while working at high velocity. The tight deadline required rapid development, but the client expected exact implementation of design mockups with responsive behavior across all device sizes.',
        solution: 'Used Tailwind CSS for rapid styling with design system consistency. Leveraged AI-assisted development tools to generate boilerplate code and component structures quickly, allowing more time for fine-tuning and pixel-perfect adjustments. Implemented responsive design patterns from the start rather than retrofitting, ensuring all components worked correctly across breakpoints. Created reusable design tokens and utility classes that maintained design consistency across both platforms. Performed iterative design reviews during development to catch and fix discrepancies early.',
      },
    ],
    contributions: [
      'Developed complete frontend interfaces for two websites (breach.invaderzone.com and tracker.invaderzone.com) within 3 days',
      'Performed UI slicing from design into responsive and reusable frontend components for both platforms',
      'Integrated frontend features with backend APIs, ensuring secure authentication and smooth data flow',
      'Implemented responsive design ensuring optimal user experience across all device sizes',
      'Structured codebase with modular architecture enabling easy separation into two distinct platforms',
      'Leveraged AI-assisted development tools (Cursor Pro) for high-velocity coding while maintaining quality',
      'Ensured pixel-perfect implementation of design specifications',
      'Delivered production-ready frontend solutions that were successfully split into separate platforms',
    ],
    technologies: ['JavaScript', 'Vue.js', 'Nuxt', 'CSS', 'Tailwind CSS', 'RESTful API', 'GIT'],
    tools: ['Cursor Pro', 'GIT', 'Postman'],
    services: [],
    company: 'PT Siber Integrasi Teknologi',
    projectType: 'Client',
    teamSize: 2,
    result: 'Successfully delivered complete frontend solutions for two production-ready websites (breach.invaderzone.com and tracker.invaderzone.com) within the 3-day deadline. Both platforms feature responsive, user-friendly interfaces with secure authentication and seamless API integration. The modular codebase architecture allowed for smooth separation into two independent platforms after development completion.',
    impact: [
      'Delivered two production-ready frontend platforms within extremely tight 3-day deadline',
      'Successfully implemented responsive and reusable frontend components for both platforms',
      'Ensured secure authentication and seamless API integration across both websites',
      'Demonstrated high-velocity development capabilities using AI-assisted tools',
      'Created modular architecture that enabled easy platform separation',
    ],
    links: [
      { label: 'Breach Invaderzone', url: 'https://breach.invaderzone.com' },
      { label: 'Tracker Invaderzone', url: 'https://tracker.invaderzone.com' },
      { label: 'Invaderzone', url: 'https://invaderzone.com' },
      { label: 'UI Design', url: 'https://www.figma.com/design/jsVS173GYPlwwXfTMB8oz1/Chowder-Invader_Dashboard_2025--Copy-?node-id=2-5&t=3G7jYZ7CELiya4DJ-1' },
    ],
    category: 'Frontend',
    images: [
      '/assets/images/experiences/invaderzone/image-1.png',
      '/assets/images/experiences/invaderzone/image-2.png',
    ],
  },
  {
    id: 'agares-frontend',
    title: 'Agares Frontend Development',
    tagline: 'Rapid 24-hour frontend development implementing UI designs into responsive web components using Vue.js and Bootstrap, delivered by a 2-person frontend team.',
    role: 'Front End Developer',
    startDate: '8 April 2025',
    endDate: '9 April 2025',
    background: 'Agares is a web application project under PT Siber Integrasi Teknologi, focused on delivering innovative web applications and platforms. This project required rapid frontend development within an extremely tight 24-hour deadline. I worked as part of a 2-person frontend development team to implement UI designs into fully responsive and interactive web components. The project utilized modern frontend technologies including Vue.js, Bootstrap, and custom CSS to create a seamless user experience while ensuring smooth API integration with backend services.',
    problem: 'The client needed a complete frontend solution to be developed within an extremely tight 24-hour deadline. The project required implementing UI designs into responsive web components that work seamlessly across all device sizes, while also ensuring smooth API integration with backend services. Traditional development approaches would not meet the aggressive timeline, requiring efficient workflow, clear team coordination, and rapid problem-solving. The challenge was to deliver a production-ready frontend solution that maintains code quality, design accuracy, and optimal user experience despite the compressed timeline.',
    challenges: [
      {
        challenge: 'Completing frontend development work within an extremely tight 24-hour deadline while working as part of a 2-person frontend team. The project required implementing UI designs into responsive web components using Vue.js, Bootstrap, and custom CSS, while also ensuring smooth API integration with backend teams and maintaining optimal user experience. The short timeframe demanded efficient workflow, clear communication, and rapid problem-solving.',
        solution: 'Adopted an agile and efficient workflow by dividing tasks between team members and prioritizing critical components first. Used Vue.js component-based architecture and Bootstrap framework to speed up development while maintaining code quality. Maintained constant communication with backend teams to ensure API contracts were clear and integration points were well-defined. Implemented responsive design patterns and custom CSS efficiently to meet design requirements. Focused on delivering core functionality first, then refined details, ensuring the final product met both design and functionality standards within the tight deadline.',
      },
      {
        challenge: 'Coordinating work between two frontend developers within a 24-hour timeframe while maintaining code consistency and avoiding conflicts. Both developers needed to work efficiently without stepping on each other\'s work or creating integration issues.',
        solution: 'Established clear task division and component ownership from the start. Used version control (GIT) effectively to manage parallel development and minimize conflicts. Created a shared component library and design system that both developers could reference, ensuring visual and functional consistency. Maintained regular communication checkpoints to sync progress and address any integration issues immediately. This approach allowed both developers to work efficiently in parallel while maintaining code quality and consistency.',
      },
      {
        challenge: 'Ensuring responsive design implementation across all device sizes within the tight deadline. The UI designs needed to be accurately translated into responsive components that work seamlessly on desktop, tablet, and mobile devices.',
        solution: 'Leveraged Bootstrap\'s responsive grid system and utility classes to accelerate responsive design implementation. Used Vue.js component architecture to create reusable responsive components that could be quickly adapted for different screen sizes. Implemented mobile-first design approach, starting with mobile layouts and progressively enhancing for larger screens. This strategy ensured responsive behavior was built-in from the start rather than retrofitted, saving time while maintaining design accuracy.',
      },
    ],
    contributions: [
      'Implemented UI designs into responsive web components using Vue.js, Bootstrap, and custom CSS',
      'Completed frontend development work in 24 hours as part of a 2-person frontend development team',
      'Collaborated closely with backend teams to ensure smooth API integration and optimized user experience',
      'Created responsive and interactive user interface components',
      'Ensured pixel-perfect implementation of design specifications',
      'Delivered production-ready frontend solution within the 24-hour deadline',
      'Maintained code quality and consistency while working in a fast-paced environment',
      'Coordinated effectively with team members to avoid conflicts and ensure seamless integration',
    ],
    technologies: ['Vue.js', 'Nuxt', 'Bootstrap', 'Tailwind CSS', 'CSS', 'JavaScript', 'HTML', 'RESTful API', 'GIT'],
    tools: ['GIT', 'Postman'],
    services: [],
    company: 'PT Siber Integrasi Teknologi',
    projectType: 'Client',
    teamSize: 2,
    result: 'Successfully delivered a complete, production-ready frontend solution within the 24-hour deadline. The application features fully responsive web components that accurately implement the UI designs, seamless API integration with backend services, and optimized user experience across all device sizes. The project was completed by a 2-person frontend team working efficiently in parallel, demonstrating strong collaboration and rapid development capabilities.',
    impact: [
      'Delivered complete frontend solution within extremely tight 24-hour deadline',
      'Successfully implemented responsive web components using Vue.js and Bootstrap',
      'Ensured seamless API integration with backend teams',
      'Delivered optimized user experience despite compressed timeline',
      'Demonstrated effective team coordination and rapid development capabilities',
    ],
    links: [
      { label: 'Agares', url: 'https://agares-web-nine.vercel.app' },
    ],
    category: 'Frontend',
    images: [
      '/assets/images/experiences/agares/image-1.png',
      '/assets/images/experiences/agares/image-2.png',
    ],
  },
  {
    id: 'insightops-frontend',
    title: 'InsightOps OSINT Platform',
    tagline: 'Frontend development for OSINT investigative platform enabling law enforcement agencies to search and gather information about individuals, completed 6 features and 9 sub-menus with comprehensive API integration.',
    role: 'Front End Developer',
    startDate: '18 Oktober 2024',
    endDate: '11 November 2024',
    background: 'InsightOps is an OSINT (Open Source Intelligence) web application project under PT Siber Integrasi Teknologi, designed to help law enforcement agencies search and gather information about individuals for investigative purposes. This project required developing a web platform that efficiently displays and searches through potentially sensitive investigative data while maintaining a user-friendly experience for law enforcement investigators. The platform needed to support complex search queries and data visualization for various types of OSINT information including personal information, social media data, and contact information.',
    problem: 'Law enforcement agencies needed an efficient and secure platform to search and gather OSINT (Open Source Intelligence) data about individuals for investigative purposes. The existing manual processes were time-consuming and lacked the ability to efficiently aggregate and visualize data from multiple sources. Investigators required a user-friendly interface that could handle complex search queries, filter results effectively, and present OSINT information in a clear and actionable format. Additionally, the platform needed to balance usability with security and privacy considerations, ensuring sensitive investigative data was handled appropriately while maintaining efficient workflows for investigators.',
    challenges: [
      {
        challenge: 'Developing a frontend interface for an OSINT investigative platform that requires balancing usability with security and privacy considerations while handling complex data from multiple sources. The platform needed to efficiently display and search through potentially sensitive investigative data while maintaining a user-friendly experience for law enforcement investigators. Additionally, the interface needed to support complex search queries and data visualization for various types of OSINT information (personal information, social media data, contact information, etc.), requiring effective data presentation and visualization strategies that allow investigators to quickly understand and analyze information from various data sources.',
        solution: 'Designed a clean and intuitive interface that prioritizes data clarity and search efficiency. Implemented robust search and filtering functionality that allows investigators to quickly narrow down results. Created modular data visualization components that can handle different types of OSINT data, presenting information in a structured and easy-to-analyze format. Implemented clear data hierarchy and organization to help investigators quickly identify relevant information. Used responsive design principles to ensure the interface works effectively across different devices. Designed data cards and tables that present information in a scannable format, making it easy for investigators to process large amounts of data efficiently. Ensured all frontend interactions follow security best practices and maintain data privacy. Collaborated closely with backend teams to ensure secure API integration and proper data handling. Focused on creating an interface that supports investigative workflows while maintaining professional standards suitable for law enforcement use.',
      },
      {
        challenge: 'Coordinating frontend development within a 3-person team (2 frontend developers and 1 backend developer) to complete 6 major features and 9 sub-menus within the project timeline. The team needed to work efficiently in parallel while ensuring code consistency, avoiding conflicts, and maintaining seamless API integration.',
        solution: 'Established clear task division and feature ownership from the start. Used version control (GIT) effectively to manage parallel development and minimize conflicts. Created a shared component library and design system that both frontend developers could reference, ensuring visual and functional consistency. Maintained regular communication checkpoints with the backend developer to sync progress and address any API integration issues immediately. Implemented modular component architecture that allowed both frontend developers to work on different features simultaneously without stepping on each other\'s work. This approach enabled efficient parallel development while maintaining code quality and consistency across all 6 features and 9 sub-menus.',
      },
    ],
    contributions: [
      'Developed responsive frontend interfaces for OSINT web application using Vue.js, Nuxt, and Tailwind CSS',
      'Completed 6 major features and 9 sub-menus as part of a 3-person development team (2 frontend, 1 backend)',
      'Implemented search and filtering functionality for investigative data queries',
      'Created data visualization components to display OSINT search results effectively',
      'Integrated frontend with backend APIs, ensuring seamless data flow and API connectivity',
      'Ensured secure and privacy-conscious frontend implementation for law enforcement use',
      'Collaborated closely with backend developer and other frontend developer to coordinate feature development',
      'Optimized user experience for investigative workflows and data analysis',
    ],
    technologies: ['JavaScript', 'Vue.js', 'Nuxt', 'CSS', 'Tailwind CSS', 'HTML', 'RESTful API', 'GIT'],
    tools: ['Postman', 'GIT'],
    services: [],
    company: 'PT Siber Integrasi Teknologi',
    projectType: 'Client',
    teamSize: 3,
    result: 'Successfully delivered a complete frontend solution for InsightOps OSINT investigative platform, completing 6 major features and 9 sub-menus within the project timeline. The platform features responsive and user-friendly interfaces that allow investigators to efficiently search, filter, and visualize OSINT data. All features were successfully integrated with backend APIs, ensuring seamless data connectivity. The frontend implementation maintains security and privacy standards suitable for law enforcement use, supporting effective investigative workflows.',
    impact: [
      'Successfully completed 6 major features and 9 sub-menus for OSINT investigative platform',
      'Delivered production-ready frontend solution within project timeline as part of a 3-person team',
      'Enabled efficient OSINT data search and visualization for law enforcement investigators',
      'Ensured secure frontend implementation suitable for sensitive investigative data',
      'Successfully integrated frontend with backend APIs, ensuring seamless data connectivity',
    ],
    links: [
      { label: 'InsightOps', url: 'https://insightops.xyz/login' },
      { label: 'UI Design', url: 'https://www.figma.com/design/ktHIapHzgdzNSMATWkPiJh/Mendtel?node-id=0-1&t=AiuSjAZ0GKg9cEE6-1' },
    ],
    category: 'Frontend',
    images: [
      '/assets/images/experiences/insightops/image-1.png',
      '/assets/images/experiences/insightops/image-2.png',
    ],
  },
  {
    id: 'isitasi-journal-ranking',
    title: 'Isitasi.com - Journal Ranking Platform',
    tagline: 'Journal ranking and citation services platform with comprehensive UI/UX design for landing page, admin dashboard, and user dashboard to help researchers track and analyze publication metrics.',
    role: 'UI/UX & Front End Developer',
    startDate: '1 Oktober 2024',
    endDate: '31 Januari 2025',
    background: 'Isitasi.com is a platform providing journal ranking and citation services under PT Pubmedia Digital Sains, a digital company focused on developing innovative solutions for academic and research communities. The platform helps researchers and academic institutions track and analyze publication metrics, combining data analytics with user-friendly interfaces to deliver valuable insights. The project required designing and developing comprehensive user interfaces for multiple sections of the platform, ensuring seamless integration between front-end and back-end systems while maintaining high standards for user experience and functionality.',
    problem: 'Academic researchers and institutions need a comprehensive platform to track and analyze journal rankings and citation metrics. The platform required multiple dashboard types (landing page, admin dashboard, and user dashboard) with different user needs and technical expertise levels. Each interface needed to be intuitive, responsive, and user-friendly while maintaining consistency across the platform. Additionally, the system required 100% API integration success without errors during development, ensuring seamless functionality between front-end and back-end systems. The journal ranking menu needed to be accessible and understandable for users with varying levels of technical knowledge.',
    challenges: [
      {
        challenge: 'Designing UI/UX for multiple dashboard types (landing page, admin, and user dashboard) while maintaining consistency and ensuring each interface meets its specific user needs. The journal ranking menu needed to be intuitive for different user roles with varying levels of technical expertise, requiring careful consideration of user personas and role-based requirements.',
        solution: 'Conducted thorough user research and collaborated closely with the Product Owner to understand user personas and requirements for each dashboard type. Created a design system with consistent components and patterns while customizing interfaces to meet specific role-based needs. Used iterative design and validation processes to ensure usability across all user types. Maintained regular collaboration with PO to discuss feature prioritization and validate UI/UX designs based on business requirements and user needs.',
      },
      {
        challenge: 'Ensuring 100% API integration success without errors during development phase. The project required careful coordination between front-end and back-end teams, proper error handling, and thorough testing of all integration points to ensure seamless functionality across all platform sections.',
        solution: 'Established clear API contracts and documentation early in the development process. Implemented comprehensive error handling and validation on the front-end side, and conducted rigorous testing of all API endpoints during development, including edge cases and error scenarios. Maintained constant communication with the back-end team to address integration issues immediately, ensuring seamless functionality across all platform sections. Achieved 100% API integration success rate with zero errors during development phase.',
      },
    ],
    contributions: [
      'Created comprehensive UI/UX design for journal ranking menu on landing page, admin dashboard, and user dashboard',
      'Developed interactive, responsive, and user-friendly web views using HTML, CSS, JavaScript, and Laravel V10',
      'Ensured 100% API integration between front-end and back-end without errors during development phase',
      'Designed consistent design system with reusable components across all dashboard types',
      'Collaborated with Product Owner to discuss feature prioritization and validate UI/UX designs',
      'Implemented responsive design ensuring optimal user experience across all device sizes',
      'Created intuitive interfaces for users with varying levels of technical expertise',
      'Maintained design consistency while customizing interfaces for specific user roles',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel V10', 'Bootstrap', 'RESTful API', 'GIT'],
    tools: ['GIT', 'Figma', 'Postman'],
    services: ['Web Development', 'UI/UX Design', 'Frontend Development'],
    projectType: 'Client',
    company: 'PT Pubmedia Digital Sains',
    result: 'Successfully designed and developed comprehensive UI/UX for Isitasi.com platform with multiple dashboard types (landing page, admin dashboard, and user dashboard). Achieved 100% API integration success rate with zero errors during development phase. Delivered responsive, interactive, and user-friendly web interfaces that help researchers and academic institutions track and analyze journal rankings and citation metrics effectively.',
    impact: [
      'Provided comprehensive journal ranking and citation services platform for researchers',
      'Enabled academic institutions to track and analyze publication metrics effectively',
      'Delivered intuitive interfaces for users with varying technical expertise levels',
      'Achieved 100% error-free API integration ensuring seamless functionality',
      'Created consistent design system improving user experience across all platform sections',
      'Supported academic ecosystem with valuable insights for researchers and institutions',
    ],
    links: [
      { label: 'Isitasi.com', url: 'https://isitasi.com' },
      { label: 'UI Design', url: 'https://www.figma.com/design/DxOj23V8GjVdjJqqXQ9BSm/Isitasi?node-id=42-1021&t=DKQvgHoeSilyKwtD-1' },
    ],
    category: 'Frontend',
    images: [
      '/assets/images/projects/isitasi/image-1.png',
      '/assets/images/projects/isitasi/image-2.png',
      '/assets/images/projects/isitasi/image-3.png',
    ],
  },
  {
    id: 'doi-pubmedia',
    title: 'DOI Pubmedia - Digital Object Identifier Registration Platform',
    tagline: 'Comprehensive DOI registration platform for journals, conferences, and books, enabling institutions to join Crossref membership through Pubmedia with cost-effective pricing and comprehensive support services.',
    role: 'Fullstack Developer',
    startDate: '1 Juli 2025',
    endDate: '30 Agustus 2025',
    background: 'DOI Pubmedia (https://doi.pubmedia.co.id) is a Digital Object Identifier (DOI) registration platform under PT Pubmedia Digital Sains, enabling institutions to join Crossref membership through Pubmedia. The platform provides easier access to DOI services with cost-effective pricing (IDR 750,000 per year membership fee, no deposit required) and comprehensive support for setting and activating DOI for journals, conferences, and books. The platform serves various types of institutions including publishing companies, universities, societies, foundations, and other organizations, with 137+ active members. The system includes online payment processing through Duitku payment gateway, automatic invoicing system for membership renewals, article-level payment processing for registered journals, member management, DOI registration workflow, and comprehensive administrative features.',
    problem: 'Academic institutions, publishing companies, universities, societies, and foundations need a streamlined platform to register DOI for their journals, conferences, and books. Traditional DOI registration processes through Crossref can be complex and expensive. Institutions require a cost-effective solution with comprehensive support, easy account access, and simplified registration workflow. The platform needed to handle various institution types, manage membership subscriptions with automatic invoicing when due dates are reached, process online payments through Duitku payment gateway for both membership fees and article-level payments, and provide comprehensive IT support for DOI setting and activation. Additionally, the system needed to track active members, manage DOI registrations with article-level fees (USD $1 per article via Crossref + Rp1,000 local service fee), handle automatic billing for membership renewals, process article payments for registered journals, and provide user-friendly interfaces for both institutions and administrators.',
    challenges: [
      {
        challenge: 'Integrating Duitku payment gateway for comprehensive payment processing system supporting multiple payment scenarios: annual membership subscription fees (IDR 750,000 per year), automatic invoicing when membership due dates are reached, and article-level payment processing for articles within registered journals (USD $1 + Rp1,000 per article). The system needed to handle secure payment processing with proper transaction tracking, automatic invoice generation and email notifications when membership expiration dates are reached, article payment management for registered journals, payment reconciliation that automatically updates membership and article registration status, and comprehensive error handling for failed transactions. Additionally, the platform required seamless integration between payment gateway, membership management, DOI registration workflow, and article management systems.',
        solution: 'Integrated Duitku payment gateway API with comprehensive payment processing system supporting multiple payment methods. Implemented automatic invoicing system with scheduled tasks that monitor membership expiration dates daily, automatically generating invoices when due dates are reached and sending email notifications to members with payment links. Built article payment processing system that tracks articles within registered journals, calculates fees per article (USD $1 + Rp1,000), and processes payments through Duitku integration. Created payment reconciliation system that automatically updates membership status and article registration status upon successful payment. Implemented comprehensive transaction tracking with payment status monitoring, receipt generation, and automated confirmation emails. Developed payment calculation logic handling both membership fees and article-level fees with proper currency conversion. Built proper error handling and retry mechanisms for failed transactions, ensuring reliable payment processing. Created seamless integration between Duitku payment gateway, membership management system, DOI registration workflow, and article management, ensuring all systems work together cohesively.',
      },
    ],
    contributions: [
      'Developed comprehensive DOI registration platform with Crossref API integration',
      'Built membership and subscription management system supporting multiple institution types',
      'Integrated Duitku payment gateway for secure online payment processing',
      'Implemented automatic invoicing system that generates and sends invoices when membership due dates are reached',
      'Created article-level payment processing system for articles within registered journals',
      'Developed payment calculation system handling membership fees (IDR 750,000/year) and article fees (USD $1 + Rp1,000 per article)',
      'Built automated membership renewal tracking and expiration monitoring system',
      'Created DOI registration workflow for journals, conferences, and books',
      'Developed comprehensive admin dashboard for member management, payment tracking, and platform oversight',
      'Built user portal for institutions to manage accounts, register DOIs, track payments, and pay for articles',
      'Implemented IT support ticket system for comprehensive customer support',
      'Designed and developed responsive user interfaces ensuring optimal experience across devices',
      'Created transaction tracking and receipt generation system with automated email notifications',
      'Implemented payment reconciliation system that updates membership and article status automatically',
      'Built invoice management system with payment reminders and grace period handling',
      'Successfully deployed platform to production with live domain (doi.pubmedia.co.id)',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'RESTful API', 'Duitku Payment Gateway', 'Crossref API', 'GIT'],
    tools: ['GIT', 'Composer', 'Postman', 'MySQL Workbench'],
    services: ['Web Development', 'Backend Development', 'Duitku Payment Gateway Integration', 'Automatic Invoicing System', 'API Integration', 'DOI Registration Services'],
    projectType: 'Client',
    company: 'PT Pubmedia Digital Sains',
    result: 'Successfully developed and deployed DOI Pubmedia platform (https://doi.pubmedia.co.id), enabling 137+ active members from various institution types (69 publishing companies, 17 universities, 9 societies, 8 foundations) to register DOI for their journals, conferences, and books. The platform provides cost-effective Crossref membership through Pubmedia with IDR 750,000 annual fee (no deposit required), comprehensive IT support, and streamlined DOI registration workflow. The system includes Duitku payment gateway integration for secure online payments, automatic invoicing system that generates and sends invoices when membership due dates are reached, and article-level payment processing for articles within registered journals (USD $1 + Rp1,000 per article).',
    impact: [
      'Enabled 137+ institutions to register DOI through cost-effective Pubmedia membership',
      'Provided streamlined DOI registration process for journals, conferences, and books',
      'Reduced DOI registration costs with IDR 750,000 annual membership (no deposit required)',
      'Supported multiple institution types: publishing companies, universities, societies, foundations',
      'Integrated Duitku payment gateway for secure and convenient online payment processing',
      'Automated membership renewal process with automatic invoicing when due dates are reached',
      'Enabled article-level payment processing for articles within registered journals',
      'Streamlined payment workflow reducing manual invoicing and payment tracking efforts',
      'Provided comprehensive IT support for DOI setting and activation',
      'Simplified Crossref membership process through Pubmedia platform',
      'Enabled transparent fee structure for both membership (IDR 750,000/year) and articles (USD $1 + Rp1,000 per article)',
      'Improved payment processing efficiency with automated reconciliation and status updates',
    ],
    links: [
      { label: 'DOI Pubmedia', url: 'https://doi.pubmedia.co.id' },
      { label: 'UI Design', url: 'https://www.figma.com/design/4bfUSqYdixXb97Fdng3bA5/DOI-Pubmed?node-id=2-6&t=LYGys23eb1g7tGJ6-1' },
    ],
    category: 'Fullstack',
    images: [
      '/assets/images/projects/doi/image-1.png',
      '/assets/images/projects/doi/image-2.png'
    ],
  },
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
      { label: 'UI Design', url: 'https://www.figma.com/design/MFRLQdukQJTVqeqdulrIJA/SCHEDU?node-id=504-781&t=cG0zRf9RPtpQkqdX-1' },
    ],
    category: 'Fullstack',
    images: [
      '/assets/images/projects/schedu/schedu-1.png',
      '/assets/images/projects/schedu/schedu-2.png',
      '/assets/images/projects/schedu/flowchart.png',
      '/assets/images/projects/schedu/flowchart2.png',
      '/assets/images/projects/schedu/usecase.png',
    ],
  },
  {
    id: 'meika-studio',
    title: 'Meika Studio - Campus Incubation Team',
    tagline: 'Software house incubation team providing web development, mobile applications, IoT, AI integration, and n8n automation services.',
    role: 'Front End Developer / Fullstack Developer',
    startDate: '1 Januari 2024',
    endDate: '30 Juni 2024',
    background: 'Meika Studio is a campus incubation team that operates as a software house, providing various technology services to clients. The team was formed as part of a campus incubation program to develop practical skills and real-world experience in software development. Meika Studio accepts projects for web development, mobile applications, IoT (Internet of Things) solutions, AI integration, and automation using n8n. The team works collaboratively to deliver high-quality software solutions while learning and applying industry best practices.',
    problem: 'The campus incubation program needed a practical platform for students to gain real-world experience in software development. Students lacked opportunities to work on actual client projects and apply their theoretical knowledge in a professional setting. Additionally, there was a need for a software house that could provide affordable technology solutions to local businesses and organizations, including web development, mobile applications, IoT solutions, AI integration, and workflow automation. The challenge was to establish a team structure and workflow that could handle diverse project types while maintaining quality and meeting client expectations.',
    challenges: [
      {
        challenge: 'Managing diverse project types (web, mobile, IoT, AI, automation) with varying technical requirements and client needs. Each project type requires different expertise, tools, and approaches. The team needed to be flexible and adaptable to handle web development projects using modern frameworks, mobile app development for iOS and Android, IoT device integration and monitoring, AI model integration, and n8n workflow automation. Coordinating team members with different skill sets and ensuring consistent quality across all project types was challenging.',
        solution: 'Established a modular team structure where team members could specialize in different areas while maintaining cross-functional knowledge. Created project templates and best practices for each project type (web, mobile, IoT, AI, automation). Implemented a project management system to track progress and ensure consistent delivery. Conducted regular knowledge sharing sessions where team members could learn from each other\'s expertise. Used agile methodologies to manage multiple projects simultaneously. Established clear communication channels with clients to understand requirements and provide regular updates. This approach allowed the team to handle diverse projects while maintaining quality and meeting deadlines.',
      },
      {
        challenge: 'Balancing academic responsibilities with incubation team commitments and client project deadlines. Team members needed to manage their time effectively between coursework, team meetings, client projects, and personal development. Client projects often had tight deadlines, while academic assignments also required attention. This created pressure and potential conflicts in scheduling and resource allocation.',
        solution: 'Implemented flexible scheduling that accommodated academic calendars and exam periods. Created clear project timelines with buffer time for unexpected academic commitments. Established a priority system where critical client deadlines were prioritized, but academic responsibilities were also respected. Used project management tools to track progress and identify potential conflicts early. Encouraged open communication about availability and capacity. This approach helped team members balance their commitments effectively while maintaining professional standards for client deliverables.',
      },
      {
        challenge: 'Ensuring quality and professionalism in client deliverables while operating as a student team. Clients expect professional-grade solutions, but the team consisted of students with varying levels of experience. Maintaining consistent code quality, following best practices, and delivering production-ready solutions required careful oversight and mentoring.',
        solution: 'Implemented code review processes where all code changes were reviewed by senior team members before merging. Established coding standards and style guides for each technology stack. Created documentation templates to ensure consistent project documentation. Conducted regular training sessions on best practices, design patterns, and industry standards. Used version control and project management tools to track progress and maintain accountability. Established quality checkpoints before client delivery. This systematic approach ensured that all deliverables met professional standards despite the team being composed of students.',
      },
    ],
    contributions: [
      'Developed frontend interfaces for various web development projects using modern frameworks',
      'Contributed to mobile application development projects for iOS and Android platforms',
      'Assisted in IoT project implementations, including device integration and monitoring dashboards',
      'Participated in AI integration projects, implementing AI models into web and mobile applications',
      'Worked on n8n automation workflows to streamline business processes for clients',
      'Collaborated with team members to deliver high-quality software solutions',
      'Maintained code quality and followed best practices across all project types',
      'Communicated with clients to understand requirements and provide project updates',
    ],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 'React Native', 'Flutter', 'Python', 'n8n', 'RESTful API', 'GIT'],
    tools: ['GIT', 'Postman', 'n8n', 'Docker'],
    services: ['Web Development', 'Mobile Applications', 'IoT Solutions', 'AI Integration', 'n8n Automation'],
    projectType: 'Internal',
    teamSize: 8,
    result: 'Successfully established Meika Studio as a functional software house incubation team that delivered multiple client projects across various technology domains. The team completed web development projects, mobile applications, IoT solutions, AI integrations, and n8n automation workflows, providing valuable real-world experience for team members while serving clients with professional-grade solutions. The incubation program successfully bridged the gap between academic learning and industry practice.',
    impact: [
      'Delivered multiple client projects across web, mobile, IoT, AI, and automation domains',
      'Provided team members with real-world software development experience',
      'Established a sustainable software house model within the campus incubation program',
      'Served local businesses and organizations with affordable technology solutions',
      'Created a platform for students to apply theoretical knowledge in professional settings',
    ],
    links: [
      { label: 'Meika Studio', url: 'https://meikastudio.com' },
      { label: 'UI Design', url: 'https://www.figma.com/design/NcxAMcFkgNVHOMiIAnUxs6/003---landing-page-MEIKA?node-id=0-1&t=7iNTteOcOU6tCC1l-1' },
      { label: 'Repository', url: 'https://github.com/MEIKA-PROJECT/landing-page-meika' },
    ],
    category: 'Fullstack',
    images: [
      '/assets/images/projects/meika/image.png',
    ],
  },
  {
    id: 'partner-sehatin',
    title: 'Partner SEHATin - Health Platform',
    tagline: 'Maternal and child health platform with education, consultation, menstrual calendar calculation, wedding planner, and content articles features to support SDGs 3.1 and 3.2.',
    role: 'Front End Developer / Fullstack Developer',
    startDate: '1 July 2024',
    endDate: '31 December 2024',
    background: 'Partner SEHATin is a learning platform through educational activities, discussions, and consultations in the field of maternal and child health, prepared from adolescence to entering the premarital phase until becoming parents. The platform provides healthy food products integrated with nutritionist consultation services. Partner SEHATin partners with various professional health experts in the field of maternal and child health and is committed to increasing educational capacity through collaborative efforts with various experts. This platform is an implementation to achieve SDGs 3.1 and 3.2 which focus on maternal and child health towards Golden Indonesia 2045.',
    problem: 'Society, especially adolescents and prospective parents, need easy and trusted access to obtain information and education about maternal and child health. Many available health platforms do not provide comprehensive content from the adolescent phase, premarital, to becoming parents. In addition, the need for practical tools such as menstrual calendar calculation and wedding planner integrated with health education is still limited. The platform also needs to provide informative article content that can be accessed anytime, as well as consultation services with professional health experts. Another challenge is integrating healthy food products with nutritionist consultation services in a user-friendly platform.',
    challenges: [
      {
        challenge: 'Developing a platform that encompasses various complex features (landing page/company profile, menstrual calendar calculation, wedding planner, content articles) in a single user-friendly application. Each feature has different technical requirements: menstrual calendar requires accurate cycle calculation, wedding planner requires timeline and checklist management, content articles require a CMS system, and landing page needs to be attractive and informative. Integrating all these features with consistent design and intuitive navigation is a challenge in itself.',
        solution: 'Used modular architecture with reusable components to ensure design consistency. Implemented a clear routing system to separate each feature while maintaining easy navigation. For menstrual calendar, developed an accurate cycle calculation algorithm with options for manual tracking. For wedding planner, created an interactive checklist and timeline system with reminders. For content articles, implemented a simple CMS system with categories and search. Used a consistent design system with UI components that can be used across all features. This ensures a smooth user experience throughout the platform.',
      },
      {
        challenge: 'Integrating consultation services with professional health experts and healthy food products in the platform. The platform needs to provide a consultation booking system, expert schedule management, and integration with healthy food product system. In addition, it needs to ensure that nutritionist consultations can be connected with healthy food product recommendations that match user needs.',
        solution: 'Developed a booking and scheduling system that allows users to choose experts and consultation times. Implemented a schedule management system for experts integrated with calendar. Created a product recommendation system connected with nutritionist consultation results, allowing experts to recommend healthy food products that match user needs. Used a structured database to store consultation history and product recommendations. This creates an integrated experience between consultation and products.',
      },
      {
        challenge: 'Ensuring comprehensive and accurate educational content for various life phases (adolescence, premarital, becoming parents). The platform needs to provide relevant content for each phase with trusted and easy-to-understand information. In addition, it needs to ensure that article content can be easily accessed and has an effective search system.',
        solution: 'Developed a content categorization system based on life phases and health topics. Created a consistent article structure with easy-to-read format. Implemented a search and filter system that allows users to find relevant content easily. Collaborated with health experts to ensure content accuracy. Used a rich text editor to allow experts to update content easily. Added bookmark and favorite features to help users save important articles. This ensures that users can access the information they need easily.',
      },
    ],
    contributions: [
      'Developed landing page and company profile section showcasing Partner SEHATin\'s mission and services',
      'Implemented menstrual calendar calculation feature with accurate cycle tracking and predictions',
      'Created wedding planner feature with interactive timeline, checklist, and reminder functionality',
      'Developed content articles system with CMS, categories, search, and filtering capabilities',
      'Integrated consultation booking system with professional health experts scheduling',
      'Implemented product recommendation system connected with nutritionist consultation results',
      'Designed and developed responsive user interface ensuring optimal experience across all devices',
      'Collaborated with health experts to ensure content accuracy and user-friendly information delivery',
    ],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'CSS', 'Tailwind CSS', 'RESTful API', 'GIT'],
    tools: ['GIT', 'Postman', 'Figma'],
    services: ['Web Development', 'Health Platform', 'E-commerce Integration'],
    projectType: 'Client',
    partner: 'Partner SEHATin',
    result: 'Successfully developed Partner SEHATin platform with comprehensive features including landing page, menstrual calendar calculator, wedding planner, and content articles system. The platform provides easy access to health education, consultation services, and healthy food products, supporting SDGs 3.1 and 3.2 goals. The integrated consultation and product recommendation system creates a seamless user experience, while the educational content covers all life phases from adolescence to parenthood.',
    impact: [
      'Provided accessible platform for maternal and child health education and consultation',
      'Enabled users to track menstrual cycles and plan for reproductive health',
      'Supported wedding planning with health-focused preparation resources',
      'Delivered comprehensive health articles covering all life phases',
      'Integrated consultation services with professional health experts',
      'Connected healthy food products with nutritionist recommendations',
      'Contributed to SDGs 3.1 and 3.2 goals for maternal and child health',
    ],
    links: [
      { label: 'UI Design', url: 'https://www.figma.com/design/6Szu5kRGUzBoF2FKWYznsu/WEB-Partner-Sehatin?node-id=0-1&t=nmh4YKH2cjHwWiih-1' },
      { label: 'Repository', url: 'https://github.com/MrA-png/sehatin-profile-web' },
    ],
    category: 'Fullstack',
    images: [
      '/assets/images/projects/sehatin/image.png',
    ],
  },
];

