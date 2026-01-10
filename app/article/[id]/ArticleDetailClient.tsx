'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { articles } from '../../data/articles';
import { 
  ExternalLinkIcon, 
  ArrowRightIcon,
  BookIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon
} from '../../components/ui/icons';

interface ArticleDetailClientProps {
  articleId: string;
}

export function ArticleDetailClient({ articleId }: ArticleDetailClientProps) {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Find article by ID
  const article = articles.find(art => art.id === articleId);

  // Get all images from images array, or fallback to image/featuredImage for backward compatibility
  const allImages = article?.images && article.images.length > 0
    ? article.images
    : (article?.image || article?.featuredImage) 
      ? [article.image || article.featuredImage!]
      : [];

  const hasMultipleImages = allImages.length > 1;

  // Reset image index when article changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
    setIsPaused(false);
    setIsModalOpen(false);
    setModalImageIndex(0);
  }, [articleId]);

  // Auto-play slider: change image every 5 seconds
  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, isPaused, allImages.length]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setModalImageIndex((prev) => 
          prev === 0 ? allImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setModalImageIndex((prev) => 
          prev === allImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, allImages.length]);

  // Open modal with clicked image
  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    setIsPaused(true); // Pause auto-play when modal opens
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPaused(false); // Resume auto-play when modal closes
  };

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

  // Helper function to render markdown text (bold, inline code)
  const renderMarkdownText = (text: string): React.ReactNode => {
    if (!text) return text;

    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    let key = 0;

    // Process inline code first (higher priority), then bold text
    const codeRegex = /`([^`]+)`/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const allMatches: Array<{ type: 'bold' | 'code'; start: number; end: number; content: string }> = [];

    // Find all code matches (process first to avoid conflicts)
    let match;
    const codeMatches: number[] = [];
    while ((match = codeRegex.exec(text)) !== null) {
      allMatches.push({
        type: 'code',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
      // Track code block ranges to avoid processing bold inside code
      for (let i = match.index; i < match.index + match[0].length; i++) {
        codeMatches.push(i);
      }
    }

    // Find all bold matches (skip if inside code block)
    while ((match = boldRegex.exec(text)) !== null) {
      const isInsideCode = codeMatches.some(pos => pos >= match.index && pos < match.index + match[0].length);
      if (!isInsideCode) {
        allMatches.push({
          type: 'bold',
          start: match.index,
          end: match.index + match[0].length,
          content: match[1],
        });
      }
    }

    // Sort matches by start position
    allMatches.sort((a, b) => a.start - b.start);

    // Remove overlapping matches (keep code over bold)
    const filteredMatches = allMatches.filter((match, idx) => {
      if (idx === 0) return true;
      const prevMatch = allMatches[idx - 1];
      // If current match overlaps with previous, keep the one that starts first
      if (match.start < prevMatch.end) {
        return match.type === 'code' && prevMatch.type === 'bold';
      }
      return true;
    });

    // Build parts array
    filteredMatches.forEach((matchItem) => {
      // Add text before match
      if (matchItem.start > currentIndex) {
        const beforeText = text.substring(currentIndex, matchItem.start);
        if (beforeText) {
          parts.push(<span key={key++}>{beforeText}</span>);
        }
      }

      // Add match content
      if (matchItem.type === 'bold') {
        parts.push(
          <strong key={key++} className="font-bold" style={{ color: textColor }}>
            {matchItem.content}
          </strong>
        );
      } else if (matchItem.type === 'code') {
        parts.push(
          <code
            key={key++}
            className="px-2 py-1 rounded text-sm font-mono"
            style={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              color: themeColorValue,
            }}
          >
            {matchItem.content}
          </code>
        );
      }

      currentIndex = matchItem.end;
    });

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.substring(currentIndex);
      if (remainingText) {
        parts.push(<span key={key++}>{remainingText}</span>);
      }
    }

    return parts.length > 0 ? parts : text;
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
            {/* Image Slider */}
            {allImages.length > 0 && (
              <div 
                className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 border relative" 
                style={{ borderColor: borderColor }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {!imageError ? (
                  <>
                    {/* Image Slider */}
                    <div className="relative w-full h-full">
                      <motion.img
                        key={currentImageIndex}
                        src={allImages[currentImageIndex]}
                        alt={`${article.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onError={() => {
                          setImageError(true);
                        }}
                        onClick={() => handleImageClick(currentImageIndex)}
                      />

                      {/* Navigation Buttons - Only show if multiple images */}
                      {hasMultipleImages && (
                        <>
                          {/* Previous Button */}
                          <button
                            onClick={() => {
                              setCurrentImageIndex((prev) => 
                                prev === 0 ? allImages.length - 1 : prev - 1
                              );
                              setIsPaused(true);
                              setTimeout(() => setIsPaused(false), 3000);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                            style={{
                              backgroundColor: hexToRgba(themeColorValue, 0.2),
                              color: themeColorValue,
                            }}
                            aria-label="Previous image"
                          >
                            <ChevronLeftIcon className="w-6 h-6" />
                          </button>

                          {/* Next Button */}
                          <button
                            onClick={() => {
                              setCurrentImageIndex((prev) => 
                                prev === allImages.length - 1 ? 0 : prev + 1
                              );
                              setIsPaused(true);
                              setTimeout(() => setIsPaused(false), 3000);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                            style={{
                              backgroundColor: hexToRgba(themeColorValue, 0.2),
                              color: themeColorValue,
                            }}
                            aria-label="Next image"
                          >
                            <ChevronRightIcon className="w-6 h-6" />
                          </button>

                          {/* Dots Indicator */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                            {allImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setCurrentImageIndex(idx);
                                  setIsPaused(true);
                                  setTimeout(() => setIsPaused(false), 3000);
                                }}
                                className="w-2 h-2 rounded-full transition-all duration-200"
                                style={{
                                  backgroundColor: idx === currentImageIndex 
                                    ? themeColorValue 
                                    : 'rgba(255, 255, 255, 0.5)',
                                  width: idx === currentImageIndex ? '24px' : '8px',
                                }}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>

                          {/* Image Counter */}
                          <div 
                            className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                            style={{
                              backgroundColor: hexToRgba(themeColorValue, 0.2),
                              color: themeColorValue,
                            }}
                          >
                            {currentImageIndex + 1} / {allImages.length}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(themeColorValue, 0.2)} 0%, ${hexToRgba(themeColorValue, 0.1)} 100%)`,
                    }}
                  >
                    <div
                      className="text-4xl font-bold opacity-20"
                      style={{ color: themeColorValue }}
                    >
                      {article.title.charAt(0)}
                    </div>
                  </div>
                )}
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
                {(() => {
                  const lines = article.content.split('\n');
                  const elements: React.ReactNode[] = [];
                  let inCodeBlock = false;
                  let codeBlockContent: string[] = [];
                  let codeBlockLanguage = '';

                  lines.forEach((line, idx) => {
                    // Handle code blocks
                    if (line.startsWith('```')) {
                      if (inCodeBlock) {
                        // End of code block
                        elements.push(
                          <pre
                            key={`code-${idx}`}
                            className="mb-4 p-4 rounded-lg overflow-x-auto"
                            style={{
                              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)',
                              border: `1px solid ${borderColor}`,
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                              lineHeight: '1.5',
                            }}
                          >
                            <code className={textColor}>
                              {codeBlockContent.join('\n')}
                            </code>
                          </pre>
                        );
                        codeBlockContent = [];
                        inCodeBlock = false;
                        codeBlockLanguage = '';
                      } else {
                        // Start of code block
                        inCodeBlock = true;
                        codeBlockLanguage = line.replace('```', '').trim();
                      }
                      return;
                    }

                    if (inCodeBlock) {
                      codeBlockContent.push(line);
                      return;
                    }

                    // Handle markdown headers
                    if (line.startsWith('# ')) {
                      elements.push(
                        <h2 key={idx} className={`text-2xl font-bold ${textColor} mt-8 mb-4`}>
                          {renderMarkdownText(line.replace('# ', ''))}
                        </h2>
                      );
                      return;
                    }
                    if (line.startsWith('## ')) {
                      elements.push(
                        <h3 key={idx} className={`text-xl font-bold ${textColor} mt-6 mb-3`}>
                          {renderMarkdownText(line.replace('## ', ''))}
                        </h3>
                      );
                      return;
                    }
                    if (line.startsWith('### ')) {
                      elements.push(
                        <h4 key={idx} className={`text-lg font-semibold ${textColor} mt-4 mb-2`}>
                          {renderMarkdownText(line.replace('### ', ''))}
                        </h4>
                      );
                      return;
                    }

                    // Handle markdown images: ![alt](url) or ![alt text](url "title")
                    const imageRegex = /!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]+)")?\)/;
                    const imageMatch = line.match(imageRegex);
                    if (imageMatch) {
                      const [, alt, url, title] = imageMatch;
                      elements.push(
                        <div key={idx} className="my-6">
                          <img
                            src={url}
                            alt={alt || 'Article image'}
                            title={title || alt}
                            className="w-full rounded-lg border"
                            style={{
                              borderColor: borderColor,
                              maxHeight: '600px',
                              objectFit: 'contain',
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          {alt && (
                            <p className={`text-center ${textGrayColor} text-sm mt-2 italic`}>
                              {alt}
                            </p>
                          )}
                        </div>
                      );
                      // Remove image markdown from line and process remaining text if any
                      const remainingText = line.replace(imageRegex, '').trim();
                      if (remainingText) {
                        elements.push(
                          <p key={`${idx}-text`} className="mb-4">
                            {renderMarkdownText(remainingText)}
                          </p>
                        );
                      }
                      return;
                    }

                    // Handle HTML img tags: <img src="url" alt="alt" />
                    const htmlImageRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/i;
                    const htmlImageMatch = line.match(htmlImageRegex);
                    if (htmlImageMatch) {
                      const src = htmlImageMatch[1];
                      const altMatch = line.match(/alt=["']([^"']+)["']/i);
                      const alt = altMatch ? altMatch[1] : 'Article image';
                      elements.push(
                        <div key={idx} className="my-6">
                          <img
                            src={src}
                            alt={alt}
                            className="w-full rounded-lg border"
                            style={{
                              borderColor: borderColor,
                              maxHeight: '600px',
                              objectFit: 'contain',
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          {alt && alt !== 'Article image' && (
                            <p className={`text-center ${textGrayColor} text-sm mt-2 italic`}>
                              {alt}
                            </p>
                          )}
                        </div>
                      );
                      return;
                    }

                    // Handle list items
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                      elements.push(
                        <li key={idx} className="mb-2 ml-6 list-disc">
                          {renderMarkdownText(line.replace(/^[-*] /, ''))}
                        </li>
                      );
                      return;
                    }
                    // Handle numbered list
                    if (/^\d+\. /.test(line)) {
                      elements.push(
                        <li key={idx} className="mb-2 ml-6 list-decimal">
                          {renderMarkdownText(line.replace(/^\d+\. /, ''))}
                        </li>
                      );
                      return;
                    }

                    // Regular paragraph with markdown parsing
                    if (line.trim()) {
                      elements.push(
                        <p key={idx} className="mb-4">
                          {renderMarkdownText(line)}
                        </p>
                      );
                      return;
                    }

                    elements.push(<br key={idx} />);
                  });

                  return elements;
                })()}
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

      {/* Image Modal Preview */}
      <AnimatePresence>
        {isModalOpen && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }}
            onClick={handleCloseModal}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
              }}
              aria-label="Close modal"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={modalImageIndex}
                src={allImages[modalImageIndex]}
                alt={`${article.title} - Image ${modalImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />

              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex((prev) => 
                        prev === 0 ? allImages.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="w-8 h-8" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex((prev) => 
                        prev === allImages.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="w-8 h-8" />
                  </button>

                  {/* Image Counter */}
                  <div 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                    }}
                  >
                    {modalImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

