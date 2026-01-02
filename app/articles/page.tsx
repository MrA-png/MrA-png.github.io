'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BookIcon, ArrowRightIcon } from '../components/ui/icons';

interface Article {
  id: number;
  date: string;
  readTime: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function ArticlesPage() {
  const { getThemeColor, isDarkMode, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  
  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Colors based on theme mode
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textGrayColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const textGrayLightColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  
  const borderColor = hexToRgba(themeColorValue, 0.3);
  
  // Card background color: #18181B with 40% opacity
  const cardBg = 'rgba(24, 24, 27, 0.4)';

  // All articles data (extended list)
  const articles: Article[] = [
    {
      id: 1,
      date: 'Dec 12, 2024',
      readTime: '5 min read',
      title: 'The Future of Frontend: Micro-frontends & Module Federation',
      description: 'Exploring how large scale applications are shifting towards distributed architectures using Webpack Module Federation.',
      tags: ['Tech', 'Architecture'],
      link: '#',
    },
    {
      id: 2,
      date: 'Nov 28, 2024',
      readTime: '8 min read',
      title: 'Mastering React Performance Optimization',
      description: 'A deep dive into useMemo, useCallback, and React Server Components to build lightning fast apps.',
      tags: ['React', 'Performance'],
      link: '#',
    },
    {
      id: 3,
      date: 'Oct 15, 2024',
      readTime: '6 min read',
      title: 'Building Resilient APIs with Node.js',
      description: 'Best practices for error handling, validation, and logging in Node.js backend services.',
      tags: ['Backend', 'Node.js'],
      link: '#',
    },
    {
      id: 4,
      date: 'Sep 20, 2024',
      readTime: '7 min read',
      title: 'TypeScript Best Practices for Large Codebases',
      description: 'How to structure TypeScript projects, manage types, and maintain code quality at scale.',
      tags: ['TypeScript', 'Best Practices'],
      link: '#',
    },
    {
      id: 5,
      date: 'Aug 10, 2024',
      readTime: '6 min read',
      title: 'CSS Grid vs Flexbox: When to Use What',
      description: 'A comprehensive guide to choosing the right layout method for your design needs.',
      tags: ['CSS', 'Web Design'],
      link: '#',
    },
    {
      id: 6,
      date: 'Jul 5, 2024',
      readTime: '9 min read',
      title: 'Understanding Webpack and Modern Build Tools',
      description: 'Deep dive into module bundlers, code splitting, and optimizing your build process.',
      tags: ['Build Tools', 'Webpack'],
      link: '#',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000'
      }}
    >
      <Header />
      <section className={`min-h-screen ${bgColor} ${textColor} py-20`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Title with Icon */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <BookIcon style={{ color: themeColorValue }} />
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor}`}>
                  All Articles & Notes
                </h1>
              </div>
              {/* Underline */}
              <div
                className="h-1 w-24 ml-9"
                style={{ backgroundColor: themeColorValue }}
              />
            </div>
            <p className={`${textGrayColor} text-sm mt-4`}>
              {articles.length} articles published
            </p>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="rounded-lg p-6 border group cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = themeColorValue;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Date & Read Time */}
                <p className={`${textGrayColor} text-sm mb-3`}>
                  {article.date} • {article.readTime}
                </p>

                {/* Title */}
                <h3 className={`text-xl font-bold ${textColor} mb-3 leading-tight group-hover:opacity-80 transition-opacity`}>
                  {article.title}
                </h3>

                {/* Description */}
                <p className={`${textGrayLightColor} text-sm mb-4 leading-relaxed`}>
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: textGrayLightColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <a
                  href={article.link || '#'}
                  className="inline-flex items-center text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: themeColorValue }}
                >
                  Read More
                  <ArrowRightIcon />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

