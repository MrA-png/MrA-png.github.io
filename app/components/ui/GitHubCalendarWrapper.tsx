'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface GitHubCalendarWrapperProps {
  username: string;
  blockSize?: number;
  blockMargin?: number;
  fontSize?: number;
  weekStart?: number;
  colorScheme?: 'light' | 'dark';
  year?: number | 'last';
  transformData?: (data: any[]) => any[];
  labels?: {
    totalCount?: string;
    legend?: {
      less?: string;
      more?: string;
    };
  };
}

interface ContributionData {
  date: string;
  count: number;
  level: number;
}

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

// Format date to "June 4th" format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  
  return `${month} ${getOrdinal(day)}`;
};

// Format tooltip text
const formatTooltip = (count: number, date: string): string => {
  if (count === 0) {
    return `No contributions on ${formatDate(date)}`;
  }
  return `${count} ${count === 1 ? 'Contribution' : 'Contributions'} on ${formatDate(date)}`;
};

export const GitHubCalendarWrapper: React.FC<GitHubCalendarWrapperProps> = (props) => {
  const { isDarkMode } = useTheme();
  const [CalendarComponent, setCalendarComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contributionsData, setContributionsData] = useState<Map<string, ContributionData>>(new Map());
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', x: 0, y: 0 });
  const calendarRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Fetch contributions data from API
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${props.username}`);
        const data = await response.json();
        
        if (data.contributions && Array.isArray(data.contributions)) {
          const contributionsMap = new Map<string, ContributionData>();
          data.contributions.forEach((contribution: ContributionData) => {
            contributionsMap.set(contribution.date, contribution);
          });
          setContributionsData(contributionsMap);
        }
      } catch (error) {
        console.error('Failed to fetch contributions data:', error);
      }
    };

    fetchContributions();
  }, [props.username]);

  useEffect(() => {
    // Load component only on client side
    import('react-github-calendar')
      .then((mod: any) => {
        // Handle different export formats
        const Component = mod.default || mod.GitHubCalendar || mod;
        setCalendarComponent(() => Component);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load GitHub Calendar:', error);
        setIsLoading(false);
      });
  }, []);

  // Setup tooltip event handlers after calendar renders
  useEffect(() => {
    if (!calendarRef.current || contributionsData.size === 0 || isLoading) return;

    const setupTooltips = () => {
      const svg = calendarRef.current?.querySelector('svg');
      if (!svg) return;

      // Get all rects in the calendar (filter out legend rects)
      const rects = Array.from(svg.querySelectorAll('rect')).filter((rect) => {
        // Filter out rects that are likely part of the legend
        const parent = rect.parentElement;
        return parent && !parent.classList.contains('legend');
      });

      const handleMouseEnter = (e: MouseEvent) => {
        const rect = e.currentTarget as SVGRectElement;
        let date: string | null = null;
        
        // Method 1: Check data-date attribute (if we set it previously)
        date = rect.getAttribute('data-date');
        
        // Method 2: Extract from title attribute (react-github-calendar default format)
        if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const title = rect.getAttribute('title');
          if (title) {
            // Extract date from title - look for YYYY-MM-DD pattern
            const dateMatch = title.match(/(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) {
              date = dateMatch[1];
            }
          }
        }

        // Skip if we still can't find a valid date
        if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return;
        }

        // Get contribution data from our API data
        const contribution = contributionsData.get(date);
        const count = contribution ? contribution.count : 0;
        const tooltipText = formatTooltip(count, date);
        
        // Store date for future reference
        rect.setAttribute('data-date', date);
        
        // Calculate tooltip position relative to viewport
        // Position tooltip above the rect (centered horizontally, above vertically)
        const rectBox = rect.getBoundingClientRect();
        const tooltipX = rectBox.left + rectBox.width / 2; // Center of the rect horizontally
        // Position tooltip above the rect - we'll use top edge and transform will move it up
        const tooltipY = rectBox.top; // Top edge of the rect
        
        setTooltip({
          visible: true,
          text: tooltipText,
          x: tooltipX,
          y: tooltipY
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = e.currentTarget as SVGRectElement;
        const rectBox = rect.getBoundingClientRect();
        
        setTooltip(prev => ({
          ...prev,
          x: rectBox.left + rectBox.width / 2,
          y: rectBox.top
        }));
      };

      const handleMouseLeave = () => {
        setTooltip({ visible: false, text: '', x: 0, y: 0 });
      };

      // Add event listeners to all rects
      rects.forEach((rect) => {
        // Check if already has listeners (to avoid duplicates)
        if (rect.hasAttribute('data-tooltip-setup')) {
          return;
        }
        
        rect.setAttribute('data-tooltip-setup', 'true');
        rect.addEventListener('mouseenter', handleMouseEnter);
        rect.addEventListener('mousemove', handleMouseMove);
        rect.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Wait for calendar to render, then setup tooltips
    const timeouts: NodeJS.Timeout[] = [];
    [200, 500, 1000, 2000].forEach((delay) => {
      const timeout = setTimeout(setupTooltips, delay);
      timeouts.push(timeout);
    });
    
    // Also setup when calendar content changes
    const observer = new MutationObserver(() => {
      setTimeout(setupTooltips, 100);
    });
    
    if (calendarRef.current) {
      observer.observe(calendarRef.current, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    // Also setup on window resize
    const handleResize = () => {
      setTimeout(setupTooltips, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [contributionsData, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-gray-400">Loading contribution graph...</div>
      </div>
    );
  }

  if (!CalendarComponent) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-red-400">Failed to load contribution graph</div>
      </div>
    );
  }

  // Determine tooltip colors based on theme mode
  const tooltipBg = isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)';
  const tooltipTextColor = isDarkMode ? '#000000' : '#FFFFFF';
  const tooltipShadow = isDarkMode 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
    : '0 4px 12px rgba(0, 0, 0, 0.4)';

  // Render tooltip using Portal to ensure it's above everything
  const tooltipElement = tooltip.visible ? (
    <div
      ref={tooltipRef}
      className="github-calendar-custom-tooltip"
      style={{
        position: 'fixed',
        left: typeof window !== 'undefined' 
          ? `${Math.max(10, Math.min(tooltip.x, window.innerWidth - (tooltipRef.current?.offsetWidth || 200) - 10))}px`
          : `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        transform: 'translate(-50%, calc(-100% - 8px))',
        background: tooltipBg,
        color: tooltipTextColor,
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 500,
        pointerEvents: 'none',
        zIndex: 99999,
        whiteSpace: 'nowrap',
        boxShadow: tooltipShadow,
        fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
        lineHeight: '1.4',
        transition: 'opacity 0.2s ease',
        isolation: 'isolate'
      }}
    >
      {tooltip.text}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `5px solid ${tooltipBg}`,
          marginTop: '3px'
        }}
      />
    </div>
  ) : null;

  return (
    <>
      <div ref={calendarRef} className="w-full" style={{ minWidth: '100%', position: 'relative' }}>
        <CalendarComponent {...props} />
      </div>
      {typeof window !== 'undefined' && tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

