"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TimeBasedBackground from './content/TimeBasedBackground';

export default function LandingPage() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hello, I am Aarav, welcome to my website!";
  const typingSpeed = 60; // ms per character
  const sections = ["About", "Experience", "Projects", "Skills", "Blog"];
  const [mounted, setMounted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Set typing complete when finished
      setTypingComplete(true);
    }
  }, [typedText]);

  // Start typing animation and set mounted when component mounts
  useEffect(() => {
    setTypedText('');
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50">
      {/* Add the night background */}
      <TimeBasedBackground forcedTime="night" showControls={false} />

      {/* Add floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes - reduced speed until typing completes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className={`absolute rounded-full border-2 border-[#66FCF1]/20 animate-float-slow`}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: typingComplete ? `${Math.random() * 15 + 25}s` : `${Math.random() * 25 + 40}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.15,
              transition: 'animation-duration 2s ease-in-out',
            }}
          />
        ))}

        {/* Glowing orbs - reduced speed until typing completes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-[#66FCF1] to-[#45A29E] blur-lg animate-pulse-slow"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDuration: typingComplete ? `${Math.random() * 3 + 2}s` : `${Math.random() * 6 + 4}s`,
              opacity: 0.4,
              filter: 'blur(8px)',
              transition: 'animation-duration 2s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Add a radial gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0B0C10] opacity-90"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #0B0C10 80%)',
        }}
      />

      <div className="container relative z-10 mx-auto h-full flex flex-col items-center justify-center px-4">
        {/* Main title with glow effect */}
        <div className="relative mb-10 sm:mb-20">
          <div className="text-[#66FCF1] text-4xl sm:text-5xl md:text-7xl font-heading animate-text-glow min-h-[80px] sm:min-h-[120px] text-center relative">
            {typedText}
            <span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Responsive layout for section links - grid on mobile, flex row on desktop */}
        <div className="w-full max-w-[800px]">
          {/* Mobile and tablet layout (grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:hidden">
            {sections.map((section, index) => (
              <Link
                key={`mobile-${section}`}
                href={`/content?section=${section.toLowerCase()}`}
                className={`border-[#66FCF1] bg-transparent/10 backdrop-blur-sm text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0B0C10] 
                        rounded-base border-2 px-4 py-3 text-lg font-heading 
                        transition-all hover:scale-105 text-center w-full
                        ${typingComplete ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: typingComplete ? `${(index + 1) * 200}ms` : '0ms' }}
              >
                {section}
              </Link>
            ))}
          </div>

          {/* Desktop layout (flex row) */}
          <div className="hidden md:flex md:flex-wrap md:justify-center gap-10">
            {sections.map((section, index) => (
              <Link
                key={`desktop-${section}`}
                href={`/content?section=${section.toLowerCase()}`}
                className={`border-[#66FCF1] bg-transparent/10 backdrop-blur-sm text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0B0C10] 
                        rounded-base border-2 px-8 py-4 text-xl font-heading relative group
                        transition-all hover:scale-105 inline-block 
                        ${typingComplete ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: typingComplete ? `${(index + 1) * 200}ms` : '0ms' }}
              >
                {/* Button hover glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] rounded-lg opacity-0 group-hover:opacity-50 blur transition-all duration-300" />
                <span className="relative z-10">{section}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}