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
  image?: string;
  featuredImage?: string;
  category?: string;
  externalLink?: string;
}

export const articles: ArticleDetail[] = [
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
    id: 'react-performance-optimization',
    title: 'Mastering React Performance Optimization',
    date: 'Nov 28, 2024',
    readTime: '8 min read',
    description: 'A deep dive into useMemo, useCallback, and React Server Components to build lightning fast apps.',
    tags: ['React', 'Performance'],
    author: 'Azhrul Azim Ripai',
    category: 'React',
    content: `# Mastering React Performance Optimization

Performance is crucial for modern web applications. Users expect fast, responsive interfaces, and even small delays can significantly impact user experience and business metrics.

## Understanding React Rendering

React re-renders components when:
- State changes
- Props change
- Parent component re-renders
- Context value changes

Understanding when and why components re-render is the first step to optimization.

## useMemo: Memoizing Expensive Calculations

\`useMemo\` allows you to memoize expensive calculations and only recompute them when dependencies change.

\`\`\`javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
\`\`\`

### When to Use useMemo

- Expensive calculations (sorting, filtering large arrays)
- Creating objects or arrays that are used as dependencies
- Preventing unnecessary recalculations

## useCallback: Memoizing Functions

\`useCallback\` returns a memoized version of a function that only changes when dependencies change.

\`\`\`javascript
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

### When to Use useCallback

- Passing functions to child components that are memoized with React.memo
- Functions used as dependencies in other hooks
- Event handlers in frequently re-rendering components

## React.memo: Preventing Unnecessary Re-renders

\`React.memo\` is a higher-order component that memoizes the result of a component, only re-rendering when props change.

\`\`\`javascript
const MyComponent = React.memo(({ name, age }) => {
  return <div>{name} - {age}</div>;
});
\`\`\`

## React Server Components

React Server Components allow you to build applications that leverage the server for rendering, reducing the JavaScript bundle size and improving initial load times.

### Benefits

- Zero client-side JavaScript for server components
- Direct access to backend resources
- Automatic code splitting
- Better SEO

## Code Splitting and Lazy Loading

Dynamic imports and React.lazy allow you to split your code and load components only when needed.

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

## Performance Monitoring

Use React DevTools Profiler to identify performance bottlenecks and measure the impact of your optimizations.

## Conclusion

Performance optimization in React requires understanding the rendering lifecycle and using the right tools at the right time. Remember: premature optimization is the root of all evil. Profile first, optimize second.`,
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

