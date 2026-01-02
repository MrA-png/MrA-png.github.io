'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useActiveNav = (sectionIds: string[]) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    // If we're on a different page (not home), set active based on pathname
    if (pathname === '/articles') {
      setActiveSection('articles');
      return;
    }

    // If we're on home page, use scroll-based detection
    if (pathname === '/') {
      const updateActiveSection = () => {
        // Check if we're at the top of the page
        if (window.scrollY < 150) {
          setActiveSection('home');
          return;
        }

        // Find which section's top is closest to the top of viewport (with header offset)
        const headerOffset = 100;
        const viewportTop = window.scrollY + headerOffset;
        
        let activeId = 'home';
        let closestDistance = Infinity;

        sectionIds.forEach((id) => {
          const element = document.getElementById(id);
          if (!element) return;

          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Check if section is in viewport
          if (elementTop <= viewportTop && elementBottom >= viewportTop) {
            const distance = Math.abs(elementTop - (viewportTop - headerOffset));
            if (distance < closestDistance) {
              closestDistance = distance;
              activeId = id;
            }
          }
        });

        // If no section found, find the one that's just passed
        if (activeId === 'home' && closestDistance === Infinity) {
          sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const elementTop = element.offsetTop;
            if (elementTop < viewportTop && elementTop > 0) {
              const distance = viewportTop - elementTop;
              if (distance < closestDistance) {
                closestDistance = distance;
                activeId = id;
              }
            }
          });
        }

        setActiveSection(activeId);
      };

      // Initial check
      updateActiveSection();

      // Use Intersection Observer for more accurate detection
      const observers: IntersectionObserver[] = [];
      const sectionStates = new Map<string, { isIntersecting: boolean; ratio: number }>();

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              sectionStates.set(id, {
                isIntersecting: entry.isIntersecting,
                ratio: entry.intersectionRatio,
              });

              // Find the section with highest intersection ratio that's intersecting
              let maxRatio = 0;
              let mostVisibleId = 'home';

              sectionStates.forEach((state, sectionId) => {
                if (state.isIntersecting && state.ratio > maxRatio) {
                  maxRatio = state.ratio;
                  mostVisibleId = sectionId;
                }
              });

              // Only update if we have a valid intersecting section
              if (maxRatio > 0.1) {
                setActiveSection(mostVisibleId);
              } else if (window.scrollY < 150) {
                setActiveSection('home');
              }
            });
          },
          {
            rootMargin: '-100px 0px -60% 0px', // Trigger when section is in upper-middle part of viewport
            threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0],
          }
        );

        observer.observe(element);
        observers.push(observer);
      });

      // Also listen to scroll for immediate updates
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        observers.forEach((observer) => observer.disconnect());
        window.removeEventListener('scroll', onScroll);
      };
    } else {
      // Default to home for other pages
      setActiveSection('home');
    }
  }, [sectionIds, pathname]);

  return activeSection;
};

