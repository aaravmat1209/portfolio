"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hello, I am Aarav, welcome to my website!";
  const typingSpeed = 60; // ms per character
  const sections = ["About", "Experience", "Projects", "Skills", "Blog"];

  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Start typing animation when component mounts
  useEffect(() => {
    setTypedText('');
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-color-darkest z-50">
      <div className="container mx-auto h-full flex flex-col items-center justify-center px-4">
        <div className="text-accent text-4xl sm:text-5xl md:text-7xl font-heading mb-10 sm:mb-20 animate-text-glow min-h-[80px] sm:min-h-[120px] text-center">
          {typedText}
          <span className="animate-pulse">|</span>
        </div>
        
        {/* Responsive layout for section links - grid on mobile, flex row on desktop */}
        <div className="w-full max-w-[800px]">
          {/* Mobile and tablet layout (grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:hidden">
            {sections.map((section) => (
              <Link
                key={`mobile-${section}`}
                href={`/content?section=${section.toLowerCase()}`}
                className="border-accent bg-transparent text-accent hover:bg-accent hover:text-main-foreground 
                        rounded-base border-2 px-4 py-3 text-lg font-heading 
                        transition-all hover:scale-105 text-center w-full"
              >
                {section}
              </Link>
            ))}
          </div>
          
          {/* Desktop layout (flex row) */}
          <div className="hidden md:flex md:flex-wrap md:justify-center gap-10">
            {sections.map((section) => (
              <Link
                key={`desktop-${section}`}
                href={`/content?section=${section.toLowerCase()}`}
                className="border-accent bg-transparent text-accent hover:bg-accent hover:text-main-foreground 
                        rounded-base border-2 px-8 py-4 text-xl font-heading 
                        transition-all hover:scale-105 inline-block"
              >
                {section}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}