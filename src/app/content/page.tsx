"use client";

import LINKS from '@/links'
import { BLOG_POSTS } from '../blog-posts'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFeaturedProjects, Project } from '../projects-data';

// Define types for experience
type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
};

export default function ContentPage() {
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const searchParams = useSearchParams();

  // Refs for scrolling to sections
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

  const sections = ["About", "Experience", "Projects", "Skills", "Blog"];

  // Check for section parameter on initial load
  useEffect(() => {
    const section = searchParams.get('section');

    if (section) {
      const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);
      setActiveSection(formattedSection);

      // Show content with animation
      setTimeout(() => {
        setContentVisible(true);

        // Scroll to the appropriate section after a delay
        setTimeout(() => {
          const sectionRef =
            section === 'about' ? aboutRef :
              section === 'experience' ? experienceRef :
                section === 'projects' ? projectsRef :
                  section === 'skills' ? skillsRef : blogRef;

          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
      }, 300);
    } else {
      // No section specified, default to showing content
      setContentVisible(true);
      setActiveSection('About');
    }
  }, [searchParams]);

  // Handle section navigation
  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement>, 
    sectionName: string
  ): void => {
    setActiveSection(sectionName);

    // Reset animations
    setAnimationKey(prevKey => prevKey + 1);

    // Scroll to section
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  };

  // Define experiences array with proper typing
  const experiences: Experience[] = [
    {
      role: "Cloud Developer",
      company: "AWS Cloud Innovation Center",
      period: "Apr 2025 - Present",
      location: "Scottsdale, AZ",
      description: "Building scalable AI/ML solutions on AWS for public sector use cases using cloud infrastructure.",
      skills: ["AWS", "Cloud Infrastructure", "Backend Development"]
    },
    {
      role: "Machine Learning Intern",
      company: "ChargeZone",
      period: "Aug 2024 - Dec 2024",
      location: "Tempe, AZ",
      description: "Developed EV charging data pipeline & analysis to drive insights and business strategy",
      skills: ["Python", "ML Modelling", "Data Preprocessing", "Data pipelines"]
    },
    {
      role: "Technology Intern",
      company: "Hitachi Energy",
      period: "Jun 2024 - Aug 2024",
      location: "Remote",
      description: "Enhanced Hitachi's Magshare with AI/Blockchain solutions, including a smart contract POC and a time-saving AI chatbot",
      skills: ["React", "Node.js", "MongoDB", "REST APIs"]
    },
  ];

  // Get featured projects with proper typing
  const featuredProjects: Project[] = getFeaturedProjects();

  return (
    <>
      {/* Fixed Navbar - Improved for mobile */}
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-color-dark shadow-lg">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link
            href="/"
            className="text-accent font-heading text-lg sm:text-xl hover:scale-105 transition-all whitespace-nowrap mr-2"
          >
            Aarav Matalia
          </Link>
          <div className="flex items-center overflow-x-auto scrollbar-hide py-2 -mx-1">
          {sections.map((section) => (
  <button
    key={section}
    onClick={() => {
      // Use type assertion to tell TypeScript this is the correct type
      const ref = (
        section === "About" ? aboutRef :
        section === "Experience" ? experienceRef :
        section === "Projects" ? projectsRef :
        section === "Skills" ? skillsRef : 
        blogRef
      ) as React.RefObject<HTMLDivElement>;
      
      scrollToSection(ref, section);
    }}
    className={`transition-all text-xs sm:text-sm px-2 sm:px-3 mx-1 whitespace-nowrap ${activeSection === section ? 'text-accent' : 'text-foreground hover:text-accent'}`}
  >
    {section}
  </button>
))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        key={animationKey}
        className={`text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px] 
                  transition-all duration-700 ease-in-out transform mt-20
                  ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Profile Section with Animations */}
        <div ref={aboutRef} className={`mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px] ${activeSection === 'About' ? 'animate-pulse-subtle' : ''}`}>
          <div className="relative inline-block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-cyan-400 rounded-full opacity-75 blur"></div>
            <img
              className="relative h-28 w-28 rounded-full border-2 border-accent xl:h-[184px] xl:w-[184px] animate-float object-cover"
              src="/pfp.png"
              alt="profile picture"
            />
          </div>

          <div className="mt-8">
            <h2 className="font-heading text-3xl sm:text-[44px] text-accent animate-text-glow">
              Aarav Matalia
            </h2>
            <p className="font-base mt-6 text-base sm:text-xl animate-slide-left"
              style={{ animationDelay: "300ms" }}>
              Cloud Developer and Data Enthusiast
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
                implementing modern technologies to create scalable solutions that deliver exceptional user experiences. I&#39;m also really into hackathons! and of course winning them!!!!!
              </p>
              <p className="font-base text-base mt-4">
                When I&#39;mnot coding, you can find me learning about cars, playing badminton, or listening to sick drum covers!
              </p>
            </div>
          </div>

          {/* Skills Section - MOVED HERE below About Me */}
          <div ref={skillsRef} className="mt-12 w-full animate-slide-left" style={{ animationDelay: "700ms" }}>
            <h2 className="font-heading text-2xl mb-4 sm:text-3xl text-main animate-text-glow">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Python', 'AWS', 'Flask', 'Tensorflow', 'Keras', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Cloud Development', 'API Development'].map((skill, index) => (
                <span
                  key={skill}
                  className="border-main bg-secondary-background rounded-base border px-3 py-1 text-xs 
                           hover:bg-accent hover:border-accent hover:text-main-foreground transition-all-medium 
                           animate-fade-in"
                  style={{ animationDelay: `${800 + index * 50}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Return to Intro Button - MOVED HERE below Skills */}
          <div className="mt-8 w-full animate-slide-left" style={{ animationDelay: "900ms" }}>
            <Link
              href="/"
              className="border-accent bg-transparent text-accent hover:bg-accent hover:text-main-foreground 
                       rounded-base border-2 px-4 py-2 text-sm font-medium transition-all hover:scale-105 flex items-center w-fit"
            >
              <span className="mr-1">←</span> Return to Intro
            </Link>
          </div>
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
                {experiences.map((experience, index) => (
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

            {/* Projects Section with Animated Cards */}
            <div ref={projectsRef} className="mt-16 w-full animate-slide-right" style={{ animationDelay: "300ms" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl mb-0 sm:text-3xl text-main animate-text-glow">
                  Featured Projects
                </h2>
                <Link
                  href="/projects"
                  className="border-main bg-secondary-background text-foreground hover:bg-accent hover:border-accent
               hover:text-main-foreground rounded-base border-2 px-4 py-2 text-sm 
               transition-all-medium hover-float"
                >
                  View all projects →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
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
                        target={project.link.startsWith('http') ? "_blank" : "_self"}
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
          </div>
        </div>
      </div>

      {/* Footer with Subtle Animation */}
      <footer className="w-full border-t border-main pt-8 pb-12 text-sm animate-fade-in-up mt-24 bg-color-dark"
        style={{ animationDelay: "900ms" }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="hover:text-accent transition-all">© {new Date().getFullYear()} Aarav Matalia. All rights reserved.</p>
            <p className="mt-4 sm:mt-0 hover:text-accent transition-all">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}