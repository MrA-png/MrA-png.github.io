'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  GithubIcon,
  LinkedInIcon,
  EmailIcon,
} from '../ui/icons';

interface ContactSectionProps {
  // Optional props for customization
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const { getThemeColor, isDarkMode, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
  
  const borderColor = hexToRgba(themeColorValue, 0.3);
  
  // Card background color: glass effect for light mode, dark for dark mode
  const cardBg = isDarkMode ? 'rgba(24, 24, 27, 0.4)' : 'rgba(255, 255, 255, 0.3)';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Reset status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    // Create email content
    const emailSubject = formData.subject.trim() || `Message from ${formData.name}`;
    const emailBody = `Hello Azhrul,

${formData.message}

---
From: ${formData.name}
Email: ${formData.email}
${formData.subject ? `Subject: ${formData.subject}` : ''}`;

    // Encode email content for mailto link
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:work.azhrul@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    }, 500);
  };


  return (
    <section className={`min-h-screen ${bgColor} ${textColor} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4`}>
            <span className={textColor}>Let's Work </span>
            <span style={{ color: themeColorValue }}>Together</span>
          </h2>
          <p className={`${textGrayLightColor} text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4`}>
            Have a project in mind or just want to chat? Feel free to reach out. I'm currently available for freelance projects and open to full-time opportunities.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-lg p-4 sm:p-6 border"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
              }}
            >
              {/* Email */}
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-2">
                  <div className="mt-1">
                    <EnvelopeIcon style={{ color: themeColorValue }} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${textColor} mb-1`}>Email</p>
                    <p className={textColor}>work.azhrul@gmail.com</p>
                    <p className={`${textGrayColor} text-sm mt-1`}>
                      Response time: &lt; 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-2">
                  <div className="mt-1">
                    <MapPinIcon style={{ color: themeColorValue }} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${textColor} mb-1`}>Location</p>
                    <p className={textColor}>Indonesia</p>
                    <p className={`${textGrayColor} text-sm mt-1`}>
                      Remote / Relocate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect with me */}
            <div className="mt-6">
              <p className={`${textColor} font-medium mb-4`}>Connect with me:</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/MrA-png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: textColor,
                    color: textColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = themeColorValue;
                    e.currentTarget.style.color = themeColorValue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = textColor;
                    e.currentTarget.style.color = textColor;
                  }}
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/azhrul-azim-ripai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: textColor,
                    color: textColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = themeColorValue;
                    e.currentTarget.style.color = themeColorValue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = textColor;
                    e.currentTarget.style.color = textColor;
                  }}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:work.azhrul@gmail.com"
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: textColor,
                    color: textColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = themeColorValue;
                    e.currentTarget.style.color = themeColorValue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = textColor;
                    e.currentTarget.style.color = textColor;
                  }}
                  aria-label="Email"
                >
                  <EmailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Send a Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
              }}
            >
              <h3 className={`text-xl font-bold ${textColor} mb-6`}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block ${textColor} text-sm font-medium mb-2`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg ${textColor} border focus:outline-none focus:ring-2 transition-all`}
                      style={{
                        backgroundColor: cardBg,
                        borderColor: borderColor,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = themeColorValue;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = borderColor;
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block ${textColor} text-sm font-medium mb-2`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-lg ${textColor} border focus:outline-none focus:ring-2 transition-all`}
                      style={{
                        backgroundColor: cardBg,
                        borderColor: borderColor,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = themeColorValue;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = borderColor;
                      }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className={`block ${textColor} text-sm font-medium mb-2`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                    className={`w-full px-4 py-3 rounded-lg ${textColor} border focus:outline-none focus:ring-2 transition-all`}
                    style={{
                      backgroundColor: cardBg,
                      borderColor: borderColor,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = themeColorValue;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = borderColor;
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={`block ${textColor} text-sm font-medium mb-2`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg ${textColor} border focus:outline-none focus:ring-2 transition-all resize-none`}
                    style={{
                      backgroundColor: cardBg,
                      borderColor: borderColor,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = themeColorValue;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = borderColor;
                    }}
                  />
                </div>

                {/* Submit Status Message */}
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: hexToRgba('#ef4444', 0.1), color: '#ef4444' }}>
                    Please fill in all required fields (Name, Email, and Message).
                  </div>
                )}
                {submitStatus === 'success' && (
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: hexToRgba('#10b981', 0.1), color: '#10b981' }}>
                    Email client opened! Please send the message from your email client.
                  </div>
                )}

                {/* Send Message Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: themeColorValue,
                  }}
                >
                  {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
                  <PaperAirplaneIcon />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

