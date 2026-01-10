'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { projects } from '../../data/projects';
import { highlightBold } from '../../utils/highlightBold';
import { 
  ExternalLinkIcon, 
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon
} from '../../components/ui/icons';

interface ProjectDetailClientProps {
  projectId: string;
}

export function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Find project by ID
  const project = projects.find(proj => proj.id === projectId);

  // Get all images from images array only
  const allImages = project?.images && project.images.length > 0
    ? project.images
    : [];

  const hasMultipleImages = allImages.length > 1;

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
    setIsPaused(false);
    setIsModalOpen(false);
    setModalImageIndex(0);
  }, [projectId]);

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
      // Parse start date (format: "1 Maret 2024")
      const startParts = startDate.split(' ');
      const startDay = parseInt(startParts[0]);
      const startMonth = bulanMap[startParts[1]];
      const startYear = parseInt(startParts[2]);

      // Parse end date (format: "30 Juni 2024")
      const endParts = endDate.split(' ');
      const endDay = parseInt(endParts[0]);
      const endMonth = bulanMap[endParts[1]];
      const endYear = parseInt(endParts[2]);

      if (startMonth === undefined || endMonth === undefined || isNaN(startYear) || isNaN(endYear) || isNaN(startDay) || isNaN(endDay)) {
        return '';
      }

      // Create dates
      const start = new Date(startYear, startMonth, startDay);
      const end = new Date(endYear, endMonth, endDay);

      // Calculate difference in days
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 because we count inclusively

      // Calculate difference in months for comparison
      const yearsDiff = endYear - startYear;
      const monthsDiff = endMonth - startMonth;
      let totalMonths = yearsDiff * 12 + monthsDiff;
      
      // Adjust months based on days
      if (endDay < startDay) {
        totalMonths -= 1;
      }
      totalMonths += 1; // +1 because we count inclusively

      // Return appropriate format based on duration (same as experiences)
      if (diffDays < 30) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
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
      return '';
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
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
              {project.title}
            </h1>
            <p className={`text-lg sm:text-xl ${textGrayLightColor} mb-6 leading-relaxed`}>
              {project.tagline}
            </p>

            {/* Image Slider - Below Title */}
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
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
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
                            {allImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setCurrentImageIndex(index);
                                  setIsPaused(true);
                                  setTimeout(() => setIsPaused(false), 3000);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                  index === currentImageIndex ? 'scale-125' : 'opacity-50 hover:opacity-75'
                                }`}
                                style={{
                                  backgroundColor: index === currentImageIndex ? themeColorValue : 'white',
                                }}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>

                          {/* Image Counter */}
                          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full backdrop-blur-sm text-sm font-medium"
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
                      className="text-6xl sm:text-7xl md:text-8xl font-bold opacity-20"
                      style={{ color: themeColorValue }}
                    >
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
            )}

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
                {highlightBold(project.background, themeColorValue)}
              </p>
              <div className="mt-4">
                <h4 className={`font-semibold ${textColor} mb-2`}>Problem:</h4>
                <p className={`${textGrayLightColor} leading-relaxed`}>
                  {highlightBold(project.problem, themeColorValue)}
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
                          {highlightBold(challenge.challenge, themeColorValue)}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColor} mb-1`}>Solution:</h4>
                        <p className={`${textGrayLightColor} leading-relaxed`}>
                          {highlightBold(challenge.solution, themeColorValue)}
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
                      <span className="leading-relaxed">{highlightBold(contribution, themeColorValue)}</span>
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
                {highlightBold(project.result, themeColorValue)}
              </p>
              {project.impact && project.impact.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {project.impact.map((impact, idx) => (
                    <li key={idx} className={`flex items-start ${textGrayLightColor}`}>
                      <span className="mr-3 mt-1" style={{ color: themeColorValue }}>•</span>
                      <span className="leading-relaxed">{highlightBold(impact, themeColorValue)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* 8. Preview & Links */}
          {project.links && project.links.length > 0 && (
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
                  {project.links.map((link, idx) => (
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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isModalOpen && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={handleCloseModal}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-60 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: hexToRgba(themeColorValue, 0.2),
                color: 'white',
              }}
              aria-label="Close modal"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              {hasMultipleImages && (
                <button
                  onClick={() => {
                    setModalImageIndex((prev) => 
                      prev === 0 ? allImages.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: hexToRgba(themeColorValue, 0.3),
                    color: 'white',
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-8 h-8" />
                </button>
              )}

              {/* Image */}
              <motion.img
                key={modalImageIndex}
                src={allImages[modalImageIndex]}
                alt={`${project.title} - Image ${modalImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              {/* Next Button */}
              {hasMultipleImages && (
                <button
                  onClick={() => {
                    setModalImageIndex((prev) => 
                      prev === allImages.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: hexToRgba(themeColorValue, 0.3),
                    color: 'white',
                  }}
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-8 h-8" />
                </button>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div 
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-60 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium"
                  style={{
                    backgroundColor: hexToRgba(themeColorValue, 0.3),
                    color: 'white',
                  }}
                >
                  {modalImageIndex + 1} / {allImages.length}
                </div>
              )}

              {/* Dots Indicator */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-60 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setModalImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === modalImageIndex ? 'scale-125' : 'opacity-50 hover:opacity-75'
                      }`}
                      style={{
                        backgroundColor: index === modalImageIndex ? themeColorValue : 'white',
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

