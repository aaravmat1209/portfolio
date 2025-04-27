"use client";
import LINKS from '@/links';
import { BLOG_POSTS } from '../blog-posts';
import Link from 'next/link';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFeaturedProjects, Project } from '../projects-data';
import TimeBasedBackground, { useTimeContext } from './TimeBasedBackground';

// Define types for experience
type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
};

function ContentPageInner() {
  const { timeOfDay, colors } = useTimeContext();
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const searchParams = useSearchParams();

  // Refs for scrolling to sections (notice HTMLDivElement | null)
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const blogRef = useRef<HTMLDivElement | null>(null);

  const sections = ["About", "Experience", "Projects", "Skills", "Blog"];

  // Check for section parameter on initial load
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);
      setActiveSection(formattedSection);
      setTimeout(() => {
        setContentVisible(true);
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
      setContentVisible(true);
      setActiveSection('About');
    }
  }, [searchParams]);

  // Handle section navigation, updated parameter type to include null
  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement | null>,
    sectionName: string
  ): void => {
    setActiveSection(sectionName);
    setAnimationKey(prevKey => prevKey + 1);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      {/* Time-based background - force night mode */}
      <TimeBasedBackground showControls={false} forcedTime="night" />

      {/* Fixed Navbar */}
      <div className={`fixed top-0 left-0 w-full z-50 h-16 ${colors.background}/80 backdrop-blur-sm shadow-lg`}>
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link
            href="/"
            className={`${colors.headings} font-heading text-lg sm:text-xl hover:scale-105 transition-all whitespace-nowrap mr-2`}
          >
            Aarav Matalia
          </Link>
          <div className="flex items-center overflow-x-auto scrollbar-hide py-2 -mx-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  const ref =
                    section === "About" ? aboutRef :
                      section === "Experience" ? experienceRef :
                        section === "Projects" ? projectsRef :
                          section === "Skills" ? skillsRef : blogRef;
                  scrollToSection(ref, section);
                }}
                className={`transition-all text-xs sm:text-sm px-2 sm:px-3 mx-1 whitespace-nowrap ${activeSection === section ? colors.accent : `${colors.text} hover:${colors.accent}`}`}
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
        className={`${colors.text} relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px] transition-all duration-700 ease-in-out transform mt-20 z-10 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Profile Section */}
        <div ref={aboutRef} className={`mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px] ${activeSection === 'About' ? 'animate-pulse-subtle' : ''}`}>
          <div className="relative inline-block">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-[var(--color-accent)] to-cyan-400 rounded-full opacity-75 blur`}></div>
            <img
              className={`relative h-28 w-28 rounded-full border-2 ${colors.border} xl:h-[184px] xl:w-[184px] animate-float object-cover`}
              src="/pfp.png"
              alt="profile picture"
            />
          </div>

          <div className="mt-8">
            <h2 className={`font-heading text-3xl sm:text-[44px] ${colors.headings} animate-text-glow`}>
              Aarav Matalia
            </h2>
            <p className={`font-base mt-6 text-base sm:text-xl animate-slide-left`} style={{ animationDelay: "300ms" }}>
              Cloud Developer and Data Enthusiast
            </p>
          </div>

          {/* About Me Section */}
          <div className="mt-8 w-full">
            <h2 className={`font-heading text-2xl mb-4 sm:text-3xl ${colors.headings}`} style={{ animationDelay: "400ms" }}>
              About Me
            </h2>
            <div
              className={`
      ${colors.border} shadow-shadow ${colors.secondary} 
      rounded-base border-2 p-6 transition-all-medium
      hover:translate-x-1 hover:translate-y-1 hover:border-[var(--color-accent)]
    `}
              style={{ animationDelay: "600ms" }}
            >
              <p className="font-base text-base">
                I am a junior Computer Science student at Arizona State University with a passion for developing cloud-native and data-driven solutions. With a focused background in backend development and data analysis, I specialize in architecting data systems and cloud infrastructure that power intuitive applications. My expertise lies in implementing modern technologies to create scalable solutions that deliver exceptional user experiences. I&#39;m also really into hackathons! and love participating!!!!! My team and I have won 3 till now! it&#39;s an amazing feeling.
              </p>
              <p className="font-base text-base mt-4">
                When I&#39;m not coding, you can find me learning about cars, playing badminton, or listening to sick drum covers!
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="mt-12 w-full animate-slide-left" style={{ animationDelay: "700ms" }}>
            <h2 className={`font-heading text-2xl mb-4 sm:text-3xl ${colors.headings} animate-text-glow`}>
              Skills
            </h2>
            <div
              className={`
      ${colors.border} shadow-shadow ${colors.secondary} 
      rounded-base border-2 p-6 transition-all-medium
      hover:translate-x-1 hover:translate-y-1 hover:border-[var(--color-accent)]
    `}
            >
              <div className="flex flex-wrap gap-2">
                {['Python', 'AWS', 'Flask', 'Tensorflow', 'Keras', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Cloud Development', 'API Development'].map((skill, index) => (
                  <span
                    key={skill}
                    className={`
            ${colors.background} text-[#66FCF1]
            rounded-base px-3 py-1 text-xs
            hover:bg-[var(--color-accent)] hover:text-black
            transition-all-medium animate-fade-in
          `}
                    style={{ animationDelay: `${800 + index * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Return to Intro Button */}
          <div className="mt-8 w-full animate-slide-left" style={{ animationDelay: "900ms" }}>
            <Link
              href="/"
              className={`
                border-2 ${colors.accent} bg-transparent
                hover:bg-[var(--color-accent)] hover:${colors.headings}
                rounded-base px-4 py-2 text-sm font-medium transition-all hover:scale-105 flex items-center w-fit
              `}
            >
              <span className="mr-1">←</span> Return to Intro
            </Link>
          </div>
        </div>

        <div className="justify-end xl:flex">
          <div className="w-full xl:w-1/2">
            {/* Social Links Grid */}
            <div id="grid-container" className={`${colors.text} grid w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:pb-16`}>
              {Object.keys(LINKS).map((key, index) => (
                <a
                  className={`
                    ${colors.border} shadow-shadow ${colors.background} 
                    rounded-base ${colors.border} border-2 p-5 
                    hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none 
                    animate-slide-right transition-all-medium hover-accent-pulse
                  `}
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

            {/* Experience Section */}
            <div ref={experienceRef} className="mt-16 w-full animate-slide-left" style={{ animationDelay: "400ms" }}>
              <h2 className={`font-heading text-2xl mb-6 sm:text-3xl ${colors.headings} animate-text-glow`}>
                Professional Experience
              </h2>
              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <div
                    key={index}
                    className={`
          ${colors.border} shadow-shadow ${colors.secondary} 
          rounded-base border-2 p-6 hover:translate-x-1 hover:translate-y-1 
          hover:shadow-none transition-all-medium animate-slide-right 
          hover-expand group hover:border-[var(--color-accent)]
        `}
                    style={{ animationDelay: `${500 + index * 150}ms` }}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h3 className={`font-heading text-xl transition-all group-hover:${colors.accent}`}>
                        {experience.role}
                      </h3>
                      <span className={`text-sm ${colors.accent} font-medium ${colors.background} px-2 py-1 rounded`}>
                        {experience.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-medium">{experience.company}</span>
                      <span className="text-xs opacity-70">•</span>
                      <span className="text-sm opacity-70">{experience.location}</span>
                    </div>
                    <p className="mt-2 transition-all group-hover:opacity-90 text-sm">
                      {experience.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.skills.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className={`
                ${colors.background} text-[#66FCF1]
                rounded-base px-3 py-1 text-xs
                hover:bg-[var(--color-accent)] hover:text-black
                transition-all-medium animate-fade-in
              `}
                          style={{ animationDelay: `${800 + skillIndex * 50}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Projects Section */}
            <div ref={projectsRef} className="mt-16 w-full animate-slide-right" style={{ animationDelay: "300ms" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`font-heading text-2xl mb-0 sm:text-3xl ${colors.headings} animate-text-glow`}>
                  Featured Projects
                </h2>
                <Link
                  href="/projects"
                  className={`
        ${colors.border} ${colors.secondary} ${colors.text} 
        hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]
        hover:${colors.headings} rounded-base border-2 px-4 py-2 text-sm 
        transition-all-medium hover-float
      `}
                >
                  View all projects →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`
          ${colors.border} shadow-shadow ${colors.secondary} 
          rounded-base border-2 p-6 hover:translate-x-1 hover:translate-y-1 
          hover:shadow-none transition-all-medium animate-slide-right 
          hover-expand group hover:border-[var(--color-accent)]
        `}
                    style={{ animationDelay: `${500 + index * 150}ms` }}
                  >
                    <h3 className={`font-heading text-xl transition-all group-hover:${colors.accent}`}>
                      {project.title}
                    </h3>
                    <p className="mt-2 transition-all group-hover:opacity-90 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className={`
                ${colors.background} text-[#66FCF1]
                rounded-base px-3 py-1 text-xs
                hover:bg-[var(--color-accent)] hover:text-black
                transition-all-medium animate-fade-in
              `}
                          style={{ animationDelay: `${800 + techIndex * 50}ms` }}
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
                        className={`mt-4 inline-block text-sm font-medium transition-all group-hover:opacity-100 ${colors.accent} hover:${colors.headings}`}
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Blog Posts Section */}
            <div ref={blogRef} className="mt-16 w-full animate-slide-right" style={{ animationDelay: "500ms" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`font-heading text-2xl sm:text-3xl ${colors.headings} animate-text-glow`}>
                  Recent Thoughts
                </h2>
                <Link
                  href="/blog"
                  className={`
                    ${colors.border} ${colors.secondary} ${colors.text} 
                    hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]
                    hover:${colors.headings} rounded-base border-2 px-4 py-2 text-sm 
                    transition-all-medium hover-float
                  `}
                >
                  View all posts →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {BLOG_POSTS.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className={`
                      ${colors.border} shadow-shadow ${colors.secondary} 
                      rounded-base border-2 p-5 hover:translate-x-1 hover:translate-y-1 
                      hover:shadow-none transition-all-medium hover-expand animate-slide-left group
                      hover:border-[var(--color-accent)]
                    `}
                    style={{ animationDelay: `${700 + index * 100}ms` }}
                  >
                    <h3 className={`font-heading text-lg transition-all group-hover:${colors.accent}`}>
                      {post.title}
                    </h3>
                    <p className="text-sm mt-1 opacity-70">{post.date}</p>
                    <p className="mt-3 text-sm">{post.excerpt}</p>
                    <div className={`mt-4 text-sm font-medium transition-all group-hover:text-[var(--color-accent)] ${colors.accent}`}>
                      Read more →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`w-full border-t ${colors.border} pt-8 pb-12 text-sm animate-fade-in-up mt-24 ${colors.background}/80 backdrop-blur-sm z-10 relative`}
        style={{ animationDelay: "900ms" }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`transition-all hover:${colors.accent}`}>© {new Date().getFullYear()} Aarav Matalia. All rights reserved.</p>
            <p className={`mt-4 sm:mt-0 transition-all hover:${colors.accent}`}>Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={<div>Loading content...</div>}>
      <ContentPageInner />
    </Suspense>
  );
}
