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
  images?: string[]; // Array of images for slider
}

export const experiences: ExperienceDetail[] = [
  {
    id: 'frontend-developer-invaderzone',
    title: 'Front End Developer',
    company: 'Invaderzone.com - PT Siber Integrasi Teknologi',
    period: '01 Dec 2025 - 03 Dec 2025',
    location: 'Remote, Indonesia',
    workType: 'Project Based',
    images: [
      '/assets/images/experiences/invaderzone/image-1.png',
      '/assets/images/experiences/invaderzone/image-2.png'
    ],
    companyInfo: 'PT Siber Integrasi Teknologi is a technology integration company that provides digital solutions and services. Invaderzone.com is one of their projects focused on developing web-based tools and platforms. The company specializes in creating scalable and efficient technology solutions for various industries, combining modern development practices with innovative approaches including AI-assisted development tools.',
    projectOverview: 'Worked as a Front End Developer on a project-based contract for Invaderzone.com, a web application project under PT Siber Integrasi Teknologi. This was an intensive 3-day project where I developed frontend interfaces for two websites: breach.invaderzone.com and tracker.invaderzone.com, along with the main invaderzone.com platform. Using a high-velocity vibe coding approach powered by Cursor Pro (AI-assisted development), I performed UI slicing from design into responsive and reusable frontend components, ensuring pixel-perfect implementation of the design specifications. I integrated frontend features with backend APIs, ensuring secure authentication and smooth data flow throughout both applications. Despite the tight 3-day deadline, I successfully delivered complete, production-ready frontend solutions for both websites, which were then split into separate platforms.',
    responsibilities: [
      'Developed frontend interfaces for two websites (breach.invaderzone.com and tracker.invaderzone.com) within 3 days using a high-velocity vibe coding approach powered by Cursor Pro (AI-assisted development)',
      'Performed UI slicing from design into responsive and reusable frontend components for both platforms',
      'Integrated frontend features with backend APIs for both websites, ensuring secure authentication and smooth data flow',
      'Delivered complete frontend solutions that were later split into separate platforms (breach.invaderzone.com and tracker.invaderzone.com)',
    ],
    achievements: [
      'Successfully developed frontend interfaces for two websites (breach.invaderzone.com and tracker.invaderzone.com) within 3 days using AI-assisted development',
      'Performed UI slicing from design into responsive and reusable frontend components for both platforms',
      'Integrated frontend features with backend APIs for both websites, ensuring secure authentication and smooth data flow',
      'Delivered complete frontend solutions that were successfully split into separate platforms',
    ],
    keyAchievements: [
      'Delivered complete frontend solutions for two websites (breach.invaderzone.com and tracker.invaderzone.com) within 3-day deadline using AI-assisted development',
      'Successfully implemented responsive and reusable frontend components for both platforms',
      'Ensured secure authentication and seamless API integration across both websites',
      'Leveraged AI-assisted development tools for high-velocity coding, enabling rapid development of multiple platforms',
    ],
    technologies: ['JavaScript', 'Vue', 'Nuxt', 'CSS', 'Tailwind CSS', 'RESTful API', 'GIT', 'Cursor Pro'],
    challenges: [
      {
        challenge: 'Developing frontend interfaces for two separate websites (breach.invaderzone.com and tracker.invaderzone.com) within an extremely tight 3-day deadline required efficient workflow and rapid development. The project involved performing UI slicing from design into responsive and reusable frontend components for both platforms, integrating with backend APIs, and ensuring secure authentication and smooth data flow. Additionally, the solution needed to be structured in a way that could be split into two separate platforms after development. The short timeframe demanded high-velocity coding while maintaining code quality, security, and user experience standards across both websites.',
        solution: 'Leveraged Cursor Pro (AI-assisted development) to accelerate development velocity while maintaining code quality. Adopted a systematic approach to UI slicing, breaking down designs into reusable component architecture that could be shared and adapted for both platforms. Implemented secure authentication patterns and API integration best practices from the start, ensuring consistency across both websites. Used responsive design principles and component reusability to speed up development. Structured the codebase with modular architecture that allowed for easy separation into two distinct platforms. Maintained constant communication with backend teams to ensure API contracts were clear and integration was seamless. Focused on delivering core functionality first, then refined details, ensuring both platforms met design and functionality requirements within the tight deadline.',
      },
    ],
    links: [
      { label: 'Breach Invaderzone', url: 'https://breach.invaderzone.com' },
      { label: 'Tracker Invaderzone', url: 'https://tracker.invaderzone.com' },
      { label: 'Invaderzone', url: 'https://invaderzone.com' },
      { label: 'UI Design', url: 'https://www.figma.com/design/jsVS173GYPlwwXfTMB8oz1/Chowder-Invader_Dashboard_2025--Copy-?node-id=2-5&t=3G7jYZ7CELiya4DJ-1' },
    ],
  },
  {
    id: 'frontend-developer-mertani',
    title: 'Front End Developer',
    company: 'Mertani - PT Merapi Tani Instrumen',
    period: 'Jul 2025 - Present',
    location: 'Jogyakarta, Indonesia',
    workType: 'Contract',
    companyInfo: 'PT Merapi Tani Instrumen is a technology company specializing in agricultural IoT (Internet of Things) solutions. Mertani is their flagship platform that provides comprehensive monitoring and management systems for agricultural operations. The company focuses on developing innovative IoT devices and software solutions that help farmers and agricultural businesses monitor crops, soil conditions, weather data, and other critical agricultural parameters in real-time, enabling data-driven decision making for improved agricultural productivity.',
    projectOverview: 'Working as a Front End Developer on a contract basis for Mertani, an agricultural IoT monitoring platform under PT Merapi Tani Instrumen. My primary responsibilities include building and maintaining responsive web interfaces using modern technologies including Svelte, TypeScript, and CSS/SCSS. I collaborate closely with cross-functional teams including backend developers, IoT engineers, and product managers to develop real-time sensor dashboards and interactive data visualizations that help users monitor and analyze agricultural data effectively. I focus on implementing reusable components and improving frontend performance across multiple Mertani platforms, ensuring consistent user experience and optimal performance for agricultural monitoring systems.',
    responsibilities: [
      'Built and maintained responsive web interfaces using Svelte, TypeScript, and CSS/SCSS for agricultural IoT monitoring systems',
      'Collaborated with cross-functional teams to develop real-time sensor dashboards and interactive data visualizations',
      'Implemented reusable components and improved frontend performance across multiple Mertani platforms',
    ],
    achievements: [
      'Built and maintained responsive web interfaces using Svelte, TypeScript, and CSS/SCSS for agricultural IoT monitoring systems',
      'Collaborated with cross-functional teams to develop real-time sensor dashboards and interactive data visualizations',
      'Implemented reusable components and improved frontend performance across multiple Mertani platforms',
    ],
    keyAchievements: [
      'Developed responsive web interfaces for agricultural IoT monitoring systems',
      'Created real-time sensor dashboards and interactive data visualizations',
      'Implemented reusable components improving code maintainability and consistency',
      'Improved frontend performance across multiple Mertani platforms',
      'Successfully collaborated with cross-functional teams on complex IoT projects',
    ],
    technologies: ['Svelte', 'TypeScript', 'CSS', 'SCSS', 'JavaScript', 'RESTful API', 'GIT', 'HTML', 'Storybook', 'Tailwind CSS'],
    challenges: [
      {
        challenge: 'Building and maintaining responsive web interfaces for agricultural IoT monitoring systems requires handling real-time data streams, creating interactive visualizations, and ensuring optimal performance across multiple platforms. The system needs to process and display sensor data in real-time, create meaningful data visualizations for agricultural parameters, and maintain responsiveness across different devices. Additionally, implementing reusable components while improving frontend performance across multiple Mertani platforms requires careful architecture decisions and optimization strategies.',
        solution: 'Utilized Svelte framework for its reactive capabilities and performance benefits, combined with TypeScript for type safety and better code maintainability. Implemented efficient data handling patterns for real-time sensor data streams, using proper state management and optimization techniques. Created reusable component library with consistent design patterns and performance optimizations. Used CSS/SCSS for maintainable styling and responsive design. Collaborated closely with cross-functional teams to understand requirements and ensure seamless integration of frontend components with backend APIs and IoT data streams. Implemented performance monitoring and optimization strategies to improve load times and responsiveness across all platforms.',
      },
    ],
    links: [
      { label: 'ewsdassanggai', url: 'https://ewsdassanggai.com' },
      { label: 'dashboard.ewsdassanggai.com', url: 'https://dashboard.ewsdassanggai.com' },
      { label: 'storybook mertani', url: 'https://storybook.mertani.com' },
    ],
  },
  {
    id: 'frontend-developer-agares',
    title: 'Front End Developer',
    company: 'Agares - PT Siber Integrasi Teknologi',
    period: '08 Apr 2025 - 09 Apr 2025',
    location: 'Remote, Indonesia',
    workType: 'Project Based',
    images: [
      '/assets/images/experiences/agares/image-1.png',
      '/assets/images/experiences/agares/image-2.png',
    ],
    companyInfo: 'PT Siber Integrasi Teknologi is a technology integration company that provides digital solutions and services. Agares is one of their projects focused on delivering innovative web applications and platforms. The company specializes in developing scalable and efficient technology solutions for various industries, combining modern development practices with user-centered design approaches.',
    projectOverview: 'Worked as a Front End Developer on a project-based contract for Agares, a web application project under PT Siber Integrasi Teknologi. This was an intensive 24-hour project where I worked as part of a team of 2 frontend developers to implement UI designs into responsive web components. I utilized Vue.js, Bootstrap, and custom CSS to create a fully responsive and interactive user interface. Despite the tight deadline, I collaborated closely with backend teams to ensure smooth API integration and optimized user experience, delivering a complete frontend solution within the 24-hour timeframe.',
    responsibilities: [
      'Implemented UI designs into responsive web components using Vue.js, Bootstrap, and custom CSS',
      'Completed frontend development work in 24 hours as part of a team of 2 frontend developers',
      'Collaborated closely with backend teams to ensure smooth API integration and optimized user experience',
    ],
    achievements: [
      'Successfully implemented UI designs into responsive web components using Vue.js, Bootstrap, and custom CSS',
      'Completed all frontend work in 24 hours with a team of 2 frontend developers',
      'Ensured smooth API integration and optimized user experience through close collaboration with backend teams',
    ],
    keyAchievements: [
      'Delivered complete frontend solution within 24-hour deadline',
      'Successfully implemented responsive web components using Vue.js and Bootstrap',
      'Ensured seamless API integration with backend teams',
      'Delivered optimized user experience despite tight timeline',
    ],
    technologies: ['Vue.js', 'Bootstrap', 'Tailwind CSS', 'CSS', 'JavaScript', 'HTML', 'RESTful API', 'GIT','Nuxt'],
    challenges: [
      {
        challenge: 'Completing frontend development work within an extremely tight 24-hour deadline while working as part of a 2-person frontend team. The project required implementing UI designs into responsive web components using Vue.js, Bootstrap, and custom CSS, while also ensuring smooth API integration with backend teams and maintaining optimal user experience. The short timeframe demanded efficient workflow, clear communication, and rapid problem-solving.',
        solution: 'Adopted an agile and efficient workflow by dividing tasks between team members and prioritizing critical components first. Used Vue.js component-based architecture and Bootstrap framework to speed up development while maintaining code quality. Maintained constant communication with backend teams to ensure API contracts were clear and integration points were well-defined. Implemented responsive design patterns and custom CSS efficiently to meet design requirements. Focused on delivering core functionality first, then refined details, ensuring the final product met both design and functionality standards within the tight deadline.',
      },
    ],
    links: [
      { label: 'Agares', url: 'https://agares-web-nine.vercel.app' },
    ],
  },
  {
    id: 'fullstack-developer-arsipjurnal',
    title: 'Fullstack Developer',
    company: 'arsipjurnal.com - PT Pubmedia Digital Sains',
    period: 'Jan 2025 - Apr 2025',
    location: 'Jogyakarta, Indonesia',
    workType: 'Contract',
    images: [
      '/assets/images/experiences/pubmedia/image-1.png', 
      '/assets/images/experiences/pubmedia/image-2.png',
      '/assets/images/experiences/pubmedia/image-3.png',
      '/assets/images/experiences/pubmedia/image-4.png',
      '/assets/images/experiences/pubmedia/image-5.png'
    ],
    companyInfo: 'PT Pubmedia Digital Sains is a digital company focused on developing innovative solutions for academic and research communities. arsipjurnal.com is one of their platforms that provides journal archiving and management services, helping researchers and academic institutions manage, archive, and access journal articles and publications. The company specializes in creating comprehensive digital platforms that support the academic ecosystem with features including content management, XML OAI integration, and payment gateway functionality.',
    projectOverview: 'Worked as a Fullstack Developer on a contract basis for arsipjurnal.com, a journal archiving and management platform under PT Pubmedia Digital Sains. My primary responsibilities included designing and building the database architecture with over 15 relational tables, implementing XML parsing logic for article data extraction, and developing comprehensive admin and user dashboards. I successfully deployed the system to a live domain and hosting server, ensuring all features including content management, user management, journal management, article management, XML OAI integration, and payment gateway were fully functional. The project utilized Laravel v11 framework to deliver a robust, scalable, and feature-rich platform for journal archiving and management.',
    responsibilities: [
      'Designed and built over 15 relational tables in the database, including journal, author, subject, and source type tables',
      'Successfully deployed the system to a live domain and hosting server',
      'Successfully implemented XML parsing logic to extract article data and automatically save it to the database after payment',
      'Developed comprehensive admin and user dashboards using Laravel v11, including content management, users, journals, articles, XML OAI integration, and payment gateway features',
    ],
    achievements: [
      'Designed and built over 15 relational tables in the database, including journal, author, subject, and source type tables and successfully deployed the system to a live domain and hosting server',
      'Successfully implemented XML parsing logic to extract article data and automatically save it to the database after payment',
      'Developed comprehensive admin and user dashboards using Laravel v11, including content management, users, journals, articles, XML OAI integration, and payment gateway features',
    ],
    keyAchievements: [
      'Designed and implemented database architecture with 15+ relational tables',
      'Successfully deployed system to production with live domain and hosting',
      'Implemented automated XML parsing and data extraction system',
      'Developed comprehensive admin and user dashboards with multiple features',
      'Integrated XML OAI and payment gateway functionality',
    ],
    technologies: ['Laravel v11', 'PHP', 'MySQL', 'XML', 'RESTful API', 'GIT', 'JavaScript', 'HTML', 'CSS', 'Payment Gateway', 'Bootstrap'],
    challenges: [
      {
        challenge: 'Designing and building a complex database architecture with 15+ relational tables while ensuring proper relationships, data integrity, and optimal performance. Additionally, implementing XML parsing logic to automatically extract and save article data after payment required handling various XML formats, error scenarios, and ensuring data accuracy. The project also needed comprehensive admin and user dashboards with multiple features including content management, user management, journal management, article management, XML OAI integration, and payment gateway, all while ensuring the system could be successfully deployed to a live production environment.',
        solution: 'Started with thorough database design and normalization, creating proper relationships between tables including journal, author, subject, and source type tables. Implemented robust XML parsing logic with proper error handling and validation to ensure data accuracy. Used Laravel v11 framework features and best practices to develop modular, maintainable code for both admin and user dashboards. Implemented comprehensive testing before deployment and followed deployment best practices to ensure smooth transition to production. Created proper documentation and maintained clear communication with stakeholders throughout the development process.',
      },
    ],
    links: [
      { label: 'arsipjurnal.com', url: 'https://arsipjurnal.com' },
    ],
  },
  {
    id: 'frontend-developer-sectorone',
    title: 'Front End Developer',
    company: 'sectorOne - PT Siber Integrasi Teknologi',
    period: '30 Jan 2025 - 10 Feb 2025',
    location: 'Remote, Indonesia',
    workType: 'Project Based',
    companyInfo: 'PT Siber Integrasi Teknologi is a technology integration company that provides digital solutions and services. sectorOne is one of their projects focused on delivering innovative web applications and platforms. The company specializes in developing scalable and efficient technology solutions for various industries, combining modern development practices with user-centered design approaches.',
    projectOverview: 'Worked as a Front End Developer on a project-based contract for sectorOne, a web application project under PT Siber Integrasi Teknologi. My primary responsibility was to refactor and align existing UI components with the latest UI/UX designs using React.js. During this short but intensive project period, I focused on improving code quality, fixing interface and interaction issues, and ensuring the final product was stable, bug-free, and production-ready. I successfully completed all frontend tasks within 10 days, delivering a polished user interface that significantly improved user comfort and experience.',
    responsibilities: [
      'Refactored and aligned 20+ UI components with UI/UX designs using React.js',
      'Discovered and fixed more than 17+ interface and interaction issues that had a direct impact on user comfort',
      'Completed all frontend tasks in 10 days with a stable, bug-free, production-ready UI',
    ],
    achievements: [
      'Refactored and aligned 20+ UI components with UI/UX designs using React.js',
      'Discovered and fixed more than 17+ interface and interaction issues that had a direct impact on user comfort',
      'Completed all frontend tasks in 10 days with a stable, bug-free, production-ready UI',
    ],
    keyAchievements: [
      'Successfully refactored and aligned 20+ UI components with design specifications',
      'Fixed 17+ interface and interaction issues, significantly improving user comfort',
      'Delivered production-ready UI within tight 10-day deadline',
      'Ensured bug-free and stable frontend implementation',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'RESTful API', 'GIT'],
    challenges: [
      {
        challenge: 'Completing comprehensive refactoring of 20+ UI components and fixing 17+ interface issues within a tight 10-day deadline while ensuring the final product is stable, bug-free, and production-ready. The project required balancing speed with quality, maintaining code consistency, and ensuring all components aligned perfectly with UI/UX designs.',
        solution: 'Adopted an efficient workflow by prioritizing critical components and issues first. Used React.js best practices and component reusability to speed up development while maintaining code quality. Implemented thorough testing and code review processes to catch bugs early. Maintained close communication with the design team to ensure accurate implementation of UI/UX specifications. Focused on systematic issue tracking and resolution, addressing interface and interaction problems methodically to ensure user comfort improvements.',
      },
    ],
    links: [
    ],
  },
  {
    id: 'uiux-frontend-developer-isitasi',
    title: 'UI/UX & Front End Developer',
    company: 'Isitasi.com - PT Pubmedia Digital Sains',
    period: 'Oct 2024 - Jan 2025',
    location: 'Jogyakarta, Indonesia',
    workType: 'Contract',
    images: [
      '/assets/images/experiences/pubmedia/image-1.png', 
      '/assets/images/experiences/pubmedia/image-2.png',
      '/assets/images/experiences/pubmedia/image-3.png',
      '/assets/images/experiences/pubmedia/image-4.png',
      '/assets/images/experiences/pubmedia/image-5.png'
    ],
    companyInfo: 'PT Pubmedia Digital Sains is a digital company focused on developing innovative solutions for academic and research communities. Isitasi.com is one of their platforms that provides journal ranking and citation services, helping researchers and academic institutions track and analyze publication metrics. The company specializes in creating digital tools that support the academic ecosystem, combining data analytics with user-friendly interfaces to deliver valuable insights for researchers and institutions.',
    projectOverview: 'Worked as a UI/UX & Front End Developer on a contract basis for Isitasi.com, a platform providing journal ranking and citation services. My primary responsibilities included designing and developing user interfaces for multiple sections of the platform including the landing page, admin dashboard, and user dashboard. I focused on creating intuitive, responsive, and user-friendly web views using modern web technologies. Throughout the project, I ensured seamless API integration between front-end and back-end systems, maintaining 100% functionality without errors during the development phase. I regularly collaborated with the Product Owner (PO) to discuss feature prioritization and validate UI/UX designs based on business requirements and user needs, ensuring that the final product met both technical and user experience standards.',
    responsibilities: [
      'Created UI/UX design for journal ranking menu on landing page, admin dashboard, and user dashboard',
      'Developed interactive, responsive, and user-friendly web views using HTML, CSS, JavaScript, and Laravel V10',
      'Ensured API integration between front-end and back-end is 100% working without errors during the development phase',
      'Regularly collaborated with PO to discuss feature prioritization and validate UI/UX designs based on business and user needs',
    ],
    achievements: [
      'Successfully designed and implemented UI/UX for journal ranking menu across multiple platform sections',
      'Created responsive and user-friendly web views ensuring optimal user experience',
      'Achieved 100% API integration success rate with zero errors during development phase',
      'Collaborated effectively with Product Owner to align designs with business and user requirements',
    ],
    keyAchievements: [
      'Designed comprehensive UI/UX for landing page, admin dashboard, and user dashboard',
      'Achieved 100% error-free API integration between front-end and back-end',
      'Delivered responsive and interactive web interfaces using modern web technologies',
      'Successfully collaborated with stakeholders to validate and prioritize features',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel V10', 'RESTful API', 'GIT', 'Bootstrap'],
    challenges: [
      {
        challenge: 'Designing UI/UX for multiple dashboard types (landing page, admin, and user dashboard) while maintaining consistency and ensuring each interface meets its specific user needs, combined with ensuring 100% API integration success without errors during development. The journal ranking menu needed to be intuitive for different user roles with varying levels of technical expertise, while also requiring careful coordination between front-end and back-end teams, proper error handling, and thorough testing of all integration points.',
        solution: 'Conducted thorough user research and collaborated closely with the Product Owner to understand user personas and requirements for each dashboard type. Created a design system with consistent components and patterns while customizing interfaces to meet specific role-based needs. Used iterative design and validation processes to ensure usability across all user types. Simultaneously, established clear API contracts and documentation early in the development process, implemented comprehensive error handling and validation on the front-end side, and conducted rigorous testing of all API endpoints during development, including edge cases and error scenarios. Maintained constant communication with the back-end team to address integration issues immediately, ensuring seamless functionality across all platform sections.',
      },
    ],
    links: [
      { label: 'Isitasi.com', url: 'https://isitasi.com' },
    ],
  },
  {
    id: 'frontend-developer-insightops',
    title: 'Front End Developer',
    company: 'InsightOps - PT Siber Integrasi Teknologi',
    period: '18 Oct 2024 - 11 Nov 2024',
    location: 'Remote, Indonesia',
    workType: 'Project Based',
    images: [
      '/assets/images/experiences/insightops/image-1.png',
      '/assets/images/experiences/insightops/image-2.png',
    ],
    companyInfo: 'PT Siber Integrasi Teknologi is a technology integration company that provides digital solutions and services. InsightOps is one of their projects focused on developing OSINT (Open Source Intelligence) tools and platforms for investigative purposes. The company specializes in creating secure and efficient technology solutions for law enforcement and investigative agencies, combining modern development practices with privacy and security considerations.',
    projectOverview: 'Worked as a Front End Developer on a project-based contract for InsightOps, an OSINT (Open Source Intelligence) web application under PT Siber Integrasi Teknologi. This project involved developing a web platform designed to help law enforcement agencies search and gather information about individuals for investigative purposes. I worked as part of a 3-person team (2 frontend developers and 1 backend developer) to complete 6 major features and 9 sub-menus, including comprehensive backend API integration. I was responsible for building responsive and user-friendly frontend interfaces that allow investigators to efficiently search, filter, and visualize OSINT data. The platform required careful attention to data presentation, search functionality, and user experience to support effective investigative workflows while maintaining security and privacy standards.',
    responsibilities: [
      'Developed responsive frontend interfaces for OSINT web application using modern web technologies',
      'Completed 6 major features and 9 sub-menus as part of a 3-person development team (2 frontend, 1 backend)',
      'Implemented search and filtering functionality for investigative data queries',
      'Created data visualization components to display OSINT search results effectively',
      'Integrated frontend with backend APIs, ensuring seamless data flow and API connectivity',
      'Ensured secure and privacy-conscious frontend implementation for law enforcement use',
      'Collaborated closely with backend developer and other frontend developer to coordinate feature development',
      'Optimized user experience for investigative workflows and data analysis',
    ],
    achievements: [
      'Successfully completed 6 major features and 9 sub-menus for OSINT investigative platform',
      'Successfully integrated frontend with backend APIs, ensuring seamless data connectivity',
      'Delivered production-ready frontend solution within project timeline as part of a 3-person team (2 frontend, 1 backend)',
      'Ensured secure frontend implementation suitable for law enforcement use',
    ],
    keyAchievements: [
      'Successfully completed 6 major features and 9 sub-menus for OSINT investigative platform',
      'Delivered complete frontend solution as part of a 3-person development team (2 frontend, 1 backend)',
      'Implemented effective search and data visualization features for investigative workflows',
      'Successfully integrated frontend with backend APIs, ensuring seamless data flow and connectivity',
      'Ensured security and privacy considerations in frontend implementation',
      'Delivered user-friendly interface supporting law enforcement investigative needs',
    ],
    technologies: ['JavaScript', 'Vue.js', 'Nuxt', 'CSS', 'Tailwind CSS', 'Postman', 'RESTful API', 'GIT'],
    challenges: [
      {
        challenge: 'Developing a frontend interface for an OSINT investigative platform that requires balancing usability with security and privacy considerations while handling complex data from multiple sources. The platform needed to efficiently display and search through potentially sensitive investigative data while maintaining a user-friendly experience for law enforcement investigators. Additionally, the interface needed to support complex search queries and data visualization for various types of OSINT information (personal information, social media data, contact information, etc.), requiring effective data presentation and visualization strategies that allow investigators to quickly understand and analyze information from various data sources.',
        solution: 'Designed a clean and intuitive interface that prioritizes data clarity and search efficiency. Implemented robust search and filtering functionality that allows investigators to quickly narrow down results. Created modular data visualization components that can handle different types of OSINT data, presenting information in a structured and easy-to-analyze format. Implemented clear data hierarchy and organization to help investigators quickly identify relevant information. Used responsive design principles to ensure the interface works effectively across different devices. Designed data cards and tables that present information in a scannable format, making it easy for investigators to process large amounts of data efficiently. Ensured all frontend interactions follow security best practices and maintain data privacy. Collaborated closely with backend teams to ensure secure API integration and proper data handling. Focused on creating an interface that supports investigative workflows while maintaining professional standards suitable for law enforcement use.',
      },
    ],
    links: [
      { label: 'InsightOps', url: 'https://insightops.xyz/login' },
      { label: 'UI Design', url: 'https://www.figma.com/design/ktHIapHzgdzNSMATWkPiJh/Mendtel?node-id=0-1&t=AiuSjAZ0GKg9cEE6-1' },
    ],
  },
  {
    id: 'frontend-developer-telkom',
    title: 'Front End Developer Intern',
    company: 'PT Telkom Indonesia Tbk',
    period: 'Jul 2023 - Jan 2024',
    location: 'Bandung, Indonesia',
    workType: 'Internship',
    images: [
      '/assets/images/experiences/telkom/telkom-1.png', 
      '/assets/images/experiences/telkom/telkom-2.png',
      '/assets/images/experiences/telkom/telkom-3.png',
      '/assets/images/experiences/telkom/telkom-4.png',
      '/assets/images/experiences/telkom/telkom-5.png',
      '/assets/images/experiences/telkom/telkom-6.png'
    ],
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
    technologies: ['Vue.js', 'Nuxt.js', 'JavaScript', 'RESTful API', 'CSS', 'HTML', 'Bootstrap', 'GIT','Postman'],
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
      { label: 'produk', url: 'https://digitalpass.id' },
    ],
  },
];

