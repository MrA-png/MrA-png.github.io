'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { ExternalLinkIcon } from '../ui/icons';
import { projects } from '../../data/projects';

interface ProjectsSectionProps {
  // Optional props for customization
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const router = useRouter();
  const { getThemeColor, isDarkMode, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
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
  const cardBgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  
  const borderColor = hexToRgba(themeColorValue, 0.3);
  
  // Card background color: #18181B with 40% opacity
  const cardBg = 'rgba(24, 24, 27, 0.4)';

  // Handle card click to navigate to detail page
  const handleCardClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const filters = ['All', 'Frontend', 'Fullstack', 'UI Only'];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: 'easeIn' as const,
      },
    },
  };


  return (
    <section className={`min-h-screen ${bgColor} ${textColor} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            {/* Left Side - Title */}
            <div className="flex-1">
              <p className={`${textGrayColor} text-sm mb-2`}>MY WORK</p>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-2`}>
                Featured Projects
              </h2>
              {/* Orange Underline */}
              <div
                className="h-1 w-24"
                style={{ backgroundColor: themeColorValue }}
              />
            </div>

            {/* Right Side - Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter
                      ? 'text-white'
                      : `${textColor} border`
                  }`}
                  style={
                    activeFilter === filter
                      ? {
                          backgroundColor: themeColorValue,
                        }
                      : {
                          borderColor: borderColor,
                        }
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="rounded-lg p-6 border relative group cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                }}
                onClick={() => handleCardClick(project.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = themeColorValue;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
              {/* Category Tag */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10"
                style={{
                  backgroundColor: hexToRgba(themeColorValue, 0.2),
                  color: themeColorValue,
                  border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                }}
              >
                {project.category}
              </div>

              {/* Thumbnail */}
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden relative">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Title */}
              <div className="flex items-center mb-3 pr-20">
                <h3 className={`text-xl font-bold ${textColor} group-hover:opacity-80 transition-opacity`}>
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className={`${textGrayLightColor} text-sm mb-4 leading-relaxed`}>
                {project.tagline}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      color: textGrayLightColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${textGrayColor}`}>
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* View Details Link */}
              <div className="flex items-center justify-end mt-4 pt-4 border-t" style={{ borderColor: borderColor }}>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: themeColorValue }}>
                  <span>View Details</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </div>
              </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

