"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECTS, Project } from '../projects-data';
import { ArrowLeft } from 'lucide-react';
import DotGrid from '@/components/DotGrid';
import ChromaGrid, { ChromaItem } from '@/components/ChromaGrid';
import Dock from '@/components/Dock';
import { Home, User, Briefcase, Code, BookOpen } from 'lucide-react';

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

export default function ProjectsPage() {
  const [filter, setFilter] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter projects based on search input
  const filteredProjects = PROJECTS.filter(project =>
    project.title.toLowerCase().includes(filter.toLowerCase()) ||
    project.description.toLowerCase().includes(filter.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
  );

  // Transform projects to ChromaItem format
  const chromaItems: ChromaItem[] = filteredProjects.map((project, index) => {
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

  if (!mounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-[#0B0C10] flex items-center justify-center">
        <div className="text-[#66FCF1] text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-[#0B0C10]">
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

        {/* Navigation bar */}
        <div className="fixed top-0 left-0 w-full z-40 h-16 bg-[#0B0C10]/80 backdrop-blur-sm shadow-lg">
          <div className="container mx-auto h-full flex items-center justify-between px-4">
            <Link
              href="/"
              className="text-[#66FCF1] font-heading text-lg sm:text-xl hover:scale-105 transition-all whitespace-nowrap"
            >
              Aarav Matalia
            </Link>
            <Link
              href="/content?section=projects"
              className="flex items-center text-sm border-2 border-[#1F2833] rounded-lg px-4 py-2 text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0B0C10] transition-all"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to portfolio
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 container mx-auto px-4 pt-24 pb-32">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#66FCF1] mb-4 animate-text-glow">
              My Projects
            </h1>
            <p className="text-[#C5C6C7] text-lg max-w-2xl mx-auto">
              Explore my portfolio of innovative projects spanning AI/ML, web development, and cloud solutions
            </p>
          </div>

          {/* Search and filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-4 bg-[#1F2833]/60 backdrop-blur-sm border-2 border-[#1F2833] rounded-xl text-[#C5C6C7] 
                       focus:border-[#66FCF1] focus:outline-none transition-all placeholder-[#C5C6C7]/50"
            />
          </div>

          {/* ChromaGrid */}
          {filteredProjects.length > 0 ? (
            <div className="min-h-[600px]">
              <ChromaGrid
                items={chromaItems}
                radius={350}
                damping={0.5}
                fadeOut={0.7}
                className="py-8"
              />
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl text-[#66FCF1] mb-2">No projects found</h3>
              <p className="text-[#C5C6C7]">Try a different search term.</p>
            </div>
          )}

          {/* Project Count */}
          <div className="text-center mt-12">
            <p className="text-[#C5C6C7]">
              Showing <span className="text-[#66FCF1] font-semibold">{filteredProjects.length}</span> of{' '}
              <span className="text-[#66FCF1] font-semibold">{PROJECTS.length}</span> projects
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 w-full border-t border-[#1F2833] pt-8 pb-12 text-sm bg-[#0B0C10]/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-[#C5C6C7]">
              <p className="hover:text-[#66FCF1] transition-all">
                © {new Date().getFullYear()} Aarav Matalia. All rights reserved.
              </p>
              <p className="mt-4 sm:mt-0 hover:text-[#66FCF1] transition-all">
                Built with Next.js, React Bits & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
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