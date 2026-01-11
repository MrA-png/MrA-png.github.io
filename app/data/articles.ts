export interface ArticleDetail {
  id: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  tags: string[];
  // Content
  content: string; // Full article content (can be markdown or HTML)
  author?: string;
  // Optional fields
  image?: string; // Deprecated: use images array instead
  featuredImage?: string; // Deprecated: use images array instead
  images?: string[]; // Array of images for slider
  video?: string; // Video URL or path
  videos?: string[]; // Array of videos
  category?: string;
  externalLink?: string;
}

export const articles: ArticleDetail[] = [
  {
    id: 'automatic-translation-indonesian-sign-language',
    title: 'Automatic Translation of Indonesian Sign Language Based on Multimodal Technology Recognition',
    date: 'Jan 15, 2025',
    readTime: '10 min read',
    description: 'A web-based multimodal translation system that converts audio, text, and video inputs into Indonesian Sign Language (BISINDO) gestures using speech recognition, NLP, and gesture rendering to support inclusive communication.',
    tags: ['Research', 'NLP', 'Machine Learning', 'Accessibility', 'BISINDO', 'Multimodal', 'React', 'Flask', 'Supabase'],
    author: 'Azhrul Azim Ripai',
    category: 'Tech',
    images: [
      '/assets/images/articles/isyara/tampilan-1.png',
      '/assets/images/articles/isyara/tampilan-2.png'
    ],
    video: '/assets/images/articles/isyara/video-FPC.mp4',
    externalLink: 'https://ieeexplore.ieee.org/document/11161638',
    content: `# Automatic Translation of Indonesian Sign Language Based on Multimodal Technology Recognition

Multimodal technology integrates inputs such as audio, video, and text to enhance natural language-based communication accessibility for individuals with disabilities. In Indonesia, people with hearing impairments continue to face challenges in accessing information due to limited sign language interpreter availability and the lack of contextual and interactive learning platforms.

This research aims to develop a web-based translation platform that converts Indonesian audio, text, and video into **BISINDO** (Bahasa Isyarat Indonesia) gestures to support inclusive communication.

![Design System](/assets/images/articles/isyara/desain-sistem.png)

## Introduction

Effective communication is a critical component of everyday life, spanning domains such as education, professional engagement, and social interaction. For individuals with hearing loss, accessing auditory information, especially content delivered through spoken language in audio and video formats, remains a significant barrier.

According to the World Health Organization, more than **5%** of the global population or approximately **466 million people** have hearing loss, with projections showing continued growth. In Indonesia, data from the Ministry of Social Empowerment shows that people with disabilities still face systemic barriers in education, health services, and access to information.

To bridge this gap, this research proposes the development of a web-based multimodal translation system that converts audio, video, and textual content into BISINDO gestures. The system uses **Natural Language Processing (NLP)** to interpret textual data and map the generated tokens to corresponding sign language gesture videos through a collection of sign language gesture datasets and synonym tables.

## System Architecture

The proposed system uses a **React-Flask architecture** with the following key components:

### Frontend (React.js)

The web application is developed using **React.js** for building dynamic and responsive user interfaces. Users can choose from several input modes:

- **Video Upload**: Upload local .mp4 files or insert YouTube links
- **Text Input**: Manual text input field
- **Voice Input**: Microphone-based voice input

### Backend (Flask)

The backend, built with **Flask**, manages RESTful API requests and routes input to appropriate modules:

- **Speech Recognition**: Uses Google Cloud Speech-to-Text for transcription
- **Audio Extraction**: Uses **MoviePy** to extract audio from video files
- **NLP Pipeline**: Applies tokenization, lowercasing, normalization, and stemming using **Sastrawi**
- **Gesture Mapping**: Matches words to BISINDO gesture videos stored in **Supabase** database

### NLP Architecture

The NLP pipeline consists of four sequential stages:

1. **Recognition/Conversion**: Multimodal inputs (voice, video, or text) are processed. Audio and video inputs are transcribed using automatic speech recognition (ASR).
2. **Segmentation and Parsing**: The system applies preprocessing tasks including tokenization, lowercasing, normalization, and stemming. This ensures textual data is standardized and simplified.
3. **Matching**: Each token is compared with entries in the gesture database. If no direct match is found, the system performs a synonym lookup. If still unmatched, a fallback mechanism uses fingerspelling.
4. **Processing**: Matched gesture videos are compiled and arranged in order based on the original sentence structure.

![NLP Architecture](/assets/images/articles/isyara/Arsitektur-NLP.png)

## Dataset and Storage

The system relies on a curated gesture dataset with a total of **393 entries**:

- **Word-level BISINDO gestures**: 206 clips collected from publicly available BISINDO tutorial videos on YouTube
- **Alphabet gestures (A-Z)**: 26 clips produced as consistent 3D animations
- **Composite letter sequences**: 161 clips generated automatically to spell new or unseen words

All video files are stored in **Supabase Storage** under an organized path scheme. The synonym table further extends coverage by linking variant terms to existing gesture videos, enabling flexible vocabulary expansion without duplicating media assets.

## Experimental Results

System testing was conducted using text, audio, and video inputs to ensure reliability and accuracy:

### Speech-to-Text Transcription

From a reference set containing **408 words**, the system successfully transcribed **388 words** correctly, resulting in:
- **Word-level accuracy**: **95.1%**
- **Word Error Rate (WER)**: **3.68%**
- **Character Error Rate (CER)**: **2.06%**

### Text-to-Sign Translation

For new text inputs:
- **Precision**: 62.96%
- **Recall**: 100%
- **F1-score**: **77.27%**

When the same sentences were tested again, the system returned **100%** accuracy across all metrics with significantly faster processing time:
- **First input**: 71 seconds
- **Repeated use**: 1 second (demonstrating efficient gesture caching)

### Video-to-Sign Translation

Initial video translation performance:
- **Uploaded files**: 19.95% gesture accuracy, 14-19 minutes processing time
- **YouTube links**: 13.84% gesture accuracy, 14-19 minutes processing time

On repeated playback of the same video:
- **Gesture accuracy**: **100%**
- **Processing time**: **2-4 minutes** (due to gesture caching)

## Technical Implementation

### Key Technologies

- **Frontend**: React.js for responsive user interfaces
- **Backend**: Flask for RESTful API management
- **Database**: Supabase (PostgreSQL) for gesture storage and relational database management
- **Speech Recognition**: Google Cloud Speech-to-Text API
- **NLP Processing**: Sastrawi for Indonesian language stemming
- **Audio Processing**: MoviePy for audio extraction from video files
- **Storage**: Supabase Storage for gesture video files

### System Features

1. **Multimodal Input Support**: Accepts voice, text, and video inputs
2. **Real-time Processing**: Fast translation with gesture caching for repeated inputs
3. **Fallback Mechanism**: Uses fingerspelling for unknown words
4. **Synonym Handling**: Extends vocabulary coverage through synonym tables
5. **Context-Aware Translation**: Preserves sentence-level meaning

## Conclusion

This research successfully developed a multimodal translation system capable of converting audio, text, and video inputs into Indonesian Sign Language (BISINDO) gestures. The system demonstrates strong performance:

- **95.1%** speech transcription accuracy
- **77.27%** F1-score on first-time text inputs
- **100%** accuracy on repeated tests
- Significant performance improvement through gesture caching

The platform shows great potential as both a communication aid and an interactive learning platform for individuals interested in acquiring BISINDO skills. By allowing users to input spoken or written Indonesian and observe corresponding gestures, it serves as a practical tool for vocabulary acquisition and self-paced BISINDO learning.

![ISYARA Project Poster](/assets/images/articles/isyara/poster.png)

Future improvements will focus on expanding the gesture dataset, enabling grammar-aware translation, and optimizing mobile accessibility. With further development, the system can contribute significantly to both accessibility for the Deaf community and public sign language literacy, empowering broader societal understanding and communication inclusivity.`,
  },
  {
    id: 'simfuni-mobile-app-supply-demand-rattan',
    title: 'My Final Project Application — Simfuni (Mobile Application Supply & Demand for Rattan Industry)',
    date: 'Jul 15, 2023',
    readTime: '12 min read',
    description: 'A mobile application developed as a final project to connect raw rattan sellers, craftsmen, and distributors in the rattan industry, addressing supply and demand challenges using Flutter and Supabase.',
    tags: ['Mobile Development', 'Flutter', 'Final Project', 'Case Study', 'Supabase'],
    author: 'Azhrul Azim Ripai',
    category: 'Tech',
    images: [
      '/assets/images/articles/simfuni/cover.png',
    ],
    content: `# My Final Project Application — Simfuni (Mobile Application Supply & Demand for Rattan Industry)

In the rattan industry, challenges in connectivity and collaboration between raw material sellers, artisans, and distributors have become major obstacles to development. To address this issue, I developed a mobile application called 'Simfuni' as part of my final project at the Politeknik Elektronika Negeri Surabaya.

## Background

The rattan furniture industry is a sector with significant potential in the global market. However, this industry is currently facing challenges that hinder its ability to grow optimally. The first challenge is the limited ability to connect and collaborate efficiently between raw rattan sellers, craftsmen, and distributor factories. In a journal titled "Strategies to Improve the Competitiveness of Indonesia's Rattan Furniture Industry" by Rudi (2016), it was found that the implementation of technology, which is expected to disseminate important information for producers and consumers of rattan products from upstream to downstream, has not been well realized. As a result of the lack of information flow among rattan industry players, one of the main issues that arise is the difficulty in finding raw rattan materials that meet the needs of the craftsmen.

The second challenge is the difficulty in finding raw rattan materials. According to the Indonesian Furniture and Craft Industry Association (HIMKI) in 2020, rattan craftsmen in East Kotawaringin Regency, Central Kalimantan, complained about the difficulty of finding rattan materials from Banjarmasin. This scarcity of raw rattan is also experienced by rattan furniture and craft industry players in Cirebon, Jabodetabek, Sukoharjo, Jepara, Surabaya, and other areas. This is due to the response of rattan raw material producers to the export ban, causing them to switch to other businesses as it is no longer feasible to sell raw rattan materials due to the lack of information on the domestic rattan market. On the other hand, rattan craftsmen in Indonesia still urgently need raw material supplies to produce their goods (disdag.kalselprov.go.id, 2019).

The third challenge is the difficulty in finding skilled craftsmen with adequate skills and experience. Abdul Sobur, the Chairman of the HIMKI Presidium, stated on kumparan.com (2020) that the difficulty in obtaining raw rattan materials has led to rattan craftsmen being unable to meet production demands, forcing distributors to find other craftsmen. This indicates an imbalance between supply and demand in the rattan industry, where the demand for raw rattan materials and rattan crafts is high, but there is not enough supply to meet these needs.

To address these issues, this final project aims to develop a mobile application that will facilitate the creation of a network between raw rattan sellers, craftsmen, and distributor factories. This application will enable them to connect directly, collaborate, and transact more efficiently. With this application, it is hoped that the rattan industry will be able to enhance their operational efficiency, improve product quality, and expand their market reach.

## Design System

Based on these issues, the author proposes a solution in this final project by developing a mobile application that connects rattan craftsmen, raw material sellers, and rattan product distributors. This application aims to address the problems faced by these parties.

The features offered in this mobile app include:

### Demand and Supply Submission Feature

This feature allows users to submit their needs or offer their stock or services by posting or filling out a submission form and providing the necessary data.

### Tender Monitoring & Tracking Feature

This feature aims to monitor the stages of the demand or supply submissions that have been made or the tender applications that have been applied for.

![Simfuni Application Architecture](/assets/images/articles/simfuni/design-system.png)

## Technical Architecture

The "Simfuni" application is built using the **Flutter Framework**, which is an excellent choice for mobile application development. Flutter offers high flexibility and the ability to create responsive and visually appealing user interfaces. This framework also supports cross-platform development, allowing the application to run seamlessly on various devices with optimal performance.

For data storage and management, we use **PostgreSQL** as the primary database. PostgreSQL is known for being a reliable and high-performance relational database management system, capable of handling the diverse data needs of this application. Additionally, we have integrated **Supabase** as the backend service, which provides an API to connect the application with the database and manages the user authentication system.

With Supabase, all communication between the application and the server is conducted via HTTPS, ensuring data security. Users can perform various operations such as logging in, storing data, and retrieving information through the application with the assurance that their data is managed securely and efficiently.

Overall, this technological architecture allows "Simfuni" to deliver a smooth and secure user experience, ensuring that all transmitted and received data is consistently protected.

## Results

In this study, the results indicate that the development of a mobile application to support the rattan industry has successfully connected raw material suppliers, craftsmen, and distribution factories. By leveraging mobile technology, business processes in this industry have become more efficient, transparent, and able to reach a broader market. This application also has a positive impact on the sustainability of the rattan industry by reducing time and costs in the procurement of raw materials and product distribution.

The usability testing results show that the application is user-friendly and can be easily used by users, as evidenced by scenario testing and tests where **97.34%** of users successfully completed the feature trials in the "Simfuni" application. Additionally, in a survey regarding the most valuable aspect users liked, 10 out of 16 respondents, or **62.5%**, rated the application as having easy-to-use features.

![Simfuni UI Design](/assets/images/articles/simfuni/ui-design.png)

With the introduction of this mobile application, it is hoped that the rattan industry, particularly the artisans and distribution factories, can continue to grow and compete in the digital era. This application is not just a tool to simplify business processes but also an innovation that can drive the traditional industry toward a more modern and sustainable direction.

Further development of this application could involve adding additional features, such as integration with e-commerce platforms or market analysis tools, which would better support artisans in making business decisions. This research is expected to serve as a starting point for broader digitalization efforts across other industrial sectors in Indonesia.`,
  },
  {
    id: 'murrobiku-ui-ux-design',
    title: 'Murrobiku: Designing a Platform to Find Islamic Teachers',
    date: 'Mar 15, 2024',
    readTime: '8 min read',
    description: 'A case study on designing a mobile UI/UX for Murrobiku, a platform to find and connect with Islamic teachers (ustadz/ustadzah), created for a UI/UX mobile design competition.',
    tags: ['UI/UX', 'Mobile Design', 'Case Study'],
    author: 'Azhrul Azim Ripai',
    category: 'Design',
    images: [
      '/assets/images/articles/murrobiku/images-1.jpeg',
      '/assets/images/articles/murrobiku/image-2.jpeg',
      '/assets/images/articles/murrobiku/overview.png'
    ],
    content: `# Murrobiku: Designing a Platform to Find Islamic Teachers

Welcome Di Murobbiku Platform mencari ustadz atau ustadzah - This article explores the design process behind Murrobiku, a mobile platform designed to help users find and connect with Islamic teachers (ustadz and ustadzah). This project was created as part of a UI/UX mobile design competition, focusing on creating an intuitive and user-friendly interface for connecting students with qualified Islamic educators.

## The Challenge

Finding qualified and trusted Islamic teachers (ustadz/ustadzah) can be challenging for many people. Traditional methods of finding teachers through word-of-mouth or local mosques may not always provide comprehensive information about teacher qualifications, availability, teaching methods, or specializations. There is a need for a digital platform that can help users easily search, filter, and connect with Islamic teachers based on their specific learning needs, location, and preferences.

## Design Goals

The platform needed to:
- Provide clear information about teachers' backgrounds, expertise, schedules, and teaching approaches
- Enable easy search and filtering based on location, specialization, availability, and teaching method
- Create a trustworthy and culturally appropriate interface for Islamic education
- Balance information density with visual clarity on mobile screens

## Design Approach

![Murrobiku Design Overview](/assets/images/articles/murrobiku/overview.png)

### 1. Card-Based Teacher Profiles

Created a card-based design system for teacher profiles that presents key information at a glance while allowing users to dive deeper into details. Each card displays:
- Teacher photo and name
- Specialization and expertise areas
- Rating and review count
- Location and availability
- Teaching method (online/offline)

### 2. Intuitive Search and Filter

Implemented a prominent search bar with filter options that are easily accessible but not overwhelming. Users can filter by:
- Location
- Specialization (Quranic studies, Islamic jurisprudence, etc.)
- Availability
- Teaching method (online/offline)
- Rating

### 3. Progressive Disclosure

Used a progressive disclosure approach where essential information is shown immediately, with additional details available through expandable sections or detail pages. This prevents information overload while ensuring users have access to comprehensive details when needed.

### 4. Visual Hierarchy

Used clear visual hierarchy with icons and typography to guide users through the information. Important details like ratings and specializations are visually prominent, while secondary information is readable but less prominent.

## Design Challenges and Solutions

### Challenge 1: Information Density vs. Clarity

**Problem**: Mobile screens have limited space, but users need comprehensive information about teachers.

**Solution**: Implemented tabs or accordion-style components to organize information into logical groups (About, Schedule, Reviews, Contact). Created a clean, scannable layout with adequate white space and clear visual separation between different information blocks.

### Challenge 2: Cultural Sensitivity

**Problem**: Creating a design that reflects Islamic values while maintaining modern aesthetics.

**Solution**: Chose a professional and calming color palette, avoiding overly bright or flashy colors. Used Islamic geometric patterns or subtle design elements that reference Islamic art without being overwhelming. Selected typography that is clear and readable, with appropriate font sizes for different content types.

### Challenge 3: Trust and Credibility

**Problem**: The platform needs to feel trustworthy and appropriate for its religious educational purpose.

**Solution**: Incorporated icons and imagery that are respectful and appropriate for the context. Created a design system that feels modern and professional while maintaining cultural sensitivity. This approach ensures the platform feels trustworthy and suitable for its educational and religious purpose.

## Key Features

### Teacher Profile Pages
- Comprehensive teacher information
- Schedule and availability calendar
- Reviews and ratings from students
- Booking and consultation interface

### Search and Discovery
- Advanced search with multiple filters
- Location-based search
- Specialization-based filtering
- Saved searches and favorites

### Rating and Review System
- Visual rating display
- Written reviews from students
- Verified teacher badges
- Response system for teachers

## Design System

The design system includes:
- **Color Palette**: Professional and calming colors that reflect Islamic educational values
- **Typography**: Clear and readable fonts with appropriate hierarchy
- **Icons**: Respectful and contextually appropriate iconography
- **Components**: Reusable card components, buttons, and form elements
- **Spacing**: Consistent spacing system for visual harmony

## Responsive Design

The design was optimized for various mobile screen sizes, ensuring:
- Touch-friendly interface elements
- Readable text at all sizes
- Efficient use of screen space
- Smooth navigation and interactions

## Competition Results

This design was created for a UI/UX mobile design competition, showcasing:
- User-centered design thinking
- Mobile-first design approach
- Cultural sensitivity in design
- Modern UI/UX best practices

## Key Learnings

1. **Progressive Disclosure**: Essential for mobile interfaces with limited screen space
2. **Cultural Context**: Design must respect and reflect the values of the target audience
3. **Information Architecture**: Clear organization is crucial for complex information
4. **Visual Hierarchy**: Guides users through information effectively
5. **Trust Building**: Design elements can significantly impact perceived credibility

## Conclusion

The Murrobiku design successfully addresses the need for finding and connecting with Islamic teachers through an intuitive mobile interface. The design balances information density with visual clarity, creating a user-friendly experience that reflects Islamic educational values while maintaining modern aesthetics. The platform provides an effective solution for connecting students with qualified Islamic educators, making religious education more accessible and organized.`,
  },
  {
    id: 'micro-frontends-module-federation',
    title: 'The Future of Frontend: Micro-frontends & Module Federation',
    date: 'Dec 12, 2024',
    readTime: '5 min read',
    description: 'Exploring how large scale applications are shifting towards distributed architectures using Webpack Module Federation.',
    tags: ['Tech', 'Architecture'],
    author: 'Azhrul Azim Ripai',
    category: 'Tech',
    content: `# The Future of Frontend: Micro-frontends & Module Federation

As web applications grow in complexity and scale, traditional monolithic frontend architectures face significant challenges. Teams struggle with coordination, deployment bottlenecks, and the inability to scale development efforts independently. This is where micro-frontends come into play.

## What are Micro-frontends?

Micro-frontends extend the concepts of microservices to the frontend world. Instead of having a single, monolithic frontend application, you break it down into smaller, independently deployable applications that work together to form a cohesive user experience.

## The Module Federation Approach

Webpack Module Federation is one of the most powerful solutions for implementing micro-frontends. It allows JavaScript applications to dynamically load code from other applications at runtime, enabling true independent deployment and development.

### Key Benefits

1. **Independent Deployment**: Each team can deploy their part of the application without affecting others
2. **Technology Diversity**: Different teams can use different frameworks (React, Vue, Angular) in the same application
3. **Faster Development**: Teams can work in parallel without stepping on each other
4. **Better Scalability**: As your organization grows, you can add more teams without restructuring the entire application

## Implementation Challenges

While micro-frontends offer many benefits, they also introduce new challenges:

- **Shared State Management**: How do you share state between micro-frontends?
- **Styling Conflicts**: Ensuring consistent design while maintaining independence
- **Performance**: Managing bundle sizes and loading strategies
- **Testing**: Testing the integration between different micro-frontends

## Best Practices

1. **Start Small**: Don't try to break everything into micro-frontends at once
2. **Define Clear Boundaries**: Establish clear ownership and boundaries between teams
3. **Shared Component Library**: Create a shared component library for consistency
4. **Communication Protocols**: Define how micro-frontends communicate with each other
5. **Monitoring**: Implement proper monitoring and error tracking

## Conclusion

Micro-frontends with Module Federation represent the future of large-scale frontend development. While they require careful planning and architecture, the benefits in terms of team autonomy, scalability, and deployment flexibility make them an excellent choice for growing applications.`,
  },
  {
    id: 'resilient-apis-nodejs',
    title: 'Building Resilient APIs with Node.js',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    description: 'Best practices for error handling, validation, and logging in Node.js backend services.',
    tags: ['Backend', 'Node.js'],
    author: 'Azhrul Azim Ripai',
    category: 'Backend',
    content: `# Building Resilient APIs with Node.js

Building APIs that are reliable, maintainable, and resilient to failures is crucial for production applications. This article covers best practices for creating robust Node.js APIs.

## Error Handling Strategy

### Centralized Error Handling

Create a centralized error handler middleware to catch and format all errors consistently.

\`\`\`javascript
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
\`\`\`

### Custom Error Classes

Create custom error classes for different error types to provide better error handling.

\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'ValidationError';
  }
}
\`\`\`

## Input Validation

Always validate input data before processing. Use libraries like Joi or Zod for schema validation.

\`\`\`javascript
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const { error, value } = schema.validate(req.body);
if (error) {
  throw new ValidationError(error.details[0].message);
}
\`\`\`

## Logging Best Practices

### Structured Logging

Use structured logging with libraries like Winston or Pino for better log management.

\`\`\`javascript
logger.info({
  method: req.method,
  url: req.url,
  statusCode: res.statusCode,
  responseTime: Date.now() - startTime
}, 'Request completed');
\`\`\`

### Log Levels

- **Error**: System errors that need immediate attention
- **Warn**: Warning messages for potential issues
- **Info**: General informational messages
- **Debug**: Detailed debugging information

## Rate Limiting

Implement rate limiting to protect your API from abuse and ensure fair usage.

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
\`\`\`

## Database Connection Handling

### Connection Pooling

Use connection pooling to efficiently manage database connections.

### Retry Logic

Implement retry logic for transient database errors.

\`\`\`javascript
async function queryWithRetry(query, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await db.query(query);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
\`\`\`

## Health Checks

Implement health check endpoints to monitor API status.

\`\`\`javascript
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    database: await checkDatabase()
  };
  res.status(200).json(health);
});
\`\`\`

## Conclusion

Building resilient APIs requires careful attention to error handling, validation, logging, and monitoring. By following these best practices, you can create APIs that are reliable, maintainable, and ready for production.`,
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Codebases',
    date: 'Sep 20, 2024',
    readTime: '7 min read',
    description: 'How to structure TypeScript projects, manage types, and maintain code quality at scale.',
    tags: ['TypeScript', 'Best Practices'],
    author: 'Azhrul Azim Ripai',
    category: 'TypeScript',
    content: `# TypeScript Best Practices for Large Codebases

TypeScript is powerful, but without proper practices, large codebases can become difficult to maintain. Here are essential practices for scaling TypeScript projects.

## Project Structure

### Organize by Feature, Not by Type

Instead of grouping all components, services, and types separately, organize by feature.

\`\`\`
src/
  features/
    user/
      components/
      services/
      types/
      utils/
\`\`\`

## Type Organization

### Shared Types

Create a shared types directory for common types used across the application.

\`\`\`typescript
// types/common.ts
export type ID = string | number;
export type Status = 'pending' | 'active' | 'inactive';
\`\`\`

### Type vs Interface

- Use **interfaces** for object shapes that might be extended
- Use **types** for unions, intersections, and computed types

\`\`\`typescript
// Interface - can be extended
interface User {
  id: string;
  name: string;
}

// Type - for unions
type Status = 'active' | 'inactive';
\`\`\`

## Strict Type Checking

Enable strict mode in tsconfig.json for better type safety.

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## Utility Types

Leverage TypeScript utility types to create new types from existing ones.

\`\`\`typescript
// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserName = Pick<User, 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
\`\`\`

## Generic Constraints

Use generic constraints to create reusable, type-safe functions.

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Avoid Type Assertions

Prefer type guards over type assertions.

\`\`\`typescript
// Bad
const user = data as User;

// Good
function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data;
}
\`\`\`

## Code Organization

### Barrel Exports

Use index files to create clean import paths.

\`\`\`typescript
// features/user/index.ts
export { UserComponent } from './components/UserComponent';
export { useUser } from './hooks/useUser';
export type { User } from './types/User';
\`\`\`

## Documentation

Document complex types and functions with JSDoc comments.

\`\`\`typescript
/**
 * Calculates the total price including tax
 * @param price - Base price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns Total price including tax
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
\`\`\`

## Conclusion

Following these practices will help you maintain a clean, scalable TypeScript codebase. Remember: types are documentation, use them wisely.`,
  },
  {
    id: 'css-grid-vs-flexbox',
    title: 'CSS Grid vs Flexbox: When to Use What',
    date: 'Aug 10, 2024',
    readTime: '6 min read',
    description: 'A comprehensive guide to choosing the right layout method for your design needs.',
    tags: ['CSS', 'Web Design'],
    author: 'Azhrul Azim Ripai',
    category: 'CSS',
    content: `# CSS Grid vs Flexbox: When to Use What

CSS Grid and Flexbox are both powerful layout tools, but they serve different purposes. Understanding when to use each is key to creating efficient, maintainable layouts.

## Flexbox: One-Dimensional Layouts

Flexbox is designed for laying out items in a single dimension - either as a row or a column.

### Best Use Cases

- Navigation bars
- Centering content
- Distributing space in a single direction
- Aligning items within a container

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

CSS Grid is designed for two-dimensional layouts - rows and columns simultaneously.

### Best Use Cases

- Complex page layouts
- Card grids
- Dashboard layouts
- Any layout requiring both row and column control

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
\`\`\`

## When to Use Each

### Use Flexbox When:
- You need to align items in a single direction
- You want items to flex and grow/shrink
- You're building components (buttons, cards, navigation)
- You need simple, one-dimensional layouts

### Use Grid When:
- You need control over both rows and columns
- You're building page-level layouts
- You need precise item placement
- You want to create complex, responsive layouts

## Combining Both

You can and should use both together! Grid for the overall layout, Flexbox for component internals.

\`\`\`css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
\`\`\`

## Responsive Design

Both Grid and Flexbox excel at responsive design, but in different ways:

- **Flexbox**: Use \`flex-wrap\` for responsive item wrapping
- **Grid**: Use \`auto-fit\` and \`minmax()\` for responsive grids

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

## Browser Support

Both Grid and Flexbox have excellent modern browser support. Use feature queries for progressive enhancement.

\`\`\`css
@supports (display: grid) {
  .layout {
    display: grid;
  }
}
\`\`\`

## Conclusion

Flexbox and Grid are complementary tools. Use Flexbox for components and one-dimensional layouts, Grid for page layouts and two-dimensional designs. The best layouts often combine both.`,
  },
  {
    id: 'webpack-modern-build-tools',
    title: 'Understanding Webpack and Modern Build Tools',
    date: 'Jul 5, 2024',
    readTime: '9 min read',
    description: 'Deep dive into module bundlers, code splitting, and optimizing your build process.',
    tags: ['Build Tools', 'Webpack'],
    author: 'Azhrul Azim Ripai',
    category: 'Build Tools',
    content: `# Understanding Webpack and Modern Build Tools

Build tools are essential for modern web development. They transform, bundle, and optimize your code for production. Understanding how they work helps you build faster, more efficient applications.

## What is Webpack?

Webpack is a module bundler that takes your JavaScript modules and their dependencies and bundles them into static assets.

### Core Concepts

1. **Entry**: The starting point of your application
2. **Output**: Where to emit the bundled files
3. **Loaders**: Transform files (e.g., TypeScript to JavaScript)
4. **Plugins**: Perform tasks like optimization and asset management

## Code Splitting

Code splitting allows you to split your code into smaller chunks that can be loaded on demand.

### Dynamic Imports

\`\`\`javascript
const module = await import('./module.js');
\`\`\`

### Route-Based Splitting

Split code by routes for better performance.

\`\`\`javascript
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
\`\`\`

## Modern Alternatives

### Vite

Vite uses native ES modules and provides lightning-fast development server.

**Benefits:**
- Instant server start
- Fast HMR (Hot Module Replacement)
- Optimized production builds

### esbuild

esbuild is an extremely fast JavaScript bundler written in Go.

**Benefits:**
- 10-100x faster than Webpack
- Built-in TypeScript support
- Tree shaking

### Turbopack

Turbopack is Webpack's successor, built by the Next.js team.

**Benefits:**
- 700x faster than Webpack
- Incremental bundling
- Better caching

## Optimization Strategies

### Tree Shaking

Remove unused code from your bundle.

\`\`\`javascript
// webpack.config.js
optimization: {
  usedExports: true,
  sideEffects: false
}
\`\`\`

### Minification

Compress your code to reduce bundle size.

### Asset Optimization

Optimize images, fonts, and other assets.

## Choosing the Right Tool

- **Webpack**: Mature, highly configurable, large ecosystem
- **Vite**: Fast development, great for modern frameworks
- **esbuild**: Maximum speed, simpler projects
- **Turbopack**: Next.js projects, future of bundling

## Conclusion

Understanding build tools is crucial for modern web development. Choose the right tool for your project, and always optimize for both development experience and production performance.`,
  },
  
];

