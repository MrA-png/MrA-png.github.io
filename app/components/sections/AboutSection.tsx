'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  GithubIcon, 
  LinkedInIcon, 
  EmailIcon, 
  CommitsIcon, 
  PullRequestsIcon, 
  IssuesIcon, 
  ReposIcon 
} from '../ui/icons';

interface AboutSectionProps {
  // Optional props for customization
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColor = getThemeColor();
  
  // Colors based on theme mode
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textGrayColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const textGrayLightColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = isDarkMode ? '#575757' : '#D1D5DB';
  const placeholderColor = isDarkMode ? '#575757' : '#9CA3AF';
  
  // Gradient colors based on mode
  const gradientBg = isDarkMode 
    ? 'linear-gradient(to bottom, rgba(20, 20, 20, 0.4) 0%, rgba(26, 26, 26, 0.4) 39%, rgba(54, 54, 54, 0.4) 100%)'
    : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(249, 250, 251, 0.4) 39%, rgba(243, 244, 246, 0.4) 100%)';

  // Profile data
  const profileData = {
    title: 'A SOFTWARE ENGINEER',
    name: 'Azhrul Azim Ripai.',
    bio: 'I am a Software Engineer based in Indonesia with a focus on frontend and fullstack development.',
    socialLinks: {
      github: '#',
      linkedin: '#',
      email: '#',
    },
  };

  // Statistics data with SVG icons
  const statistics = [
    { 
      icon: <CommitsIcon />, 
      value: '2,345', 
      label: 'Total Commits' 
    },
    { 
      icon: <PullRequestsIcon />, 
      value: '142', 
      label: 'Pull Requests' 
    },
    { 
      icon: <IssuesIcon />, 
      value: '89', 
      label: 'Total Issues' 
    },
    { 
      icon: <ReposIcon />, 
      value: '24', 
      label: 'Repos', 
      subLabel: 'Contributed to' 
    },
  ];

  // Generate contribution graph data (53 weeks x 7 days = 371 days, but we'll use 365)
  const generateContributionData = () => {
    const weeks = 53;
    const daysPerWeek = 7;
    const data = [];
    
    // Use a seeded random for consistency
    let seed = 12345; // Fixed seed for consistency
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < daysPerWeek; day++) {
        // Random contribution level (0-4) with seeded random
        const level = Math.floor(seededRandom() * 5);
        data.push(level);
      }
    }
    
    // Return only 365 days
    return data.slice(0, 365);
  };

  // Use state to ensure data is only generated on client side
  const [contributionData, setContributionData] = useState<number[]>([]);

  useEffect(() => {
    // Only generate data on client side to avoid hydration mismatch
    setContributionData(generateContributionData());
  }, []);

  const getContributionColor = (level: number) => {
    // Orange color scheme for contribution graph
    const colors = [
      '#161B22', // No contributions
      '#7C2D12', // 1-9 contributions (dark orange)
      '#9A3412', // 10-19 contributions
      '#C2410C', // 20-29 contributions
      '#F97316', // 30+ contributions (bright orange)
    ];
    return colors[level] || colors[0];
  };

  return (
    <section className={`min-h-screen ${bgColor} ${textColor} py-20`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* About Me Title */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-10`}>About Me</h2>
        
        {/* Top Section - Profile and Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left - Profile Information with Container Rectangle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-lg p-6 border"
            style={{ 
              background: gradientBg,
              borderColor: borderColor
            }}
          >
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* Profile Picture Placeholder - Larger size, mengisi tinggi container */}
              <div className="w-40 h-40 lg:w-48 lg:h-full rounded-lg flex-shrink-0" style={{ backgroundColor: placeholderColor }}></div>
              
              {/* Profile Text */}
              <div className="flex flex-col flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`${textGrayColor} text-sm mb-2`}
                >
                  {profileData.title}
                </motion.p>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-4`}
                >
                  {profileData.name}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`${textGrayLightColor} text-base mb-6`}
                >
                  {profileData.bio}
                </motion.p>
                
                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-4 self-end"
                >
                  <a href={profileData.socialLinks.github} className="w-8 h-8 hover:opacity-70 transition-opacity">
                    <GithubIcon />
                  </a>
                  <a href={profileData.socialLinks.linkedin} className="w-8 h-8 hover:opacity-70 transition-opacity">
                    <LinkedInIcon />
                  </a>
                  <a href={profileData.socialLinks.email} className="w-8 h-8 hover:opacity-70 transition-opacity">
                    <EmailIcon />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Skills and Showcase Cards */}
          <div className="flex flex-col gap-4">
            {/* Experience Banner - Card style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-4 border mb-2"
              style={{ 
                background: gradientBg,
                borderColor: borderColor
              }}
            >
              <p className={`${textGrayColor} text-sm`}>
                ENGINEERING{' '}
                <span className={`${textColor} font-semibold`}>WEB & MOBILE APPLICATIONS</span>{' '}
                WITH 3+ YEARS
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Insights Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-lg p-6 border transition-colors cursor-pointer"
                style={{ 
                  background: gradientBg,
                  borderColor: borderColor
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
              >
                {/* Rectangle above INSIGHTS - disesuaikan dengan konten */}
                <div className="w-full h-24 lg:h-28 rounded-lg mb-3" style={{ backgroundColor: placeholderColor }}></div>
                <p className={`${textGrayColor} text-xs mb-2`}>INSIGHTS</p>
                <div className="flex items-center justify-between">
                  <h3 className={`text-2xl font-bold ${textColor}`}>Articles</h3>
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: placeholderColor }}></div>
                </div>
              </motion.div>

              {/* Showcase Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg p-6 border transition-colors cursor-pointer"
                style={{ 
                  background: gradientBg,
                  borderColor: borderColor
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
              >
                {/* Rectangle above SHOWCASE - disesuaikan dengan konten */}
                <div className="w-full h-24 lg:h-28 rounded-lg mb-3" style={{ backgroundColor: placeholderColor }}></div>
                <p className={`${textGrayColor} text-xs mb-2`}>SHOWCASE</p>
                <div className="flex items-center justify-between">
                  <h3 className={`text-2xl font-bold ${textColor}`}>Projects</h3>
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: placeholderColor }}></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contribution Graph Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3 className={`${textGrayColor} text-sm mb-4`}>Contribution Graph (Last Year)</h3>
          
          {/* Graph Grid */}
          <div 
            className="rounded-lg p-6 border overflow-x-auto"
            style={{ 
              background: gradientBg,
              borderColor: borderColor
            }}
          >
            {contributionData.length > 0 ? (
              <div className="inline-grid gap-1 mb-4" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
                {contributionData.map((level, index) => (
                  <div
                    key={index}
                    className="rounded-sm"
                    style={{ 
                      width: '11px',
                      height: '11px',
                      backgroundColor: getContributionColor(level),
                    }}
                    title={`Day ${index + 1}: Level ${level}`}
                  />
                ))}
              </div>
            ) : (
              <div className="inline-grid gap-1 mb-4" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
                {Array.from({ length: 365 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-sm"
                    style={{ 
                      width: '11px',
                      height: '11px',
                      backgroundColor: placeholderColor
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Legend - Bottom left */}
            <div className={`flex items-center gap-2 text-xs ${textGrayColor} mt-4`}>
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: getContributionColor(level) }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg p-6 border transition-colors"
              style={{ 
                background: gradientBg,
                borderColor: borderColor
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = borderColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
            >
              <div className="mb-3" style={{ color: themeColor }}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold ${textColor} mb-1`}>{stat.value}</div>
              <div className={`${textGrayColor} text-sm`}>
                {stat.label}
                {stat.subLabel && (
                  <>
                    <br />
                    {stat.subLabel}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

