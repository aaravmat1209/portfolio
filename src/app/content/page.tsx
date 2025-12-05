'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    ChevronRight, ChevronLeft, ArrowRight,
    Menu, X, Play, User, Github, FileText, Mail
} from 'lucide-react';
import { SiGithub, SiLinkedin, SiMedium, SiInstagram } from 'react-icons/si';
import LogoLoop from '@/components/LogoLoop';
import Timeline from '@/components/Timeline';
import BlogCardSwap, { BlogCardSwapRef } from '@/components/BlogCardSwap';
import GradientText from '@/components/GradientText';
import ChromaGrid, { ChromaItem } from '@/components/ChromaGrid';
import { PROJECTS, Project } from '../projects-data';
import { BLOG_POSTS } from '../blog-posts';
import LINKS from '../../links';

// Mouse position hook for cursor effect
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};

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

const EXPERIENCES = [
    {
        role: "Cloud Developer",
        company: "AWS Cloud Innovation Center",
        period: "Apr 2025 - Present",
        location: "Scottsdale, AZ",
        description: "Building scalable AI/ML solutions on AWS for public sector use cases using cloud infrastructure.",
        skills: ["AWS", "Cloud Infrastructure", "Backend Development"]
    },
    {
        role: "Director of Community Outreach",
        company: "Startup Village at ASU",
        period: "Sep 2025 - Present",
        location: "Tempe, AZ",
        description: "Led the community outreach program for the Startup Village at ASU, including organizing VillageHacks hackathon and startup mentorship programs.",
        skills: ["AWS", "Cloud Infrastructure", "Backend Development"]
    },
    {
        role: "Machine Learning Intern",
        company: "Kery Solutions",
        period: "May 2025 - Aug 2025",
        location: "Madison, WI",
        description: "Built end-to-end ML solutions including a 96% churn model, a time-series anomaly detector, and a Power BI semantic model with Fabric pipelines for real-time client insights.",
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
    }
];

function ContentPageInner() {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { x, y } = useMousePosition();
    const searchParams = useSearchParams();

    const [windowWidth, setWindowWidth] = useState(0);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Refs for scrolling
    const heroRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const blogCardSwapRef = useRef<BlogCardSwapRef>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -35% 0px',
            threshold: 0.1
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === heroRef.current) setActiveSection('');
                    if (entry.target === aboutRef.current) setActiveSection('About');
                    if (entry.target === workRef.current) setActiveSection('Work');
                    if (entry.target === experienceRef.current) setActiveSection('Experience');
                    if (entry.target === blogRef.current) setActiveSection('Blog');
                    if (entry.target === contactRef.current) setActiveSection('Contact');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        [heroRef, aboutRef, workRef, experienceRef, blogRef, contactRef].forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setMounted(true);

        // Letter animation
        const headline = document.getElementById('heroHeadline');
        if (headline) {
            const text = headline.textContent || '';
            headline.innerHTML = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'letter-animated';
                if (char === ' ') span.style.marginRight = '0.5rem';
                headline.appendChild(span);
                setTimeout(() => span.classList.add('animate'), 100 + (index * 30));
            });
        }

        const section = searchParams.get('section');
        if (section) {
            setTimeout(() => {
                let sectionRef: React.RefObject<HTMLDivElement | null>;
                switch (section) {
                    case 'about': sectionRef = aboutRef; break;
                    case 'experience': sectionRef = experienceRef; break;
                    case 'projects': sectionRef = workRef; break;
                    case 'skills': sectionRef = skillsRef; break;
                    case 'blog': sectionRef = blogRef; break;
                    default: sectionRef = heroRef;
                }
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1000);
        }
    }, [searchParams]);

    const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
        setMobileMenuOpen(false);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Memoize expensive computations
    const chromaItems: ChromaItem[] = useMemo(() => PROJECTS.map((project: Project, index: number) => {
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



    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[var(--background)] text-white selection:bg-[var(--primary)] selection:text-white overflow-x-hidden font-sans">
            {/* Cursor Invert Mask */}
            <div
                className="cursor-invert-mask pointer-events-none fixed inset-0 z-[9999]"
                style={{ '--cursor-x': `${x}px`, '--cursor-y': `${y}px` } as React.CSSProperties}
            />

            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[var(--primary)]/20 blur-3xl opacity-0 animate-fade-in delay-500" />
                <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-3xl opacity-0 animate-fade-in delay-700" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-[var(--secondary)]/10 blur-3xl opacity-0 animate-fade-in delay-1000" />
            </div>

            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 opacity-0 animate-fade-in delay-200">
                <div className="max-w-7xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollToSection(heroRef)}>
                            <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl p-2 group-hover:bg-[var(--primary)]/20 transition-colors">
                                <span className="font-bold text-[var(--primary)]">AM</span>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center gap-2">
                            {['About', 'Work', 'Experience', 'Blog', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === 'Work') scrollToSection(workRef);
                                        if (item === 'About') scrollToSection(aboutRef);
                                        if (item === 'Experience') scrollToSection(experienceRef);
                                        if (item === 'Blog') scrollToSection(blogRef);
                                        if (item === 'Contact') scrollToSection(contactRef);
                                    }}
                                    className={`text-sm font-medium transition-all px-4 py-2 rounded-full ${activeSection === item
                                        ? 'text-white bg-white/10'
                                        : 'text-[var(--muted)] hover:text-white'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <a
                                href={LINKS.github.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden md:inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--primary)]/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--surface)]/80 transition-all hover:scale-105"
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                            <a
                                href="mailto:aaravmatalia@gmail.com"
                                className="hidden md:inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                            >
                                Let&apos;s Connect <ArrowRight size={16} />
                            </a>
                            <button
                                className="md:hidden p-2 text-white"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="absolute top-full left-4 right-4 mt-2 bg-[var(--surface)] border border-[var(--primary)]/10 rounded-2xl p-4 shadow-2xl md:hidden">
                            <div className="flex flex-col gap-4">
                                {['About', 'Work', 'Experience', 'Blog', 'Contact'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            if (item === 'Work') scrollToSection(workRef);
                                            if (item === 'About') scrollToSection(aboutRef);
                                            if (item === 'Experience') scrollToSection(experienceRef);
                                            if (item === 'Blog') scrollToSection(blogRef);
                                            if (item === 'Contact') scrollToSection(contactRef);
                                        }}
                                        className={`text-left text-lg font-medium p-2 ${activeSection === item
                                            ? 'text-white bg-white/10 rounded-lg'
                                            : 'text-[var(--muted)] hover:text-white'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-40 pb-20 lg:pt-60 lg:pb-32 px-6 overflow-hidden scroll-mt-40">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8 flex justify-center opacity-0 animate-scale-in delay-700">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full opacity-75 blur animate-pulse-glow"></div>
                            <img
                                src="/pfp.png"
                                alt="Aarav Matalia"
                                className="relative h-32 w-32 lg:h-40 lg:w-40 rounded-full border-4 border-[var(--surface)] object-cover"
                            />
                        </div>
                    </div>

                    <h1 id="heroHeadline" className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 min-h-[1.2em]">
                        Aarav Matalia
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-[var(--muted)] mb-10 opacity-0 animate-slide-up delay-1000">
                        Computer Science Student & Cloud Developer crafting data pipelines and serverless solutions that feel intuitive, fast, and solve real problems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up delay-1200">
                        <button
                            onClick={() => scrollToSection(workRef)}
                            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            <Play size={20} fill="currentColor" />
                            View my work
                        </button>
                        <button
                            onClick={() => scrollToSection(aboutRef)}
                            className="inline-flex items-center gap-3 bg-[var(--surface)] border border-[var(--primary)]/20 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[var(--surface)]/80 transition-all hover:scale-105"
                        >
                            <User size={20} />
                            About me
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in delay-1500">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">3+</div>
                            <div className="text-sm text-[var(--muted)] mt-1">Years Coding</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">10+</div>
                            <div className="text-sm text-[var(--muted)] mt-1">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">5</div>
                            <div className="text-sm text-[var(--muted)] mt-1">Hackathon Wins</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* About Me Section */}
                <div ref={aboutRef} className="max-w-4xl mx-auto mb-20 scroll-mt-40">
                    <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-8 text-center">
                        About <span className="text-[var(--muted)]">Me</span>
                    </h2>
                    <div className="bg-[var(--surface)]/80 backdrop-blur-sm border-2 border-[var(--surface)] rounded-xl p-6 md:p-8
                            hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20">
                        <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mb-4">
                            I am a junior Computer Science student at Arizona State University with a passion for developing cloud-native
                            and data-driven solutions. With a focused background in backend development and data analysis, I specialize in
                            architecting data systems and cloud infrastructure that power intuitive applications. My expertise lies in
                            implementing modern technologies to create scalable solutions that deliver exceptional user experiences.
                            I&apos;m also really into hackathons! and love participating!!!!! My team and I have won 3 till now! it&apos;s an amazing feeling.
                        </p>
                        <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
                            When I&apos;m not coding, you can find me learning about cars, playing badminton, or listening to sick drum covers!
                        </p>
                    </div>
                </div>

                {/* Tech Stack (Marquee) */}
                <div ref={skillsRef} className="w-full border-y border-[var(--primary)]/10 py-16 mb-20 bg-[var(--surface)]/30 backdrop-blur-sm scroll-mt-40">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-sm font-medium text-[var(--muted)] mb-8 uppercase tracking-widest">
                            Technologies & Tools
                        </p>
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
                                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' }
                            ]}
                            direction="left"
                            pauseOnHover={true}
                        />
                    </div>
                </div>

                {/* Experience Section */}
                <div ref={experienceRef} className="w-full mx-auto mb-20 px-6 scroll-mt-40">
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
                            My <span className="text-[var(--muted)]">Journey</span>
                        </h2>
                        <p className="text-[var(--muted)] text-lg">
                            Professional experience and milestones
                        </p>
                    </div>

                    <Timeline items={EXPERIENCES} />
                </div>


                {/* Projects Section with ChromaGrid */}
                <div ref={workRef} className="w-full mx-auto mb-20 scroll-mt-40">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
                            My <span className="text-[var(--muted)]">Projects</span>
                        </h2>
                        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
                            Explore my portfolio of innovative projects spanning AI/ML, web development, and cloud solutions
                        </p>
                    </div>
                    <div className="py-8">
                        <ChromaGrid
                            items={chromaItems}
                            radius={windowWidth < 640 ? 150 : 350}
                            damping={0.5}
                            fadeOut={0.7}
                        />
                    </div>
                </div>

                {/* Blog Section */}
                <div ref={blogRef} className="max-w-6xl mx-auto mb-20 scroll-mt-40">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
                                Recent <span className="text-[var(--muted)]">Thoughts</span>
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

                    <div className="min-h-[500px] flex items-center justify-center lg:justify-end">
                        <BlogCardSwap
                            ref={blogCardSwapRef}
                            posts={BLOG_POSTS}
                            width={windowWidth < 640 ? windowWidth - 48 : 650}
                            height={400}
                        />
                    </div>
                </div>

                {/* Footer with Social Links */}
                <div ref={contactRef} className="w-full py-12 border-t border-[var(--surface)] mt-20 scroll-mt-40">
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { node: <FileText className="w-6 h-6" />, title: 'Read CV', href: 'https://jade-binnie-84.tiiny.site' },
                                { node: <SiGithub className="w-6 h-6" />, title: 'GitHub', href: 'https://github.com/aaravmat1209' },
                                { node: <SiLinkedin className="w-6 h-6" />, title: 'LinkedIn', href: 'https://www.linkedin.com/in/aarav-matalia/' },
                                { node: <SiMedium className="w-6 h-6" />, title: 'Medium', href: 'https://medium.com/@Aarav129' },
                                { node: <SiInstagram className="w-6 h-6" />, title: 'Instagram', href: 'https://www.instagram.com/boy_got_beats/' },
                                { node: <Mail className="w-6 h-6" />, title: 'Email', href: 'mailto:mataliaaarav@gmail.com' }
                            ].map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-[var(--surface)] border border-[var(--primary)]/30 text-[var(--primary)]
                                        hover:bg-[var(--primary)] hover:text-[var(--background)] transition-all duration-300
                                        hover:scale-110 hover:shadow-lg hover:shadow-[var(--primary)]/20 flex items-center justify-center"
                                    aria-label={link.title}
                                >
                                    {link.node}
                                </a>
                            ))}
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-[var(--primary)] font-medium text-lg">
                                Let&apos;s build something amazing together
                            </p>
                            <p className="text-[var(--muted)] text-sm opacity-60">
                                © {new Date().getFullYear()} Aarav Matalia. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ContentPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[var(--background)] text-[var(--primary)]">Loading content...</div>}>
            <ContentPageInner />
        </Suspense>
    );
}
