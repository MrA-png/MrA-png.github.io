'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { BookIcon, ArrowRightIcon } from '../ui/icons';

interface Article {
  id: number;
  date: string;
  readTime: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

interface ArticlesSectionProps {
  // Optional props for customization
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = () => {
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

  // Articles data
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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className={`min-h-screen ${bgColor} ${textColor} py-20`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Left Side - Title with Icon */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <BookIcon style={{ color: themeColorValue }} />
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor}`}>
                  Articles & Notes
                </h2>
              </div>
              {/* Orange Underline */}
              <div
                className="h-1 w-24 ml-9"
                style={{ backgroundColor: themeColorValue }}
              />
            </div>

            {/* Right Side - View All Link */}
            <div className="flex items-center">
              <a
                href="#"
                className="flex items-center text-base font-medium hover:opacity-80 transition-opacity"
                style={{ color: textColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = themeColorValue;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textColor;
                }}
              >
                View All Articles
                <span style={{ color: themeColorValue }}>
                  <ArrowRightIcon />
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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
  );
};

