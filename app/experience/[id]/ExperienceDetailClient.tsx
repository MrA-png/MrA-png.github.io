'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { experiences } from '../../data/experiences';
import { highlightBold } from '../../utils/highlightBold';
import { 
  MapPinIcon, 
  ExternalLinkIcon, 
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon
} from '../../components/ui/icons';

interface ExperienceDetailClientProps {
  experienceId: string;
}

export function ExperienceDetailClient({ experienceId }: ExperienceDetailClientProps) {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Find experience by ID
  const experience = experiences.find(exp => exp.id === experienceId);

  // Get all images from images array only
  const allImages = experience?.images && experience.images.length > 0
    ? experience.images
    : [];

  const hasMultipleImages = allImages.length > 1;

  // Reset image index when experience changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);
    setIsPaused(false);
    setIsModalOpen(false);
    setModalImageIndex(0);
  }, [experienceId]);

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

  // Helper function to calculate duration from period
  // Supports formats: "Mar 2024 - Jun 2024" or "01 Dec 2025 – 03 Dec 2025" or "30 Jan 2025 - 10 Feb 2025"
  const calculateDurationFromPeriod = (period: string): string => {
    try {
      // Split period by " - " or " – " to get start and end
      const parts = period.split(/\s*[-–]\s*/);
      if (parts.length !== 2) {
        return '';
      }

      const [startStr, endStr] = parts.map(s => s.trim());
      
      // Check if end is "Present"
      if (endStr === 'Present') {
        return 'Ongoing';
      }

      // Map month abbreviations to numbers
      const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };

      // Parse start date - check if it has day (format: "01 Dec 2025" or "30 Jan 2025")
      const startParts = startStr.split(' ');
      let startDay = 1;
      let startMonth: string;
      let startYear: number;

      if (startParts.length === 3 && !isNaN(parseInt(startParts[0]))) {
        // Format with day: "01 Dec 2025"
        startDay = parseInt(startParts[0]);
        startMonth = startParts[1];
        startYear = parseInt(startParts[2]);
      } else if (startParts.length === 2) {
        // Format without day: "Mar 2024"
        startMonth = startParts[0];
        startYear = parseInt(startParts[1]);
      } else {
        return '';
      }

      // Parse end date - check if it has day
      const endParts = endStr.split(' ');
      let endDay = 1;
      let endMonth: string;
      let endYear: number;

      if (endParts.length === 3 && !isNaN(parseInt(endParts[0]))) {
        // Format with day: "03 Dec 2025" or "10 Feb 2025"
        endDay = parseInt(endParts[0]);
        endMonth = endParts[1];
        endYear = parseInt(endParts[2]);
      } else if (endParts.length === 2) {
        // Format without day: "Jun 2024"
        endMonth = endParts[0];
        endYear = parseInt(endParts[1]);
      } else {
        return '';
      }

      const startMonthNum = monthMap[startMonth];
      const endMonthNum = monthMap[endMonth];

      if (startMonthNum === undefined || endMonthNum === undefined || isNaN(startYear) || isNaN(endYear)) {
        return '';
      }

      // Create dates
      const start = new Date(startYear, startMonthNum, startDay);
      const end = new Date(endYear, endMonthNum, endDay);

      // Calculate difference in days
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 because we count inclusively

      // Calculate difference in months for comparison
      const yearsDiff = endYear - startYear;
      const monthsDiff = endMonthNum - startMonthNum;
      let totalMonths = yearsDiff * 12 + monthsDiff;
      
      // Adjust months based on days
      if (endDay < startDay) {
        totalMonths -= 1;
      }
      totalMonths += 1; // +1 because we count inclusively

      // Return appropriate format based on duration
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
      console.error('Error calculating duration from period:', error);
      return '';
    }
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
            {/* Featured Image / Image Slider */}
            {(() => {
              const hasImages = allImages.length > 0 && !imageError;

              return (
                <div 
                  className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 border relative" 
                  style={{ borderColor: borderColor }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {hasImages ? (
                    <>
                      {/* Image Slider */}
                      <div className="relative w-full h-full">
                        <motion.img
                          key={currentImageIndex}
                          src={allImages[currentImageIndex]}
                          alt={`${experience.title} - Image ${currentImageIndex + 1}`}
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
                                // Resume auto-play after 3 seconds of inactivity
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
                                // Resume auto-play after 3 seconds of inactivity
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
                                    // Resume auto-play after 3 seconds of inactivity
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
                        {experience.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

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
                  {highlightBold(experience.companyInfo || '', themeColorValue)}
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
                  {highlightBold(experience.projectOverview || '', themeColorValue)}
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
                      <span className="leading-relaxed">{highlightBold(responsibility, themeColorValue)}</span>
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
                      <span className="leading-relaxed text-base">{highlightBold(achievement, themeColorValue)}</span>
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
              alt={`${experience.title} - Image ${modalImageIndex + 1}`}
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

