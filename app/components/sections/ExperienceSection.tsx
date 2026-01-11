'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../contexts/ThemeContext';
import { experiences } from '../../data/experiences';
import { ExternalLinkIcon } from '../ui/icons';
import { highlightBold } from '../../utils/highlightBold';

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

  
  // Colors based on theme mode
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textGrayColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const textGrayLightColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  
  // Use theme color for timeline markers and accents
  const timelineColor = themeColorValue;
  const borderColor = hexToRgba(themeColorValue, 0.3);
  
  // Card background color: glass effect for light mode, dark for dark mode
  const cardBg = isDarkMode ? 'rgba(24, 24, 27, 0.4)' : 'rgba(255, 255, 255, 0.3)';

  // Handle card click to navigate to detail page
  const handleCardClick = (experienceId: string) => {
    router.push(`/experience/${experienceId}`);
  };

  // State for collapse/expand company cards (default all open)
  const [expandedCompanies, setExpandedCompanies] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    // Initialize all companies as expanded (true) by extracting company names from experiences
    experiences.forEach((experience) => {
      let companyName = experience.company;
      if (experience.company.includes(' - ')) {
        const parts = experience.company.split(' - ');
        companyName = parts[parts.length - 1].trim();
      }
      if (!initial[companyName]) {
        initial[companyName] = true; // Default: all expanded
      }
    });
    return initial;
  });

  // Toggle company collapse/expand
  const toggleCompany = (companyName: string) => {
    setExpandedCompanies((prev) => ({
      ...prev,
      [companyName]: !prev[companyName],
    }));
  };

  // Group experiences by company
  const groupedExperiences = React.useMemo(() => {
    const groups: { [key: string]: typeof experiences } = {};
    
    experiences.forEach((experience) => {
      // Extract company name (after " - " if exists, otherwise use full company name)
      // Format: "Project Name - Company Name" or just "Company Name"
      let companyName = experience.company;
      if (experience.company.includes(' - ')) {
        const parts = experience.company.split(' - ');
        // Take the last part as company name (handles cases like "A - B - C")
        companyName = parts[parts.length - 1].trim();
      }
      
      if (!groups[companyName]) {
        groups[companyName] = [];
      }
      groups[companyName].push(experience);
    });

    // Sort experiences within each group: Present first, then by date
    Object.keys(groups).forEach((companyName) => {
      groups[companyName].sort((a, b) => {
        const aIsPresent = a.period.toLowerCase().includes('present');
        const bIsPresent = b.period.toLowerCase().includes('present');
        
        // If one is Present and the other is not, Present comes first
        if (aIsPresent && !bIsPresent) return -1;
        if (!aIsPresent && bIsPresent) return 1;
        
        // If both are Present or both are not, keep original order
        return 0;
      });
    });

    // Sort groups: groups with Present experiences first
    const sortedGroups = Object.entries(groups).sort((a, b) => {
      const aHasPresent = a[1].some(exp => exp.period.toLowerCase().includes('present'));
      const bHasPresent = b[1].some(exp => exp.period.toLowerCase().includes('present'));
      
      // If one group has Present and the other doesn't, Present group comes first
      if (aHasPresent && !bHasPresent) return -1;
      if (!aHasPresent && bHasPresent) return 1;
      
      // If both have Present or both don't, keep original order
      return 0;
    });

    return sortedGroups;
  }, []);

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

          {/* Experience Items Grouped by Company */}
          <div className="space-y-8 sm:space-y-12">
            {groupedExperiences.map(([companyName, companyExperiences], groupIndex) => (
              <motion.div
                key={companyName}
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

                {/* Company Card (Big Card) */}
                <div
                  className="rounded-lg p-6 sm:p-8 border transition-all duration-300"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: borderColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = themeColorValue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = borderColor;
                  }}
                >
                  {/* Company Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: borderColor }}>
                    <div className="flex items-center gap-3">
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold ${textColor}`}>
                        {companyName}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: hexToRgba(timelineColor, 0.2),
                          color: timelineColor,
                          border: `1px solid ${hexToRgba(timelineColor, 0.3)}`,
                        }}
                      >
                        {companyExperiences.length} {companyExperiences.length === 1 ? 'Experience' : 'Experiences'}
                      </span>
                    </div>
                    {/* Collapse/Expand Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompany(companyName);
                      }}
                      className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: hexToRgba(timelineColor, 0.1),
                        color: timelineColor,
                      }}
                      aria-label={expandedCompanies[companyName] ? 'Collapse' : 'Expand'}
                    >
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: expandedCompanies[companyName] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                  </div>

                  {/* Experience Cards Inside Company Card */}
                  <AnimatePresence initial={false}>
                    {expandedCompanies[companyName] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="space-y-4 sm:space-y-6 overflow-hidden"
                      >
                    {companyExperiences.map((experience, expIndex) => (
                      <div
                        key={experience.id}
                        className="rounded-lg p-4 sm:p-5 border cursor-pointer transition-all duration-300"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                          borderColor: hexToRgba(borderColor, 0.5),
                        }}
                        onClick={() => handleCardClick(experience.id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = themeColorValue;
                          e.currentTarget.style.transform = 'translateX(4px)';
                          e.currentTarget.style.backgroundColor = isDarkMode 
                            ? 'rgba(0, 0, 0, 0.5)' 
                            : 'rgba(255, 255, 255, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = hexToRgba(borderColor, 0.5);
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.backgroundColor = isDarkMode 
                            ? 'rgba(0, 0, 0, 0.3)' 
                            : 'rgba(255, 255, 255, 0.3)';
                        }}
                      >
                        {/* Header: Title/Company on left, Period/Location on right */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                          {/* Left: Title and Company */}
                          <div className="flex-1">
                            <h4 className={`text-base sm:text-lg md:text-xl font-bold ${textColor} mb-1`}>
                              {experience.title}
                            </h4>
                            <p className={`text-sm sm:text-base ${textGrayLightColor}`}>
                              {experience.company}
                            </p>
                          </div>

                          {/* Right: Period on top, Location/WorkType below */}
                          <div className="flex flex-col items-start sm:items-end text-right">
                            <span className={`${textGrayColor} text-xs sm:text-sm font-medium mb-1`}>
                              {experience.period}
                            </span>
                            <div className={`flex flex-wrap items-center gap-2 ${textGrayColor} text-xs sm:text-sm`}>
                              <span>{experience.location}</span>
                              <span>•</span>
                              <span>{experience.workType}</span>
                            </div>
                          </div>
                        </div>

                        {/* Achievements */}
                        <ul className="space-y-1.5 mb-3">
                          {experience.achievements.slice(0, 2).map((achievement, idx) => (
                            <li key={idx} className={`flex items-start ${textGrayLightColor} text-xs sm:text-sm`}>
                              <span className="mr-2" style={{ color: timelineColor }}>•</span>
                              <span className="line-clamp-2">{highlightBold(achievement, themeColorValue)}</span>
                            </li>
                          ))}
                          {experience.achievements.length > 2 && (
                            <li className={`${textGrayColor} text-xs sm:text-sm italic`}>
                              +{experience.achievements.length - 2} more achievements
                            </li>
                          )}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {experience.technologies.slice(0, 5).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: hexToRgba(timelineColor, 0.15),
                                color: timelineColor,
                                border: `1px solid ${hexToRgba(timelineColor, 0.25)}`,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {experience.technologies.length > 5 && (
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: hexToRgba(timelineColor, 0.15),
                                color: timelineColor,
                                border: `1px solid ${hexToRgba(timelineColor, 0.25)}`,
                              }}
                            >
                              +{experience.technologies.length - 5}
                            </span>
                          )}
                        </div>

                        {/* View Details Link */}
                        <div className="flex items-center justify-end mt-3 pt-3 border-t" style={{ borderColor: hexToRgba(borderColor, 0.3) }}>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium" style={{ color: themeColorValue }}>
                            <span>View Details</span>
                            <ExternalLinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

