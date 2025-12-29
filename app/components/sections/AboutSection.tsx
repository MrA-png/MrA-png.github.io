'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  // Optional props for customization
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
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

  // Statistics data
  const statistics = [
    { icon: '📊', value: '2,345', label: 'Total Commits' },
    { icon: '🔀', value: '142', label: 'Pull Requests' },
    { icon: '⚡', value: '89', label: 'Total Issues' },
    { icon: '📦', value: '24', label: 'Repos', subLabel: 'Contributed to' },
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
    const colors = [
      '#161B22', // No contributions
      '#0E4429', // 1-9 contributions
      '#006D32', // 10-19 contributions
      '#26A641', // 20-29 contributions
      '#39D353', // 30+ contributions
    ];
    return colors[level] || colors[0];
  };

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Profile and Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left - Profile Information */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Picture Placeholder */}
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-800 rounded-lg flex-shrink-0"></div>
            
            {/* Profile Text */}
            <div className="flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-gray-400 text-sm mb-2"
              >
                {profileData.title}
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                {profileData.name}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 text-base mb-6"
              >
                {profileData.bio}
              </motion.p>
              
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-4"
              >
                <a href={profileData.socialLinks.github} className="w-8 h-8 hover:opacity-70 transition-opacity">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href={profileData.socialLinks.linkedin} className="w-8 h-8 hover:opacity-70 transition-opacity">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href={profileData.socialLinks.email} className="w-8 h-8 hover:opacity-70 transition-opacity">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right - Skills and Showcase Cards */}
          <div className="flex flex-col gap-4">
            {/* Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm mb-2"
            >
              ENGINEERING{' '}
              <span className="text-white font-semibold">WEB & MOBILE APPLICATIONS</span>{' '}
              WITH 3+ YEARS
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Insights Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <p className="text-gray-400 text-xs mb-2">INSIGHTS</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Articles</h3>
                  <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                </div>
              </motion.div>

              {/* Showcase Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <p className="text-gray-400 text-xs mb-2">SHOWCASE</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Projects</h3>
                  <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
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
          className="mb-16"
        >
          <h3 className="text-gray-400 text-sm mb-4">Contribution Graph (Last Year)</h3>
          
          {/* Graph Grid */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 overflow-x-auto">
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
                    className="rounded-sm bg-gray-800"
                    style={{ 
                      width: '11px',
                      height: '11px',
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Legend */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
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
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">
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

