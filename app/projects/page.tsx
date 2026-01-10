'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ExternalLinkIcon } from '../components/ui/icons';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  const router = useRouter();
  const { getThemeColor, isDarkMode, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Handle card click to navigate to detail page
  const handleCardClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
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
            {/* Title */}
            <div className="mb-6">
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-2`}>
                All Projects
              </h1>
              {/* Underline */}
              <div
                className="h-1 w-24"
                style={{ backgroundColor: themeColorValue }}
              />
            </div>
            <p className={`${textGrayColor} text-sm mt-4`}>
              {projects.length} projects completed
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeFilter === filter 
                    ? themeColorValue 
                    : isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.1)',
                  color: activeFilter === filter 
                    ? '#FFFFFF' 
                    : textGrayLightColor,
                  border: `1px solid ${activeFilter === filter ? themeColorValue : borderColor}`,
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.borderColor = themeColorValue;
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="rounded-lg p-6 border group cursor-pointer transition-all duration-300"
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
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: hexToRgba(themeColorValue, 0.2),
                        color: themeColorValue,
                        border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                      }}
                    >
                      {project.category}
                    </span>
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
                  <h3 className={`text-xl font-bold ${textColor} mb-3 leading-tight group-hover:opacity-80 transition-opacity`}>
                    {project.title}
                  </h3>

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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className={`${textGrayColor} text-lg`}>
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

