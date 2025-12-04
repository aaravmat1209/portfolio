"use client";

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LINKS from '@/links';
import { BLOG_POSTS } from '../blog-posts';
import { getFeaturedProjects, Project, PROJECTS } from '../projects-data';
import DotGrid from '@/components/DotGrid';
import SplitText from '@/components/SplitText';
import GradientText from '@/components/GradientText';
import Dock from '@/components/Dock';
import ChromaGrid, { ChromaItem } from '@/components/ChromaGrid';
import ExperienceStack from '@/components/ExperienceStack';
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


function ContentPageInner() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('About');
    const [currentCardOrder, setCurrentCardOrder] = useState<any[]>([]);
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

    const scrollToSection = (
        sectionRef: React.RefObject<HTMLDivElement | null>,
        sectionName: string
    ): void => {
        setActiveSection(sectionName);
        setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

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

    const featuredProjects: Project[] = getFeaturedProjects();

    // Color palette for different project types
    const projectColors = [
        { border: '#4F46E5', gradient: 'linear-gradient(145deg, #4F46E5, #000)' }, // Indigo
        { border: '#10B981', gradient: 'linear-gradient(210deg, #10B981, #000)' }, // Green
        { border: '#F59E0B', gradient: 'linear-gradient(165deg, #F59E0B, #000)' }, // Amber
        { border: '#EF4444', gradient: 'linear-gradient(195deg, #EF4444, #000)' }, // Red
        { border: '#8B5CF6', gradient: 'linear-gradient(225deg, #8B5CF6, #000)' }, // Purple
        { border: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #000)' }, // Cyan
        { border: '#EC4899', gradient: 'linear-gradient(180deg, #EC4899, #000)' }, // Pink
        { border: '#14B8A6', gradient: 'linear-gradient(150deg, #14B8A6, #000)' }, // Teal
    ];

    // Transform projects to ChromaItem format
    const chromaItems: ChromaItem[] = PROJECTS.map((project, index) => {
        const colorIndex = index % projectColors.length;
        return {
            image: project.image || '/project-placeholder.jpg',
            title: project.title,
            subtitle: project.tech.slice(0, 2).join(', '), // Show first 2 tech items
            handle: project.featured ? '⭐ Featured' : `${project.tech.length} technologies`,
            location: project.github ? 'View on GitHub' : undefined,
            borderColor: projectColors[colorIndex].border,
            gradient: projectColors[colorIndex].gradient,
            url: project.link || project.github
        };
    });

    const dockItems = [
        {
            icon: <Home className="w-6 h-6 text-[#66FCF1]" />,
            label: "Home",
            onClick: () => window.location.href = '/'
        },
        {
            icon: <User className="w-6 h-6 text-[#66FCF1]" />,
            label: "About",
            onClick: () => scrollToSection(aboutRef, 'About')
        },
        {
            icon: <Briefcase className="w-6 h-6 text-[#66FCF1]" />,
            label: "Experience",
            onClick: () => scrollToSection(experienceRef, 'Experience')
        },
        {
            icon: <Code className="w-6 h-6 text-[#66FCF1]" />,
            label: "Projects",
            onClick: () => scrollToSection(projectsRef, 'Projects')
        },
        {
            icon: <BookOpen className="w-6 h-6 text-[#66FCF1]" />,
            label: "Blog",
            onClick: () => scrollToSection(blogRef, 'Blog')
        },
    ];

    if (!mounted) {
        return (
            <div className="relative w-full h-screen overflow-hidden bg-[#0B0C10] flex items-center justify-center">
                <div className="text-[#66FCF1] text-2xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <div className="relative min-h-screen bg-[#0B0C10] overflow-x-hidden">
                {/* DotGrid Background - Fixed */}
                <div className="fixed inset-0 z-0">
                    <DotGrid
                        dotSize={3}
                        gap={40}
                        baseColor="#1F2833"
                        activeColor="#66FCF1"
                        proximity={180}
                        speedTrigger={80}
                        shockRadius={200}
                        shockStrength={8}
                        className="w-full h-full"
                    />
                </div>

                {/* Gradient Overlay */}
                <div
                    className="fixed inset-0 z-10 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(11, 12, 16, 0.5) 70%, rgba(11, 12, 16, 0.8) 100%)',
                    }}
                />

                {/* Main Content */}
                <div className="relative z-20 container mx-auto px-4 md:px-8 pt-24 pb-32">
                    {/* Profile Section */}
                    <div ref={aboutRef} className="max-w-4xl mx-auto mb-20">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] rounded-full opacity-75 blur"></div>
                                <img
                                    className="relative h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-[#1F2833] object-cover"
                                    src="/pfp.png"
                                    alt="Aarav Matalia"
                                />
                            </div>

                            {/* Name and Title */}
                            <div className="flex-1 text-center md:text-left">
                                <SplitText
                                    text="Aarav Matalia"
                                    tag="h1"
                                    className="text-4xl md:text-5xl font-bold text-[#66FCF1] mb-4"
                                    delay={40}
                                    duration={0.6}
                                    splitType="chars"
                                />
                                <GradientText
                                    colors={['#66FCF1', '#45A29E', '#66FCF1']}
                                    animationSpeed={6}
                                    className="text-xl md:text-2xl font-semibold"
                                >
                                    Cloud Developer and Data Enthusiast
                                </GradientText>
                            </div>
                        </div>

                        {/* About Me Card */}
                        <div className="bg-[#1F2833]/80 backdrop-blur-sm border-2 border-[#1F2833] rounded-xl p-6 md:p-8
                        hover:border-[#66FCF1] transition-all duration-300 hover:shadow-lg hover:shadow-[#66FCF1]/20">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#66FCF1] mb-4">About Me</h2>
                            <p className="text-[#C5C6C7] text-base md:text-lg leading-relaxed mb-4">
                                I am a junior Computer Science student at Arizona State University with a passion for developing cloud-native
                                and data-driven solutions. With a focused background in backend development and data analysis, I specialize in
                                architecting data systems and cloud infrastructure that power intuitive applications. My expertise lies in
                                implementing modern technologies to create scalable solutions that deliver exceptional user experiences.
                                I'm also really into hackathons! and love participating!!!!! My team and I have won 3 till now! it's an amazing feeling.
                            </p>
                            <p className="text-[#C5C6C7] text-base md:text-lg leading-relaxed">
                                When I'm not coding, you can find me learning about cars, playing badminton, or listening to sick drum covers!
                            </p>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div ref={skillsRef} className="max-w-4xl mx-auto mb-20">
                        <SplitText
                            text="Skills"
                            tag="h2"
                            className="text-3xl md:text-4xl font-bold text-[#66FCF1] mb-6"
                            delay={30}
                            duration={0.5}
                            splitType="chars"
                        />
                        <div className="bg-[#1F2833]/80 backdrop-blur-sm border-2 border-[#1F2833] rounded-xl p-6 md:p-8
                        hover:border-[#66FCF1] transition-all duration-300">
                            <div className="flex flex-wrap gap-3">
                                {['Python', 'AWS', 'Flask', 'Tensorflow', 'Keras', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Cloud Development', 'API Development'].map((skill, index) => (
                                    <span
                                        key={skill}
                                        className="bg-[#0B0C10] text-[#66FCF1] px-4 py-2 rounded-lg text-sm font-medium
                           hover:bg-[#66FCF1] hover:text-[#0B0C10] transition-all duration-300
                           hover:scale-105 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="max-w-6xl mx-auto mb-20">
                        <SplitText
                            text="Connect With Me"
                            tag="h2"
                            className="text-3xl md:text-4xl font-bold text-[#66FCF1] mb-8 text-center"
                            delay={30}
                            duration={0.5}
                            splitType="words"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Object.keys(LINKS).map((key, index) => (
                                <a
                                    key={key}
                                    href={LINKS[key].link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#1F2833]/80 backdrop-blur-sm border-2 border-[#1F2833] rounded-xl p-6
                         hover:border-[#66FCF1] transition-all duration-300 hover:scale-105
                         hover:shadow-lg hover:shadow-[#66FCF1]/20 group"
                                >
                                    <img
                                        className="h-10 w-10 mb-3 group-hover:scale-110 transition-transform duration-300"
                                        src={LINKS[key].icon.src}
                                        alt={LINKS[key].title}
                                    />
                                    <h3 className="text-xl font-bold text-[#66FCF1] mb-1">{LINKS[key].title}</h3>
                                    <p className="text-[#C5C6C7] text-sm">{LINKS[key].text}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div ref={experienceRef} className="w-full mx-auto mb-20">
                        <div className="max-w-4xl mx-auto mb-4">
                            <SplitText
                                text="Professional Experience"
                                tag="h2"
                                className="text-3xl md:text-4xl font-bold text-[#66FCF1] text-center"
                                delay={30}
                                duration={0.5}
                                splitType="words"
                            />
                        </div>

                        <div className="flex justify-center items-center gap-12 min-h-[600px]">
                            {/* Position Tracker */}
                            <div className="flex flex-col gap-4">
                                <div className="text-[#66FCF1] text-lg font-bold mb-3">
                                    Experiences
                                </div>
                                {experiences.map((exp, index) => {
                                    // Find the top card (last in currentCardOrder array)
                                    const topCard = currentCardOrder.length > 0
                                        ? currentCardOrder[currentCardOrder.length - 1]
                                        : experiences[0];

                                    // Check if this experience is the top card by comparing role
                                    const isTopCard = exp.role === topCard.role;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isTopCard
                                                ? 'bg-[#66FCF1] ring-4 ring-[#66FCF1]/30 ring-offset-2 ring-offset-[#0B0C10]'
                                                : 'bg-[#1F2833] group-hover:bg-[#66FCF1]/50'
                                                }`} />
                                            <div className={`text-base transition-all duration-300 min-w-[180px] ${isTopCard
                                                ? 'text-[#66FCF1] font-bold'
                                                : 'text-[#C5C6C7] opacity-60'
                                                }`}>
                                                {exp.role}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Card Stack */}
                            <ExperienceStack
                                experiences={experiences}
                                cardDimensions={{ width: 650, height: 450 }}
                                sensitivity={150}
                                sendToBackOnClick={true}
                                randomRotation={false}
                                onOrderChange={(cards) => setCurrentCardOrder(cards)}
                            />
                        </div>
                    </div>


                    {/* Projects Section with ChromaGrid */}
                    <div ref={projectsRef} className="w-full mx-auto mb-20">
                        <div className="text-center mb-8">
                            <SplitText
                                text="My Projects"
                                tag="h2"
                                className="text-3xl md:text-4xl font-bold text-[#66FCF1] mb-4"
                                delay={30}
                                duration={0.5}
                                splitType="words"
                            />
                            <p className="text-[#C5C6C7] text-lg max-w-2xl mx-auto">
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
                                <SplitText
                                    text="Recent Thoughts"
                                    tag="h2"
                                    className="text-3xl md:text-4xl font-bold text-[#66FCF1]"
                                    delay={30}
                                    duration={0.5}
                                    splitType="words"
                                />
                                {/* Navigation Arrows - Inline with title */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => blogCardSwapRef.current?.prev()}
                                        className="w-12 h-12 rounded-full bg-[#1F2833] border-2 border-[#66FCF1]/30 
                                        text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0B0C10] 
                                        transition-all duration-300 text-xl font-bold
                                        hover:scale-110 hover:border-[#66FCF1] hover:shadow-lg hover:shadow-[#66FCF1]/50
                                        flex items-center justify-center"
                                        aria-label="Previous blog post"
                                    >
                                        <ChevronLeft size={24} strokeWidth={3} />
                                    </button>
                                    <button
                                        onClick={() => blogCardSwapRef.current?.next()}
                                        className="w-12 h-12 rounded-full bg-[#1F2833] border-2 border-[#66FCF1]/30 
                                        text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0B0C10] 
                                        transition-all duration-300 text-xl font-bold
                                        hover:scale-110 hover:border-[#66FCF1] hover:shadow-lg hover:shadow-[#66FCF1]/50
                                        flex items-center justify-center"
                                        aria-label="Next blog post"
                                    >
                                        <ChevronRight size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-[#C5C6C7] text-lg">
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
                </div>
            </div>

            {/* Dock Navigation - Fixed at bottom with high z-index */}
            <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Dock
                        items={dockItems}
                        className="bg-[#1F2833]/80 backdrop-blur-lg"
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
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#0B0C10] text-[#66FCF1]">Loading content...</div>}>
            <ContentPageInner />
        </Suspense>
    );
}
