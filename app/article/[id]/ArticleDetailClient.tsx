'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { articles } from '../../data/articles';
import { 
  ExternalLinkIcon, 
  ArrowRightIcon,
  BookIcon
} from '../../components/ui/icons';

interface ArticleDetailClientProps {
  articleId: string;
}

export function ArticleDetailClient({ articleId }: ArticleDetailClientProps) {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();

  // Find article by ID
  const article = articles.find(art => art.id === articleId);

  // If article not found, redirect or show error
  if (!article) {
    return (
      <div 
        className="min-h-screen transition-colors duration-300 flex items-center justify-center"
        style={{
          backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
          color: isDarkMode ? '#FFFFFF' : '#000000'
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: themeColorValue,
              color: '#FFFFFF'
            }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

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
  const gradientBg = isDarkMode 
    ? `linear-gradient(to bottom, rgba(20, 20, 20, 0.4) 0%, ${hexToRgba(themeColorValue, 0.15)} 39%, ${hexToRgba(themeColorValue, 0.25)} 100%)`
    : `linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, ${hexToRgba(themeColorValue, 0.1)} 39%, ${hexToRgba(themeColorValue, 0.15)} 100%)`;

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000'
      }}
    >
      <Header />
      <article className={`min-h-screen ${bgColor} ${textColor} py-12 sm:py-16 md:py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-8 text-sm font-medium transition-all duration-200 hover:opacity-80 hover:translate-x-[-4px] cursor-pointer"
            style={{ color: themeColorValue }}
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180 transition-transform duration-200 group-hover:translate-x-[-2px]" />
            <span>Back to Articles</span>
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Featured Image */}
            {(article.image || article.featuredImage) && (
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 border" style={{ borderColor: borderColor }}>
                <img
                  src={article.image || article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
            )}

            {/* Category & Icon */}
            {article.category && (
              <div className="flex items-center gap-2 mb-4">
                <BookIcon className="w-5 h-5" style={{ color: themeColorValue }} />
                <span 
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: hexToRgba(themeColorValue, 0.2),
                    color: themeColorValue,
                  }}
                >
                  {article.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${textColor} mb-6 leading-tight`}>
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className={`${textGrayColor} text-sm`}>{article.date}</span>
                <span className={`${textGrayColor} text-sm`}>•</span>
                <span className={`${textGrayColor} text-sm`}>{article.readTime}</span>
              </div>
              {article.author && (
                <>
                  <span className={`${textGrayColor} text-sm`}>•</span>
                  <span className={`${textGrayColor} text-sm`}>By {article.author}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className={`text-lg ${textGrayLightColor} mb-6 leading-relaxed`}>
              {article.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
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
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div
              className="rounded-lg p-6 sm:p-8 border"
              style={{
                background: gradientBg,
                borderColor: borderColor,
              }}
            >
              <div 
                className={`article-content ${textGrayLightColor} leading-relaxed`}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75rem',
                }}
              >
                {article.content.split('\n').map((paragraph, idx) => {
                  // Handle markdown headers
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h2 key={idx} className={`text-2xl font-bold ${textColor} mt-8 mb-4`}>
                        {paragraph.replace('# ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={idx} className={`text-xl font-bold ${textColor} mt-6 mb-3`}>
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className={`text-lg font-semibold ${textColor} mt-4 mb-2`}>
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  // Handle code blocks
                  if (paragraph.startsWith('```')) {
                    return null; // Skip code block markers
                  }
                  // Handle inline code
                  if (paragraph.includes('`')) {
                    const parts = paragraph.split('`');
                    return (
                      <p key={idx} className="mb-4">
                        {parts.map((part, partIdx) => 
                          partIdx % 2 === 0 ? (
                            <span key={partIdx}>{part}</span>
                          ) : (
                            <code
                              key={partIdx}
                              className="px-2 py-1 rounded text-sm"
                              style={{
                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                color: themeColorValue,
                              }}
                            >
                              {part}
                            </code>
                          )
                        )}
                      </p>
                    );
                  }
                  // Handle list items
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    return (
                      <li key={idx} className="mb-2 ml-6 list-disc">
                        {paragraph.replace(/^[-*] /, '')}
                      </li>
                    );
                  }
                  // Handle numbered list
                  if (/^\d+\. /.test(paragraph)) {
                    return (
                      <li key={idx} className="mb-2 ml-6 list-decimal">
                        {paragraph.replace(/^\d+\. /, '')}
                      </li>
                    );
                  }
                  // Regular paragraph
                  if (paragraph.trim()) {
                    return (
                      <p key={idx} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return <br key={idx} />;
                })}
              </div>
            </div>
          </motion.div>

          {/* External Link (if available) */}
          {article.externalLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <a
                  href={article.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-base font-medium transition-all hover:opacity-80"
                  style={{ color: themeColorValue }}
                >
                  <span>Read on External Platform</span>
                  <ExternalLinkIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}

