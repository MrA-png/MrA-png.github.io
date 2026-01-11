'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../contexts/ThemeContext';
import { GitHubCalendarWrapper } from '../ui/GitHubCalendarWrapper';
import { 
  GithubIcon, 
  LinkedInIcon, 
  EmailIcon, 
  CommitsIcon, 
  PullRequestsIcon, 
  IssuesIcon, 
  ReposIcon,
  BookIcon,
  ExternalLinkIcon
} from '../ui/icons';
import { ArticlesIllustration, ProjectsIllustration } from '../ui';

interface AboutSectionProps {
  // Optional props for customization
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const router = useRouter();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColor = getThemeColor();
  
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
  const placeholderColor = isDarkMode ? '#575757' : '#9CA3AF';
  
  // Border color using theme color with opacity
  const borderColor = hexToRgba(themeColor, 0.5);
  
  // Gradient colors based on mode with theme color
  const gradientBg = isDarkMode 
    ? `linear-gradient(to bottom, rgba(20, 20, 20, 0.4) 0%, ${hexToRgba(themeColor, 0.15)} 39%, ${hexToRgba(themeColor, 0.25)} 100%)`
    : `linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, ${hexToRgba(themeColor, 0.1)} 39%, ${hexToRgba(themeColor, 0.15)} 100%)`;

  // Profile data
  const profileData = {
    title: 'A SOFTWARE ENGINEER',
    name: 'Azhrul Azim Ripai.',
    bio: 'I am a Software Engineer based in Indonesia with a focus on frontend and fullstack development.',
    socialLinks: {
      github: 'https://github.com/MrA-png',
      linkedin: 'https://www.linkedin.com/in/azhrul-azim-ripai',
      email: 'mailto:work.azhrul@gmail.com',
    },
  };

  // GitHub statistics state
  const [githubStats, setGithubStats] = useState({
    commits: null as string | null,
    pullRequests: null as string | null,
    issues: null as string | null,
    repos: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch GitHub statistics
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = 'mra-png';
        
        // Fetch user profile and repos
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        ]);
        
        const user = await userResponse.json();
        const repos = await reposResponse.json();
        
        if (Array.isArray(repos)) {
          // Count public repos (excluding forks)
          const publicRepos = repos.filter((repo: any) => !repo.fork && !repo.private).length;
          
          // Get stats from user's public repos
          // For commits, we'll use a simpler approach - count from contribution graph data
          // For PRs and Issues, we'll count from repos
          let totalPRs = 0;
          let totalIssues = 0;
          
          // Sample repos to avoid rate limiting (check first 5 repos)
          const sampleRepos = repos.slice(0, 5);
          
          for (const repo of sampleRepos) {
            try {
              // Get PRs count
              const prsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/pulls?state=all&per_page=1`);
              const prsLink = prsResponse.headers.get('link');
              if (prsLink) {
                const match = prsLink.match(/page=(\d+)>; rel="last"/);
                if (match) {
                  totalPRs += parseInt(match[1]);
                }
              }
              
              // Get issues count (excluding PRs)
              const issuesResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/issues?state=all&per_page=1`);
              const issuesLink = issuesResponse.headers.get('link');
              if (issuesLink) {
                const match = issuesLink.match(/page=(\d+)>; rel="last"/);
                if (match) {
                  totalIssues += parseInt(match[1]);
                }
              }
            } catch (error) {
              // Continue if individual repo fails
              console.error(`Error fetching stats for ${repo.name}:`, error);
            }
          }
          
          // Format numbers
          const formatNumber = (num: number) => {
            if (num >= 1000) {
              return (num / 1000).toFixed(1) + 'k';
            }
            return num.toLocaleString();
          };
          
          // For commits, we'll estimate based on repos or use a reasonable default
          // You can also fetch from GitHub contribution API if needed
          const estimatedCommits = publicRepos * 50; // Rough estimate
          
          setGithubStats({
            commits: formatNumber(estimatedCommits),
            pullRequests: formatNumber(totalPRs) || '10+',
            issues: formatNumber(totalIssues) || '5+',
            repos: publicRepos.toString() || '0',
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Set default values on error
        setGithubStats({
          commits: '500+',
          pullRequests: '10+',
          issues: '5+',
          repos: '10+',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  // Statistics data with SVG icons
  const statistics = [
    { 
      icon: <CommitsIcon />, 
      value: githubStats.commits, 
      label: 'Total Commits' 
    },
    { 
      icon: <PullRequestsIcon />, 
      value: githubStats.pullRequests, 
      label: 'Pull Requests' 
    },
    { 
      icon: <IssuesIcon />, 
      value: githubStats.issues, 
      label: 'Total Issues' 
    },
    { 
      icon: <ReposIcon />, 
      value: githubStats.repos, 
      label: 'Repos', 
      subLabel: 'Contributed to' 
    },
  ];

  // Handle navigation to articles page
  const handleArticlesClick = () => {
    router.push('/articles');
  };

  // Handle smooth scroll to projects section
  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={`min-h-screen ${bgColor} ${textColor} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* About Me Title */}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-6 sm:mb-8 md:mb-10`}>About Me</h2>
        
        {/* Top Section - Profile and Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Left - Profile Information with Container Rectangle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-lg p-4 sm:p-6 border"
            style={{ 
              background: gradientBg,
              borderColor: borderColor
            }}
          >
            <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6">
              {/* Profile Picture */}
              <div className="w-full sm:w-40 h-64 sm:h-40 lg:w-48 lg:h-full rounded-lg flex-shrink-0 overflow-hidden mx-auto sm:mx-0">
                <img 
                  src="/assets/images/profile.png" 
                  alt="Profile Picture" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.backgroundColor = placeholderColor;
                  }}
                />
              </div>
              
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
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-3 sm:mb-4`}
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
                  <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:opacity-70 transition-opacity">
                    <GithubIcon />
                  </a>
                  <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:opacity-70 transition-opacity">
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
              className="rounded-lg p-3 sm:p-4 border mb-2"
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
                className="rounded-lg p-4 sm:p-6 border transition-colors cursor-pointer"
                style={{ 
                  background: gradientBg,
                  borderColor: borderColor
                }}
                onClick={handleArticlesClick}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
              >
                {/* Articles Illustration */}
                <div className="w-full h-20 sm:h-24 lg:h-28 rounded-lg mb-3 flex items-center justify-center overflow-hidden border" style={{ backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.7)' : 'rgba(245, 245, 245, 0.8)', borderColor: hexToRgba(themeColor, 0.3) }}>
                  <ArticlesIllustration style={{ color: themeColor }} />
                </div>
                <p className={`${textGrayColor} text-xs mb-2`}>INSIGHTS</p>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl sm:text-2xl font-bold ${textColor}`}>Articles</h3>
                  <div className="w-10 h-10 flex items-center justify-center" style={{ color: themeColor }}>
                    <BookIcon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              {/* Showcase Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg p-4 sm:p-6 border transition-colors cursor-pointer"
                style={{ 
                  background: gradientBg,
                  borderColor: borderColor
                }}
                onClick={handleProjectsClick}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
              >
                {/* Projects Illustration */}
                <div className="w-full h-20 sm:h-24 lg:h-28 rounded-lg mb-3 flex items-center justify-center overflow-hidden border" style={{ backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.7)' : 'rgba(245, 245, 245, 0.8)', borderColor: hexToRgba(themeColor, 0.3) }}>
                  <ProjectsIllustration style={{ color: themeColor }} />
                </div>
                <p className={`${textGrayColor} text-xs mb-2`}>SHOWCASE</p>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl sm:text-2xl font-bold ${textColor}`}>Projects</h3>
                  <div className="w-10 h-10 flex items-center justify-center" style={{ color: themeColor }}>
                    <ExternalLinkIcon className="w-6 h-6" />
                  </div>
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
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className={`${textGrayColor} text-xs sm:text-sm`}>
              Contributions in the last year
            </h3>
            <a
              href="https://github.com/mra-png"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs sm:text-sm font-medium transition-colors hover:opacity-80 underline`}
              style={{ color: themeColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              View on GitHub
            </a>
          </div>
          
          {/* GitHub Calendar */}
          <div 
            className="rounded-lg p-4 sm:p-6 border"
            style={{ 
              background: gradientBg,
              borderColor: borderColor,
              position: 'relative',
              overflow: 'visible'
            }}
          >
            <div className="overflow-x-auto" style={{ position: 'relative', overflowY: 'visible' }}>
            <div className="flex justify-center w-full" style={{ position: 'relative', overflow: 'visible' }}>
              <div 
                className="github-calendar-wrapper w-full"
                style={{
                  colorScheme: isDarkMode ? 'dark' : 'light',
                  minWidth: '100%',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <GitHubCalendarWrapper
                  username="mra-png"
                  blockSize={16}
                  blockMargin={6}
                  fontSize={13}
                  weekStart={1}
                  colorScheme={isDarkMode ? 'dark' : 'light'}
                  year="last"
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                    legend: {
                      less: 'Less',
                      more: 'More'
                    }
                  }}
                />
              </div>
            </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg p-4 sm:p-6 border transition-colors"
              style={{ 
                background: gradientBg,
                borderColor: borderColor
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = borderColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = borderColor}
            >
              <div className="mb-2 sm:mb-3" style={{ color: themeColor }}>
                {stat.icon}
              </div>
              {stat.value === null ? (
                <div className="mb-1">
                  <div 
                    className={`h-8 sm:h-9 w-20 sm:w-24 rounded shimmer-loading ${isDarkMode ? 'bg-white/15' : 'bg-black/15'}`}
                  />
                </div>
              ) : (
                <div className={`text-2xl sm:text-3xl font-bold ${textColor} mb-1`}>{stat.value}</div>
              )}
              <div className={`${textGrayColor} text-xs sm:text-sm`}>
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
