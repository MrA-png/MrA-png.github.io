import React from 'react';
import { customHighlightWords, customHighlightPatterns } from '../config/highlightWords';

/**
 * Utility function to highlight bold certain words in text
 * Uses patterns from highlightWords.ts configuration
 * 
 * @param text - The text to highlight
 * @param themeColorValue - The theme color for highlighted text
 * @returns React.ReactNode with highlighted text
 */
export const highlightBold = (text: string, themeColorValue: string): React.ReactNode => {
  // Build custom words pattern if there are any custom words
  const customWordsPattern = customHighlightWords.length > 0
    ? new RegExp(`\\b(${customHighlightWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
    : null;
  
  // Combine all patterns from configuration
  const patterns = [
    // Custom words from configuration
    ...(customWordsPattern ? [customWordsPattern] : []),
    // Custom regex patterns from configuration
    ...customHighlightPatterns,
  ];

  let result: React.ReactNode[] = [];
  let lastIndex = 0;
  let parts: Array<{ text: string; shouldBold: boolean }> = [];

  // Find all matches
  const matches: Array<{ index: number; length: number }> = [];
  patterns.forEach(pattern => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length });
    }
  });

  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);

  // Remove overlapping matches (keep the first one)
  const nonOverlapping: Array<{ index: number; length: number }> = [];
  matches.forEach(match => {
    const overlaps = nonOverlapping.some(existing => 
      match.index < existing.index + existing.length && 
      match.index + match.length > existing.index
    );
    if (!overlaps) {
      nonOverlapping.push(match);
    }
  });

  // Build parts array
  nonOverlapping.forEach(match => {
    if (match.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, match.index), shouldBold: false });
    }
    parts.push({ text: text.substring(match.index, match.index + match.length), shouldBold: true });
    lastIndex = match.index + match.length;
  });

  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), shouldBold: false });
  }

  // If no matches, return original text
  if (parts.length === 0) {
    return text;
  }

  // Build React elements
  return parts.map((part, index) => {
    if (part.shouldBold) {
      return (
        <strong key={index} style={{ color: themeColorValue }}>
          {part.text}
        </strong>
      );
    }
    return <span key={index}>{part.text}</span>;
  });
};

