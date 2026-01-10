'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { experiences } from '../../data/experiences';
import { customHighlightWords, customHighlightPatterns } from '../../config/highlightWords';
import { 
  MapPinIcon, 
  ExternalLinkIcon, 
  ArrowRightIcon 
} from '../../components/ui/icons';

interface ExperienceDetailClientProps {
  experienceId: string;
}

export function ExperienceDetailClient({ experienceId }: ExperienceDetailClientProps) {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  const [imageError, setImageError] = useState(false);

  // Find experience by ID
  const experience = experiences.find(exp => exp.id === experienceId);

  // If experience not found, redirect or show error
  if (!experience) {
    return (
      <div 
        className="min-h-screen transition-colors duration-300 flex items-center justify-center"
        style={{
          backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
          color: isDarkMode ? '#FFFFFF' : '#000000'
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
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

  // Helper function to calculate duration from period (format: "Mar 2024 - Jun 2024")
  const calculateDurationFromPeriod = (period: string): string => {
    try {
      // Split period by " - " to get start and end
      const parts = period.split(' - ');
      if (parts.length !== 2) {
        return '';
      }

      const [startStr, endStr] = parts;
      
      // Check if end is "Present"
      if (endStr.trim() === 'Present') {
        return 'Ongoing';
      }

      // Parse start date (format: "Mar 2024")
      const startParts = startStr.trim().split(' ');
      const startMonth = startParts[0];
      const startYear = parseInt(startParts[1]);

      // Parse end date (format: "Jun 2024")
      const endParts = endStr.trim().split(' ');
      const endMonth = endParts[0];
      const endYear = parseInt(endParts[1]);

      // Map month abbreviations to numbers
      const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };

      const startMonthNum = monthMap[startMonth];
      const endMonthNum = monthMap[endMonth];

      if (startMonthNum === undefined || endMonthNum === undefined) {
        return '';
      }

      // Create dates (using first day of month for calculation)
      const start = new Date(startYear, startMonthNum, 1);
      const end = new Date(endYear, endMonthNum, 1);

      // Calculate difference in months (inclusive)
      // We need to count from start month to end month inclusively
      const yearsDiff = endYear - startYear;
      const monthsDiff = endMonthNum - startMonthNum;
      let totalMonths = yearsDiff * 12 + monthsDiff + 1; // +1 because we count inclusively

      if (totalMonths === 0) {
        return 'Less than 1 month';
      } else if (totalMonths === 1) {
        return '1 month';
      } else if (totalMonths < 12) {
        return `${totalMonths} months`;
      } else {
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        if (months === 0) {
          return `${years} ${years === 1 ? 'year' : 'years'}`;
        } else {
          return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
        }
      }
    } catch (error) {
      console.error('Error calculating duration from period:', error);
      return '';
    }
  };

  // Helper function to highlight bold certain words (percentages, numbers, technologies, key terms)
  const highlightBold = (text: string): React.ReactNode => {
    // Patterns to match:
    // 1. Percentages: 85%, 87%, 79%, 20%, etc.
    // 2. Numbers with units: 13 features, 11 sprints, etc.
    // 3. Technologies: Laravel 9, Supabase, Vue.js, Nuxt.js, RESTful API, etc.
    // 4. Key terms: CRUD, API, etc.
    // 5. Custom words from configuration
    
    // Build custom words pattern if there are any custom words
    const customWordsPattern = customHighlightWords.length > 0
      ? new RegExp(`\\b(${customHighlightWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
      : null;
    
    const patterns = [
      // Percentages
      /(\d+%)/g,
      // Numbers with common units/words
      /(\d+\s+(?:features?|sprints?|months?|years?|days?|weeks?|users?|applications?|projects?|teams?|sprints?))/gi,
      // Technologies (case-insensitive)
      /(Laravel\s+\d+|Supabase|Vue\.js|Nuxt|Nuxt\.js|RESTful\s+API|PHP|JavaScript|CSS|HTML|Vuex|Bootstrap)/gi,
      // Key technical terms (with word boundaries to avoid matching substrings)
      /\b(CRUD|API|APIs|RESTful|Backend-as-a-Service|BaaS)\b/gi,
      // Methodology terms
      /\b(Agile|sprint|sprints)\b/gi,
      // Custom words from configuration
      ...(customWordsPattern ? [customWordsPattern] : []),
      // Custom regex patterns from configuration
      ...customHighlightPatterns,
    ];

    let result: React.ReactNode[] = [];
    let lastIndex = 0;
    let parts: Array<{ text: string; shouldBold: boolean }> = [];

    // Find all matches
    const matches: Array<{ index: number; length: number }> = [];
    patterns.forEach(pattern => {
      const regex = new RegExp(pattern.source, pattern.flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({ index: match.index, length: match[0].length });
      }
    });

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Remove overlapping matches (keep the first one)
    const nonOverlapping: Array<{ index: number; length: number }> = [];
    matches.forEach(match => {
      const overlaps = nonOverlapping.some(existing => 
        match.index < existing.index + existing.length && 
        match.index + match.length > existing.index
      );
      if (!overlaps) {
        nonOverlapping.push(match);
      }
    });

    // Build parts array
    nonOverlapping.forEach(match => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({ text: text.substring(lastIndex, match.index), shouldBold: false });
      }
      // Add matched text (should be bold)
      parts.push({ text: text.substring(match.index, match.index + match.length), shouldBold: true });
      lastIndex = match.index + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ text: text.substring(lastIndex), shouldBold: false });
    }

    // If no matches, return original text
    if (parts.length === 0) {
      return text;
    }

    // Convert parts to React nodes
    return (
      <>
        {parts.map((part, idx) => 
          part.shouldBold ? (
            <strong key={idx} className="font-bold" style={{ color: themeColorValue }}>
              {part.text}
            </strong>
          ) : (
            <span key={idx}>{part.text}</span>
          )
        )}
      </>
    );
  };

  // Colors based on theme mode
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textGrayColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const textGrayLightColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = hexToRgba(themeColorValue, 0.3);
  const cardBg = 'rgba(24, 24, 27, 0.4)';
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
      <section className={`min-h-screen ${bgColor} ${textColor} py-12 sm:py-16 md:py-20`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
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
            <span>Back to Experience</span>
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Featured Image */}
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 border" style={{ borderColor: borderColor }}>
              {(experience.image || experience.thumbnail) && !imageError ? (
                <img
                  src={experience.image || experience.thumbnail}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                  onError={() => {
                    setImageError(true);
                  }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(themeColorValue, 0.2)} 0%, ${hexToRgba(themeColorValue, 0.1)} 100%)`,
                  }}
                >
                  <div
                    className="text-6xl sm:text-7xl md:text-8xl font-bold opacity-20"
                    style={{ color: themeColorValue }}
                  >
                    {experience.title.charAt(0)}
                  </div>
                </div>
              )}
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
              {experience.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className={`text-xl sm:text-2xl ${textGrayLightColor}`}>
                {experience.company}
              </h2>
              <span className={`${textGrayColor} text-sm`}>•</span>
              <span className={`${textGrayColor} text-sm`}>{experience.period}</span>
              {calculateDurationFromPeriod(experience.period) && (
                <>
                  <span className={`${textGrayColor} text-sm`}>•</span>
                  <span className={`${textGrayColor} text-sm`}>
                    {calculateDurationFromPeriod(experience.period)}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" style={{ color: themeColorValue }} />
                <span className={`${textGrayColor} text-sm`}>{experience.location}</span>
              </div>
              <span className={`${textGrayColor} text-sm`}>•</span>
              <span className={`${textGrayColor} text-sm`}>{experience.workType}</span>
            </div>
          </motion.div>

          {/* Company / Project Info */}
          {experience.companyInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <h3 className={`text-xl font-bold ${textColor} mb-3`}>Company / Project Info</h3>
                <p className={`${textGrayLightColor} leading-relaxed`}>
                  {highlightBold(experience.companyInfo)}
                </p>
              </div>
            </motion.div>
          )}

          {/* Project / Product Overview */}
          {experience.projectOverview && (
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
                <h3 className={`text-xl font-bold ${textColor} mb-3`}>Project / Product Overview</h3>
                <p className={`${textGrayLightColor} leading-relaxed`}>
                  {highlightBold(experience.projectOverview)}
                </p>
              </div>
            </motion.div>
          )}

          {/* Responsibilities */}
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>Responsibilities</h3>
                <ul className="space-y-3">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className={`flex items-start ${textGrayLightColor}`}>
                      <span className="mr-3 mt-1" style={{ color: themeColorValue }}>•</span>
                      <span className="leading-relaxed">{highlightBold(responsibility)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          {experience.technologies && experience.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {experience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: hexToRgba(themeColorValue, 0.2),
                        color: themeColorValue,
                        border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Key Achievements / Impact */}
          {experience.keyAchievements && experience.keyAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>
                  Key Achievements / Impact
                </h3>
                <ul className="space-y-3">
                  {experience.keyAchievements.map((achievement, idx) => (
                    <li key={idx} className={`flex items-start ${textGrayLightColor}`}>
                      <span className="mr-3 mt-1" style={{ color: themeColorValue }}>•</span>
                      <span className="leading-relaxed text-base">{highlightBold(achievement)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Challenges & Solutions */}
          {experience.challenges && experience.challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>Challenges & Solutions</h3>
                <div className="space-y-6">
                  {experience.challenges.map((challenge, idx) => (
                    <div key={idx} className="border-l-2 pl-4" style={{ borderColor: themeColorValue }}>
                      <div className="mb-2">
                        <h4 className={`font-semibold ${textColor} mb-1`}>Challenge:</h4>
                        <p className={`${textGrayLightColor} leading-relaxed`}>
                          {highlightBold(challenge.challenge)}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColor} mb-1`}>Solution:</h4>
                        <p className={`${textGrayLightColor} leading-relaxed`}>
                          {highlightBold(challenge.solution)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Supporting Links */}
          {experience.links && experience.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8"
            >
              <div
                className="rounded-lg p-6 border"
                style={{
                  background: gradientBg,
                  borderColor: borderColor,
                }}
              >
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>Supporting Links</h3>
                <div className="flex flex-wrap gap-3">
                  {experience.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                      style={{
                        backgroundColor: hexToRgba(themeColorValue, 0.2),
                        color: themeColorValue,
                        border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                      }}
                    >
                      <span>{link.label}</span>
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

