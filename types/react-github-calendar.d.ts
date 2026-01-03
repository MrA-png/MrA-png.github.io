declare module 'react-github-calendar' {
  import { Component } from 'react';

  interface GitHubCalendarProps {
    username: string;
    blockSize?: number;
    blockMargin?: number;
    fontSize?: number;
    weekStart?: number;
    colorScheme?: 'light' | 'dark';
    labels?: {
      totalCount?: string;
      legend?: {
        less?: string;
        more?: string;
      };
    };
  }

  export default class GitHubCalendar extends Component<GitHubCalendarProps> {}
}

