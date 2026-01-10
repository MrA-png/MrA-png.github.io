'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { projects } from '../../data/projects';
import { 
  ExternalLinkIcon, 
  ArrowRightIcon 
} from '../../components/ui/icons';

interface ProjectDetailClientProps {
  projectId: string;
}

export function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();

  // Find project by ID
  const project = projects.find(proj => proj.id === projectId);

  // If project not found, redirect or show error
  if (!project) {
    return (
      <div 
        className="min-h-screen transition-colors duration-300 flex items-center justify-center"
        style={{
          backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
          color: isDarkMode ? '#FFFFFF' : '#000000'
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
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

  // Helper function to calculate duration from start and end date
  const calculateDuration = (startDate: string, endDate?: string): string => {
    if (!endDate) {
      return 'Ongoing';
    }

    // Map bulan Indonesia ke angka
    const bulanMap: { [key: string]: number } = {
      'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3,
      'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7,
      'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    };

    try {
      // Parse start date
      const startParts = startDate.split(' ');
      const startDay = parseInt(startParts[0]);
      const startMonth = bulanMap[startParts[1]];
      const startYear = parseInt(startParts[2]);

      // Parse end date
      const endParts = endDate.split(' ');
      const endDay = parseInt(endParts[0]);
      const endMonth = bulanMap[endParts[1]];
      const endYear = parseInt(endParts[2]);

      const start = new Date(startYear, startMonth, startDay);
      const end = new Date(endYear, endMonth, endDay);

      // Calculate difference in months
      const yearsDiff = endYear - startYear;
      const monthsDiff = endMonth - startMonth;
      const daysDiff = endDay - startDay;

      let totalMonths = yearsDiff * 12 + monthsDiff;
      if (daysDiff < 0) {
        totalMonths -= 1;
      }

      if (totalMonths < 1) {
        // Calculate days if less than a month
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7) {
          return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7);
          return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
        } else {
          return '1 month';
        }
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
      console.error('Error calculating duration:', error);
      return 'N/A';
    }
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
            <span>Back to Projects</span>
          </motion.button>

          {/* 1. Project Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Featured Image */}
            {(project.image || project.thumbnail) && (
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 border" style={{ borderColor: borderColor }}>
                <img
                  src={project.image || project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
            )}

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
              {project.title}
            </h1>
            <p className={`text-lg sm:text-xl ${textGrayLightColor} mb-6 leading-relaxed`}>
              {project.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className={`${textGrayColor} text-sm`}>Role:</span>
                <span className={`${textColor} font-medium ml-2`}>{project.role}</span>
              </div>
              <span className={`${textGrayColor} text-sm`}>•</span>
              <div>
                <span className={`${textGrayColor} text-sm`}>Start Date:</span>
                <span className={`${textColor} font-medium ml-2`}>{project.startDate}</span>
              </div>
              {project.endDate && (
                <>
                  <span className={`${textGrayColor} text-sm`}>•</span>
                  <div>
                    <span className={`${textGrayColor} text-sm`}>End Date:</span>
                    <span className={`${textColor} font-medium ml-2`}>{project.endDate}</span>
                  </div>
                </>
              )}
              <span className={`${textGrayColor} text-sm`}>•</span>
              <div>
                <span className={`${textGrayColor} text-sm`}>Duration:</span>
                <span className={`${textColor} font-medium ml-2`}>
                  {calculateDuration(project.startDate, project.endDate)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 2. Background / Context */}
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
              <h3 className={`text-xl font-bold ${textColor} mb-4`}>Background / Context</h3>
              <p className={`${textGrayLightColor} leading-relaxed mb-4`}>
                {project.background}
              </p>
              <div className="mt-4">
                <h4 className={`font-semibold ${textColor} mb-2`}>Problem:</h4>
                <p className={`${textGrayLightColor} leading-relaxed`}>
                  {project.problem}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3. Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
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
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>Challenges & Solutions</h3>
                <div className="space-y-6">
                  {project.challenges.map((challenge, idx) => (
                    <div key={idx} className="border-l-2 pl-4" style={{ borderColor: themeColorValue }}>
                      <div className="mb-2">
                        <h4 className={`font-semibold ${textColor} mb-1`}>Challenge:</h4>
                        <p className={`${textGrayLightColor} leading-relaxed`}>
                          {challenge.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColor} mb-1`}>Solution:</h4>
                        <p className={`${textGrayLightColor} leading-relaxed`}>
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. My Contribution */}
          {project.contributions && project.contributions.length > 0 && (
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
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>My Contribution</h3>
                <ul className="space-y-3">
                  {project.contributions.map((contribution, idx) => (
                    <li key={idx} className={`flex items-start ${textGrayLightColor}`}>
                      <span className="mr-3 mt-1" style={{ color: themeColorValue }}>•</span>
                      <span className="leading-relaxed">{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* 5. Tech Stack */}
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
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold ${textColor} mb-2 text-sm`}>Technologies:</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
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
                {project.tools && project.tools.length > 0 && (
                  <div>
                    <h4 className={`font-semibold ${textColor} mb-2 text-sm`}>Tools:</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: hexToRgba(themeColorValue, 0.2),
                            color: themeColorValue,
                            border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.services && project.services.length > 0 && (
                  <div>
                    <h4 className={`font-semibold ${textColor} mb-2 text-sm`}>Services:</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: hexToRgba(themeColorValue, 0.2),
                            color: themeColorValue,
                            border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                          }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* 6. Project Info */}
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
              <h3 className={`text-xl font-bold ${textColor} mb-4`}>Project Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`${textGrayColor} text-sm w-32`}>Project Type:</span>
                  <span className={`${textColor} font-medium`}>{project.projectType}</span>
                </div>
                {project.client && (
                  <div className="flex items-center gap-2">
                    <span className={`${textGrayColor} text-sm w-32`}>Client:</span>
                    <span className={`${textColor} font-medium`}>{project.client}</span>
                  </div>
                )}
                {project.company && (
                  <div className="flex items-center gap-2">
                    <span className={`${textGrayColor} text-sm w-32`}>Company:</span>
                    <span className={`${textColor} font-medium`}>{project.company}</span>
                  </div>
                )}
                {project.partner && (
                  <div className="flex items-center gap-2">
                    <span className={`${textGrayColor} text-sm w-32`}>Partner:</span>
                    <span className={`${textColor} font-medium`}>{project.partner}</span>
                  </div>
                )}
                {project.teamSize && (
                  <div className="flex items-center gap-2">
                    <span className={`${textGrayColor} text-sm w-32`}>Team Size:</span>
                    <span className={`${textColor} font-medium`}>{project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* 7. Result / Impact */}
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
              <h3 className={`text-xl font-bold ${textColor} mb-4`}>Result / Impact</h3>
              <p className={`${textGrayLightColor} leading-relaxed mb-4`}>
                {project.result}
              </p>
              {project.impact && project.impact.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {project.impact.map((impact, idx) => (
                    <li key={idx} className={`flex items-start ${textGrayLightColor}`}>
                      <span className="mr-3 mt-1" style={{ color: themeColorValue }}>•</span>
                      <span className="leading-relaxed">{impact}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* 8. Preview & Links */}
          {(project.liveDemo || project.repository) && (
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
                <h3 className={`text-xl font-bold ${textColor} mb-4`}>Preview & Links</h3>
                <div className="flex flex-wrap gap-3">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                      style={{
                        backgroundColor: hexToRgba(themeColorValue, 0.2),
                        color: themeColorValue,
                        border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                      }}
                    >
                      <span>Live Demo</span>
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                      style={{
                        backgroundColor: hexToRgba(themeColorValue, 0.2),
                        color: themeColorValue,
                        border: `1px solid ${hexToRgba(themeColorValue, 0.3)}`,
                      }}
                    >
                      <span>Repository</span>
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  )}
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

