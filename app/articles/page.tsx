'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BookIcon, ArrowRightIcon, ExternalLinkIcon } from '../components/ui/icons';
import { articles } from '../data/articles';

export default function ArticlesPage() {
  const router = useRouter();
  const { getThemeColor, isDarkMode, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Handle card click to navigate to detail page
  const handleCardClick = (articleId: string) => {
    router.push(`/article/${articleId}`);
  };
  
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

  // Get all unique categories from articles
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(articles.map(article => article.category).filter(Boolean))] as string[];
    return cats;
  }, []);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let result = articles;

    // Filter by category
    if (activeFilter !== 'All') {
      result = result.filter(article => article.category === activeFilter);
    }

    // Search by title, description, tags, or content
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const descriptionMatch = article.description.toLowerCase().includes(query);
        const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(query));
        const contentMatch = article.content.toLowerCase().includes(query);
        return titleMatch || descriptionMatch || tagsMatch || contentMatch;
      });
    }

    return result;
  }, [activeFilter, searchQuery]);

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
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} {searchQuery || activeFilter !== 'All' ? 'found' : 'published'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles by title, description, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  borderColor: searchQuery ? themeColorValue : borderColor,
                  color: textColor,
                  focusRingColor: themeColorValue,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = themeColorValue;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${hexToRgba(themeColorValue, 0.2)}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: textGrayColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ color: textGrayColor }}
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeFilter === category 
                    ? themeColorValue 
                    : isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.1)',
                  color: activeFilter === category 
                    ? '#FFFFFF' 
                    : textGrayLightColor,
                  border: `1px solid ${activeFilter === category ? themeColorValue : borderColor}`,
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== category) {
                    e.currentTarget.style.borderColor = themeColorValue;
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== category) {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
          <motion.div
                key={`${activeFilter}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
                exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
                {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="rounded-lg p-6 border group cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                }}
                onClick={() => handleCardClick(article.id)}
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
                <div className="flex items-center justify-end mt-4 pt-4 border-t" style={{ borderColor: borderColor }}>
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: themeColorValue }}>
                    <span>Read Article</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className={`${textGrayColor} text-lg mb-4`}>
                  No articles found
                </p>
                <p className={`${textGrayColor} text-sm`}>
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
}

