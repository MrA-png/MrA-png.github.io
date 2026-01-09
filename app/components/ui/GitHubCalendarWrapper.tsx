'use client';

import React, { useState, useEffect } from 'react';

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

export const GitHubCalendarWrapper: React.FC<GitHubCalendarWrapperProps> = (props) => {
  const [CalendarComponent, setCalendarComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="w-full" style={{ minWidth: '100%' }}>
      <CalendarComponent {...props} />
    </div>
  );
};

