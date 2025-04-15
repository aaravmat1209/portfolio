"use client";

import LINKS from '@/links'
import { BLOG_POSTS } from './blog-posts'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isHeroExpanded, setIsHeroExpanded] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const fullText = "Hi, I am Aarav Matalia, welcome to my portfolio";
  const typingSpeed = 60; // ms per character
  const sections = ["About", "Experience", "Projects", "Skills", "Blog"]; // Added Experience
  
  const aboutRef = useRef(null);
  const experienceRef = useRef(null); // New ref for Experience section
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const blogRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (!isHeroExpanded) return;
    
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, isHeroExpanded]);

  // Start typing animation when component mounts
  useEffect(() => {
    setTypedText('');
  }, []);

  // Handle section navigation with animation reset
  const scrollToSection = (sectionRef, sectionName) => {
    setIsHeroExpanded(false);
    setActiveSection(sectionName);
    
    // Reset animations by changing the key
    setAnimationKey(prevKey => prevKey + 1);
    
    setTimeout(() => {
      // Show content
      setContentVisible(true);
      
      // Scroll after animations have started
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 800);
    }, 600);
  };

  return (
    <>
      {/* Hero Navbar */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out 
                  ${isHeroExpanded ? 'h-screen bg-color-darkest' : 'h-16 bg-color-dark shadow-lg'}`}
      >
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          {isHeroExpanded ? (
            <>
              <div className="text-accent text-4xl md:text-6xl font-heading mb-12 animate-text-glow min-h-[80px]">
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(
                      section === "About" ? aboutRef : 
                      section === "Experience" ? experienceRef :
                      section === "Projects" ? projectsRef :
                      section === "Skills" ? skillsRef : blogRef,
                      section
                    )}
                    className="border-accent bg-transparent text-accent hover:bg-accent hover:text-main-foreground 
                             rounded-base border-2 px-6 py-3 text-xl font-heading transition-all hover:scale-105"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-between px-4">
              <div className="text-accent font-heading text-xl">Aarav Matalia</div>
              <div className="flex items-center space-x-6">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(
                      section === "About" ? aboutRef : 
                      section === "Experience" ? experienceRef :
                      section === "Projects" ? projectsRef :
                      section === "Skills" ? skillsRef : blogRef,
                      section
                    )}
                    className="text-foreground hover:text-accent transition-all text-sm"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Animation Reset Key */}
      <div 
        key={animationKey} // Add the key here to force remount
        className={`text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px] 
                  transition-all duration-700 ease-in-out transform
                  ${isHeroExpanded ? 'opacity-0 translate-y-10' : 'mt-20'}
                  ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Profile Section with Animations */}
        <div ref={aboutRef} className={`mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px] ${activeSection === 'About' ? 'animate-pulse-subtle' : ''}`}>
          <img
            className="border-accent h-28 w-28 rounded-full border-2 xl:h-[184px] xl:w-[184px] animate-bounce-in animate-float hover-accent-pulse"
            src="/pfp.png"
            alt="profile picture"
          />

          <div className="mt-8">
            <h2 className="font-heading text-3xl sm:text-[44px] text-accent animate-text-glow">
              Aarav Matalia
            </h2>
            <p className="font-base mt-6 text-base sm:text-xl animate-slide-left" 
               style={{ animationDelay: "300ms" }}>
              Hey! Welcome to my portfolio. 
            </p>
          </div>

          {/* About Me Section with Animations */}
          <div className="mt-8 w-full">
            <h2 className="font-heading text-2xl mb-4 sm:text-3xl animate-slide-right text-main"
                style={{ animationDelay: "400ms" }}>
              About Me
            </h2>
            <div className="animate-expand-width overflow-hidden"
                style={{ animationDelay: "600ms" }}>
              <p className="font-base text-base">
                I am a junior Computer Science student at Arizona State University with a passion for developing cloud-native and data-driven solutions. With a focused background in backend development and data analysis, I specialize in architecting data systems and cloud infrastructure that power intuitive applications. My expertise lies in 
                implementing modern technologies to create scalable solutions that deliver exceptional user experiences. I'm also really into hackathons! and of course winning them!!!!!
              </p>
              <p className="font-base text-base mt-4">
                When I'm not coding, you can find me learning about cars, playing badminton, or listening to sick drum covers!
              </p>
            </div>
          </div>

          {!isHeroExpanded && (
            <div className="hidden xl:block animate-bounce-in" style={{ animationDelay: "800ms" }}>
            </div>
          )}
        </div>

        <div className="justify-end xl:flex">
          <div className="w-full xl:w-1/2">
            {/* Social Links Grid with Staggered Animations */}
            <div
              id="grid-container"
              className="text-foreground grid w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:pb-16"
            >
              {Object.keys(LINKS).map((key, index) => (
                <a
                  className="border-accent shadow-shadow text-main-foreground rounded-base bg-main border-2 p-5 
                           hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none 
                           animate-slide-right transition-all-medium hover-accent-pulse"
                  style={{ animationDelay: `${index * 100}ms` }}
                  key={key}
                  target="_blank"
                  href={LINKS[key].link}
                >
                  <img
                    className="h-8 w-8 sm:h-10 sm:w-10 animate-float transition-transform-bounce hover:scale-110"
                    src={LINKS[key].icon.src}
                    alt={LINKS[key].title}
                  />
                  <p className="font-heading mt-3 text-lg sm:text-xl">
                    {LINKS[key].title}
                  </p>
                  <p className="font-base mt-1 text-sm sm:text-base">
                    {LINKS[key].text}
                  </p>
                </a>
              ))}
            </div>

            {/* NEW: Experience Section with Timeline */}
            <div ref={experienceRef} className="mt-16 w-full animate-slide-left" style={{ animationDelay: "400ms" }}>
              <h2 className="font-heading text-2xl mb-6 sm:text-3xl text-main animate-text-glow">
                Professional Experience
              </h2>
              <div className="space-y-8">
                {[
                  {
                    role: "Software Engineer Intern",
                    company: "Amazon Web Services",
                    period: "May 2024 - Aug 2024",
                    location: "Seattle, WA",
                    description: "Working with the AWS Elastic Compute Cloud (EC2) team to enhance cloud infrastructure and services.",
                    skills: ["AWS", "Cloud Infrastructure", "Backend Development"]
                  },
                  {
                    role: "Machine Learning Intern",
                    company: "ASU AI Advancement Center",
                    period: "Jan 2024 - Present",
                    location: "Tempe, AZ",
                    description: "Developing deep learning models for natural language processing and computer vision applications.",
                    skills: ["PyTorch", "NLP", "Computer Vision", "Large Language Models"]
                  },
                  {
                    role: "Software Developer Intern",
                    company: "Tech Innovations LLC",
                    period: "Jun 2023 - Aug 2023",
                    location: "Remote",
                    description: "Developed and maintained web applications using modern JavaScript frameworks.",
                    skills: ["React", "Node.js", "MongoDB", "REST APIs"]
                  },
                ].map((experience, index) => (
                  <div 
                    key={index} 
                    className="border-main shadow-shadow bg-secondary-background rounded-base border-2 p-6 
                             hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-medium 
                             animate-slide-right hover-expand group hover:border-accent"
                    style={{ animationDelay: `${500 + index * 150}ms` }}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h3 className="font-heading text-xl group-hover:text-accent transition-all">
                        {experience.role}
                      </h3>
                      <span className="text-sm text-accent font-medium bg-main px-2 py-1 rounded">
                        {experience.period}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-medium">{experience.company}</span>
                      <span className="text-xs opacity-70">•</span>
                      <span className="text-sm opacity-70">{experience.location}</span>
                    </div>
                    
                    <p className="mt-2 text-sm group-hover:opacity-90 transition-all">
                      {experience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.skills.map((skill, skillIndex) => (
                        <span 
                          key={skill} 
                          className="bg-main text-main-foreground text-xs px-2 py-1 rounded 
                                  transition-transform-bounce group-hover:scale-105 group-hover:bg-accent"
                          style={{ transitionDelay: `${skillIndex * 50}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section with Animated Tags */}
            <div ref={skillsRef} className="mt-16 w-full animate-slide-left" style={{ animationDelay: "400ms" }}>
              <h2 className="font-heading text-2xl mb-6 sm:text-3xl text-main animate-text-glow">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Python', 'AWS Services', 'Flask', 'TensorFlow','Keras', 'JavaScript', 'Node.js', 'React', 'TypeScript', 
                  'Git', 'CSS', 'HTML', 'MongoDB', 'Backend Development', 'Cloud Native Development'].map((skill, index) => (
                  <span 
                    key={skill} 
                    className="border-main bg-secondary-background rounded-base border-2 px-4 py-2 text-sm 
                             hover:bg-accent hover:border-accent hover:text-main-foreground transition-all-medium 
                             animate-rotate-in hover-rotate"
                    style={{ animationDelay: `${600 + index * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects Section with Animated Cards */}
            <div ref={projectsRef} className="mt-16 w-full animate-slide-right" style={{ animationDelay: "300ms" }}>
              <h2 className="font-heading text-2xl mb-6 sm:text-3xl text-main animate-text-glow">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {[
                  {
                    title: "Renvue.ai (Hackathon Winner)",
                    description: "An AI powered marketplace to match investors with startups.",
                    link: "https://renvue.vercel.app/",
                    tech: ["Next.js", "React", "Node.js", "Perplexity AI agent", "HuggingFace Transformers"]
                  },
                  {
                    title: "Gradify.io (Hackathon Winner)",
                    description: "An Gemini based AI autograder that can evaluate multiple assignments based on multimodal inputs and provide feedback.",
                    link: "https://gradifyy.vercel.app/",
                    tech: ["Gemini API", "TypeScript", "React", "OpenAI API"]
                  },
                  {
                    title: "FinScrape",
                    description: "A web scraping Chrome extension that extract financial data from various sources using ensemble machine learning models.",
                    link: "https://github.com/aaravmat1209/FinScrape",
                    tech: ["Yahoo Finance API", "LSTM", "RNNs", "Flask", "JSON"]
                  }
                ].map((project, index) => (
                  <div 
                    key={index} 
                    className="border-main shadow-shadow bg-secondary-background rounded-base border-2 p-6 
                             hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-medium 
                             animate-slide-right hover-expand group hover:border-accent"
                    style={{ animationDelay: `${500 + index * 150}ms` }}
                  >
                    <h3 className="font-heading text-xl group-hover:text-accent transition-all">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm group-hover:opacity-90 transition-all">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={tech} 
                          className="bg-main text-main-foreground text-xs px-2 py-1 rounded 
                                  transition-transform-bounce group-hover:scale-105 group-hover:bg-accent"
                          style={{ transitionDelay: `${techIndex * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-medium text-main hover:text-accent
                                 transition-all opacity-0 group-hover:opacity-100"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Blog Posts Section with Animated Cards */}
            <div ref={blogRef} className="mt-16 w-full animate-slide-right" style={{ animationDelay: "500ms" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl sm:text-3xl text-main animate-text-glow">
                  Recent Thoughts
                </h2>
                <Link
                  href="/blog" 
                  className="border-main bg-secondary-background text-foreground hover:bg-accent hover:border-accent
                           hover:text-main-foreground rounded-base border-2 px-4 py-2 text-sm 
                           transition-all-medium hover-float"
                >
                  View all posts →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {BLOG_POSTS.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="border-main shadow-shadow bg-secondary-background rounded-base border-2 p-5 
                             hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-medium 
                             hover-expand animate-slide-left hover:border-accent group"
                    style={{ animationDelay: `${700 + index * 100}ms` }}
                  >
                    <h3 className="font-heading text-lg group-hover:text-accent transition-all">{post.title}</h3>
                    <p className="text-sm mt-1 opacity-70">{post.date}</p>
                    <p className="mt-3 text-sm">{post.excerpt}</p>
                    <div className="mt-4 text-sm font-medium text-main group-hover:text-accent transition-all">
                      Read more →
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer with Subtle Animation */}
            <footer className="mt-24 border-t border-main pt-8 pb-12 text-sm animate-fade-in-up" 
                   style={{ animationDelay: "900ms" }}>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="hover:text-accent transition-all">© {new Date().getFullYear()} Aarav Matalia. All rights reserved.</p>
                <p className="mt-4 sm:mt-0 hover:text-accent transition-all">Built with Next.js and Tailwind CSS</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}