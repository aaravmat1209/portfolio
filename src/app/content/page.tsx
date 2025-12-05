"use client";

import { Suspense, useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LINKS from '@/links';
import { BLOG_POSTS } from '../blog-posts';
import { getFeaturedProjects, Project, PROJECTS } from '../projects-data';
import SplitText from '@/components/SplitText';
import GradientText from '@/components/GradientText';
import Dock from '@/components/Dock';
import ChromaGrid, { ChromaItem } from '@/components/ChromaGrid';
import Timeline from '@/components/Timeline';
import LogoLoop from '@/components/LogoLoop';
import CardSwap, { Card } from '@/components/CardSwap';
import BlogCardSwap, { BlogCardSwapRef } from '@/components/BlogCardSwap';
import { Home, User, Briefcase, Code, BookOpen, Github, Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

type Experience = {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    skills: string[];
};

// Move static data outside component to prevent recreation on every render
const EXPERIENCES: Experience[] = [
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

const PROJECT_COLORS = [
    { border: '#4F46E5', gradient: 'linear-gradient(145deg, #4F46E5, #000)' },
    { border: '#10B981', gradient: 'linear-gradient(210deg, #10B981, #000)' },
    { border: '#F59E0B', gradient: 'linear-gradient(165deg, #F59E0B, #000)' },
    { border: '#EF4444', gradient: 'linear-gradient(195deg, #EF4444, #000)' },
    { border: '#8B5CF6', gradient: 'linear-gradient(225deg, #8B5CF6, #000)' },
    { border: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #000)' },
    { border: '#EC4899', gradient: 'linear-gradient(180deg, #EC4899, #000)' },
    { border: '#14B8A6', gradient: 'linear-gradient(150deg, #14B8A6, #000)' },
];


function ContentPageInner() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('About');
    const searchParams = useSearchParams();

    const aboutRef = useRef<HTMLDivElement | null>(null);
    const experienceRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const skillsRef = useRef<HTMLDivElement | null>(null);
    const blogRef = useRef<HTMLDivElement | null>(null);
    const blogCardSwapRef = useRef<BlogCardSwapRef>(null);

    useEffect(() => {
        setMounted(true);
        const section = searchParams.get('section');
        if (section) {
            const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);
            setActiveSection(formattedSection);
            setTimeout(() => {
                const sectionRef =
                    section === 'about' ? aboutRef :
                        section === 'experience' ? experienceRef :
                            section === 'projects' ? projectsRef :
                                section === 'skills' ? skillsRef : blogRef;
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1000);
        }
    }, [searchParams]);

    const scrollToSection = useCallback((
        sectionRef: React.RefObject<HTMLDivElement | null>,
        sectionName: string
    ): void => {
        setActiveSection(sectionName);
        setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }, []);

    // Memoize expensive computations
    const chromaItems: ChromaItem[] = useMemo(() => PROJECTS.map((project, index) => {
        const colorIndex = index % PROJECT_COLORS.length;
        return {
            image: project.image || '/project-placeholder.jpg',
            title: project.title,
            subtitle: project.tech.slice(0, 2).join(', '),
            handle: project.featured ? '⭐ Featured' : `${project.tech.length} technologies`,
            location: project.github ? 'View on GitHub' : undefined,
            borderColor: PROJECT_COLORS[colorIndex].border,
            gradient: PROJECT_COLORS[colorIndex].gradient,
            url: project.link || project.github
        };
    }), []);

    const dockItems = useMemo(() => [
        {
            icon: <Home className="w-6 h-6 text-[var(--primary)]" />,
            label: "Home",
            onClick: () => window.location.href = '/'
        },
        {
            icon: <User className="w-6 h-6 text-[var(--primary)]" />,
            label: "About",
            onClick: () => scrollToSection(aboutRef, 'About')
        },
        {
            icon: <Briefcase className="w-6 h-6 text-[var(--primary)]" />,
            label: "Experience",
            onClick: () => scrollToSection(experienceRef, 'Experience')
        },
        {
            icon: <Code className="w-6 h-6 text-[var(--primary)]" />,
            label: "Projects",
            onClick: () => scrollToSection(projectsRef, 'Projects')
        },
        {
            icon: <BookOpen className="w-6 h-6 text-[var(--primary)]" />,
            label: "Blog",
            onClick: () => scrollToSection(blogRef, 'Blog')
        }
    ], [scrollToSection]);

    if (!mounted) {
        return (
            <div className="relative w-full min-h-screen bg-[var(--background)] flex items-center justify-center">
                <div className="text-[var(--primary)] text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full min-h-screen bg-[var(--background)]">
                {/* Simple gradient background instead of DotGrid */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C10] via-[var(--surface)]/20 to-[var(--background)]" />
                </div>

                {/* Gradient Overlay */}
                <div
                    className="fixed inset-0 z-10 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(11, 12, 16, 0.5) 70%, rgba(11, 12, 16, 0.8) 100%)',
                    }}
                />

                {/* Main Content */}
                <div className="relative z-10 container mx-auto px-4 py-12">
                    {/* Profile Section */}
                    <div ref={aboutRef} className="max-w-4xl mx-auto mb-20">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full opacity-75 blur"></div>
                                <img
                                    className="relative h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-[var(--surface)] object-cover"
                                    src="/pfp.png"
                                    alt="Aarav Matalia"
                                />
                            </div>

                            {/* Name and Title */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4">
                                    Aarav Matalia
                                </h1>
                                <GradientText
                                    colors={['var(--primary)', 'var(--accent)', 'var(--primary)']}
                                    animationSpeed={6}
                                    className="text-xl md:text-2xl font-semibold"
                                >
                                    Cloud Developer and Data Enthusiast
                                </GradientText>
                            </div>
                        </div>

                        {/* About Me Card */}
                        <div className="bg-[var(--surface)]/80 backdrop-blur-sm border-2 border-[var(--surface)] rounded-xl p-6 md:p-8
                        hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20">
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">About Me</h2>
                            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-4">
                                I am a junior Computer Science student at Arizona State University with a passion for developing cloud-native
                                and data-driven solutions. With a focused background in backend development and data analysis, I specialize in
                                architecting data systems and cloud infrastructure that power intuitive applications. My expertise lies in
                                implementing modern technologies to create scalable solutions that deliver exceptional user experiences.
                                I'm also really into hackathons! and love participating!!!!! My team and I have won 3 till now! it's an amazing feeling.
                            </p>
                            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
                                When I'm not coding, you can find me learning about cars, playing badminton, or listening to sick drum covers!
                            </p>
                        </div>
                    </div>

                    {/* Tech Stack Section */}
                    <div ref={skillsRef} className="max-w-6xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-8 text-center">
                            Tech Stack
                        </h2>
                        <LogoLoop
                            logos={[
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'AWS' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', alt: 'Flask' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', alt: 'TensorFlow' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker' },
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
                            ]}
                            speed={30}
                            direction="left"
                            pauseOnHover={true}
                        />
                    </div>



                    {/* Experience Section */}
                    <div ref={experienceRef} className="w-full mx-auto mb-20">
                        <div className="max-w-4xl mx-auto mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] text-center mb-3">
                                Professional Experience
                            </h2>
                            <p className="text-[var(--muted)] text-center text-lg">
                                My journey through tech and innovation
                            </p>
                        </div>

                        <Timeline items={EXPERIENCES} />
                    </div>


                    {/* Projects Section with ChromaGrid */}
                    <div ref={projectsRef} className="w-full mx-auto mb-20">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">
                                My Projects
                            </h2>
                            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
                                Explore my portfolio of innovative projects spanning AI/ML, web development, and cloud solutions
                            </p>
                        </div>
                        <div className="min-h-[600px]">
                            <ChromaGrid
                                items={chromaItems}
                                radius={350}
                                damping={0.5}
                                fadeOut={0.7}
                                className="py-8"
                            />
                        </div>
                    </div>

                    {/* Blog Section */}
                    <div ref={blogRef} className="max-w-6xl mx-auto mb-20">
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">
                                    Recent Thoughts
                                </h2>
                                {/* Navigation Arrows - Inline with title */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => blogCardSwapRef.current?.prev()}
                                        className="w-12 h-12 rounded-full bg-[var(--surface)] border-2 border-[var(--primary)]/30 
                                        text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] 
                                        transition-all duration-300 text-xl font-bold
                                        hover:scale-110 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/50
                                        flex items-center justify-center"
                                        aria-label="Previous blog post"
                                    >
                                        <ChevronLeft size={24} strokeWidth={3} />
                                    </button>
                                    <button
                                        onClick={() => blogCardSwapRef.current?.next()}
                                        className="w-12 h-12 rounded-full bg-[var(--surface)] border-2 border-[var(--primary)]/30 
                                        text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] 
                                        transition-all duration-300 text-xl font-bold
                                        hover:scale-110 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/50
                                        flex items-center justify-center"
                                        aria-label="Next blog post"
                                    >
                                        <ChevronRight size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-[var(--muted)] text-lg">
                                Exploring ideas in tech, development, and innovation
                            </p>
                        </div>

                        <div className="min-h-[500px] flex items-center justify-end">
                            <BlogCardSwap
                                ref={blogCardSwapRef}
                                posts={BLOG_POSTS}
                                width={650}
                                height={400}
                            />
                        </div>
                    </div>

                    {/* Footer with Social Links */}
                    <footer className="w-full py-12 border-t border-[var(--surface)] mt-20">
                        <div className="flex flex-col items-center gap-8">
                            <div className="flex gap-8">
                                {Object.keys(LINKS).map((key) => (
                                    <a
                                        key={key}
                                        href={LINKS[key].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-[var(--surface)] border border-[var(--primary)]/30 text-[var(--primary)] 
                                        hover:bg-[var(--primary)] hover:text-[var(--background)] transition-all duration-300
                                        hover:scale-110 hover:shadow-lg hover:shadow-[var(--primary)]/20"
                                        aria-label={LINKS[key].title}
                                    >
                                        <img
                                            src={LINKS[key].icon.src}
                                            alt={LINKS[key].title}
                                            className="w-6 h-6"
                                            style={{ filter: 'currentColor' }}
                                        />
                                    </a>
                                ))}
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-[var(--primary)] font-medium text-lg">
                                    Let's build something amazing together
                                </p>
                                <p className="text-[var(--muted)] text-sm opacity-60">
                                    © {new Date().getFullYear()} Aarav Matalia. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Dock Navigation - Fixed at bottom with high z-index */}
            <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Dock
                        items={dockItems}
                        className="bg-[var(--surface)]/80 backdrop-blur-lg"
                        magnification={80}
                        distance={180}
                        baseItemSize={56}
                    />
                </div>
            </div>
        </>
    );
}

export default function ContentPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[var(--background)] text-[var(--primary)]">Loading content...</div>}>
            <ContentPageInner />
        </Suspense>
    );
}
