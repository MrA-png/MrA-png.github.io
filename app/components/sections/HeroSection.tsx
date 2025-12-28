'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { FreelanceBanner } from '../ui/FreelanceBanner';
import { TechStack } from './TechStack';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 max-w-7xl mx-auto pt-24">
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full flex flex-col items-center"
      >
        <motion.div variants={itemVariants}>
          <FreelanceBanner />
        </motion.div>
      
      {/* Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-6 leading-tight px-4"
      >
        <motion.span
          className="glow-text block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Revolutionize Your
        </motion.span>
        <motion.span
          className="glow-text block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Digital Identity
        </motion.span>
      </motion.h1>

      {/* Supporting Paragraph */}
      <motion.p
        variants={itemVariants}
        className="text-gray-400 text-center max-w-2xl mb-10 text-base md:text-lg lg:text-xl leading-relaxed px-4"
      >
        Explore my personal portfolio showcasing real-world experience, selected projects, and thoughtfully crafted web and mobile applications.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 mt-4"
      >
        <Button variant="primary" onClick={() => console.log('Hire Me clicked')}>
          Hire Me
        </Button>
        <Button variant="secondary" onClick={() => console.log('View Projects clicked')}>
          View Projects
        </Button>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <TechStack />
      </motion.div>
      </motion.div>
    </section>
  );
};

