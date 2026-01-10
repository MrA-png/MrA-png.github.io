'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../contexts/ThemeContext';
import { experiences } from '../../data/experiences';
import { ExternalLinkIcon } from '../ui/icons';
import { customHighlightWords, customHighlightPatterns } from '../../config/highlightWords';

interface ExperienceSectionProps {
  // Optional props for customization
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
  const router = useRouter();
  const { getThemeColor, isDarkMode, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  
  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
  
  // Use theme color for timeline markers and accents
  const timelineColor = themeColorValue;
  const borderColor = hexToRgba(themeColorValue, 0.3);
  
  // Card background color: #18181B with 40% opacity
  const cardBg = 'rgba(24, 24, 27, 0.4)';

  // Handle card click to navigate to detail page
  const handleCardClick = (experienceId: string) => {
    router.push(`/experience/${experienceId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className={`min-h-screen ${bgColor} ${textColor} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-8 sm:mb-10 md:mb-12`}
        >
          # Experience
        </motion.h2>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-4 sm:left-6 top-8 bottom-0 w-0.5"
            style={{ backgroundColor: timelineColor }}
          />

          {/* Experience Items */}
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((experience) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className="relative pl-12 sm:pl-16 md:pl-20"
              >
                {/* Timeline Marker */}
                <div
                  className="absolute left-2 sm:left-4 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                  style={{
                    backgroundColor: timelineColor,
                    boxShadow: `0 0 0 3px ${isDarkMode ? '#000000' : '#FFFFFF'}`,
                  }}
                />

                {/* Experience Card */}
                <div
                  className="rounded-lg p-4 sm:p-6 border cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: borderColor,
                  }}
                  onClick={() => handleCardClick(experience.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = themeColorValue;
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Header: Title/Company on left, Period/Location on right */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                    {/* Left: Title and Company */}
                    <div className="flex-1">
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${textColor} mb-2`}>
                        {experience.title}
                      </h3>
                      <p className={`text-base sm:text-lg ${textGrayLightColor}`}>
                        {experience.company}
                      </p>
                    </div>

                    {/* Right: Period on top, Location/WorkType below */}
                    <div className="flex flex-col items-start sm:items-end text-right">
                      <span className={`${textGrayColor} text-sm font-medium mb-1`}>
                        {experience.period}
                      </span>
                      <div className={`flex flex-wrap items-center gap-2 ${textGrayColor} text-sm`}>
                        <span>{experience.location}</span>
                        <span>•</span>
                        <span>{experience.workType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-4">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className={`flex items-start ${textGrayLightColor} text-sm md:text-base`}>
                        <span className="mr-2" style={{ color: timelineColor }}>•</span>
                        <span>{highlightBold(achievement)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {experience.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: hexToRgba(timelineColor, 0.2),
                          color: timelineColor,
                          border: `1px solid ${hexToRgba(timelineColor, 0.3)}`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Details Link */}
                  <div className="flex items-center justify-end mt-4 pt-4 border-t" style={{ borderColor: borderColor }}>
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: themeColorValue }}>
                      <span>View Details</span>
                      <ExternalLinkIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

