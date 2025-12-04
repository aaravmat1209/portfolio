"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DotGrid from '@/components/DotGrid';
import SplitText from '@/components/SplitText';
import GradientText from '@/components/GradientText';
import Dock from '@/components/Dock';
import {
    Home,
    User,
    Briefcase,
    Code,
    BookOpen,
    Github,
    Linkedin,
    Mail
} from 'lucide-react';

export default function RevampedLandingPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Dock items for navigation
    const dockItems = [
        {
            icon: <Home className="w-6 h-6 text-[#66FCF1]" />,
            label: "Home",
            onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        {
            icon: <User className="w-6 h-6 text-[#66FCF1]" />,
            label: "About",
            onClick: () => window.location.href = '/content?section=about'
        },
        {
            icon: <Briefcase className="w-6 h-6 text-[#66FCF1]" />,
            label: "Experience",
            onClick: () => window.location.href = '/content?section=experience'
        },
        {
            icon: <Code className="w-6 h-6 text-[#66FCF1]" />,
            label: "Projects",
            onClick: () => window.location.href = '/content?section=projects'
        },
        {
            icon: <BookOpen className="w-6 h-6 text-[#66FCF1]" />,
            label: "Blog",
            onClick: () => window.location.href = '/content?section=blog'
        },
    ];

    // Social links
    const socialLinks = [
        {
            icon: <Github className="w-5 h-5" />,
            label: "GitHub",
            onClick: () => window.open('https://github.com/aaravmat1209', '_blank')
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            label: "LinkedIn",
            onClick: () => window.open('https://linkedin.com/in/aaravmat1209', '_blank')
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Email",
            onClick: () => window.location.href = 'mailto:your.email@example.com'
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
            <div className="relative w-full h-screen overflow-hidden bg-[#0B0C10]">
                {/* DotGrid Background */}
                <div className="absolute inset-0 z-0">
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
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(11, 12, 16, 0.7) 70%, #0B0C10 100%)',
                    }}
                />

                {/* Main Content */}
                <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center px-4 pb-24">
                    {/* Hero Section */}
                    <div className="text-center space-y-8 max-w-4xl">
                        {/* Animated Greeting */}
                        <SplitText
                            text="Hello, I'm Aarav"
                            tag="h1"
                            className="text-5xl md:text-7xl font-bold text-[#66FCF1]"
                            delay={50}
                            duration={0.8}
                            splitType="chars"
                            from={{ opacity: 0, y: 50, rotateX: -90 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                        />

                        {/* Gradient Subtitle */}
                        <div className="flex justify-center">
                            <GradientText
                                colors={['#66FCF1', '#45A29E', '#66FCF1']}
                                animationSpeed={6}
                                className="text-2xl md:text-4xl font-semibold px-6 py-2"
                            >
                                Full Stack Developer & Designer
                            </GradientText>
                        </div>

                        {/* Description */}
                        <SplitText
                            text="Welcome to my digital space. I build beautiful, functional web experiences that make a difference."
                            tag="p"
                            className="text-lg md:text-xl text-[#C5C6C7] max-w-2xl mx-auto"
                            delay={30}
                            duration={0.6}
                            splitType="words"
                            from={{ opacity: 0, y: 20 }}
                            to={{ opacity: 1, y: 0 }}
                        />

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Link
                                href="/content?section=projects"
                                className="group relative px-8 py-4 bg-[#66FCF1] text-[#0B0C10] rounded-lg font-semibold text-lg
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#66FCF1]/50
                       overflow-hidden"
                            >
                                <span className="relative z-10">View My Work</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>

                            <Link
                                href="/content?section=about"
                                className="px-8 py-4 border-2 border-[#66FCF1] text-[#66FCF1] rounded-lg font-semibold text-lg
                       transition-all duration-300 hover:bg-[#66FCF1] hover:text-[#0B0C10] hover:scale-105"
                            >
                                About Me
                            </Link>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-6 justify-center pt-8">
                            {socialLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={link.onClick}
                                    className="p-3 rounded-full border-2 border-[#1F2833] bg-[#1F2833]/50 text-[#66FCF1]
                         hover:border-[#66FCF1] hover:bg-[#66FCF1]/10 transition-all duration-300
                         hover:scale-110 hover:shadow-lg hover:shadow-[#66FCF1]/30"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dock Navigation - Outside overflow container with high z-index */}
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
