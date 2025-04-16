"use client";

import { useState } from 'react';
import Link from 'next/link';
import {PROJECTS, Project } from '../projects-data';
import { ArrowLeft } from 'lucide-react'; // You may need to install: npm install lucide-react
import TimeBasedBackground, { useTimeContext } from '../content/TimeBasedBackground';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('');
  
  // Filter projects based on search input
  const filteredProjects = PROJECTS.filter(project => 
    project.title.toLowerCase().includes(filter.toLowerCase()) ||
    project.description.toLowerCase().includes(filter.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Night mode background */}
      <TimeBasedBackground forcedTime="night" showControls={false} />

      <ProjectsContent 
        filter={filter} 
        setFilter={setFilter} 
        filteredProjects={filteredProjects} 
      />
    </div>
  );
}

// Separating the content to use the TimeContext properly
function ProjectsContent({ 
  filter, 
  setFilter, 
  filteredProjects 
}: { 
  filter: string; 
  setFilter: (value: string) => void; 
  filteredProjects: Project[] 
}) {
  const { colors } = useTimeContext();

  return (
    <>
      {/* Navigation bar */}
      <div className={`fixed top-0 left-0 w-full z-50 h-16 ${colors.background}/80 backdrop-blur-sm shadow-lg`}>
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link
            href="/"
            className={`${colors.headings} font-heading text-lg sm:text-xl hover:scale-105 transition-all whitespace-nowrap`}
          >
            Aarav Matalia
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Header with Return button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className={`text-4xl font-heading ${colors.headings} mb-4 sm:mb-0 animate-text-glow`}>My Projects</h1>
          <Link
            href="/content?section=projects"
            className={`flex items-center text-sm border-2 ${colors.border} rounded-base px-4 py-2 ${colors.accent} hover:bg-accent hover:text-black transition-all`}
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to portfolio
          </Link>
        </div>

        {/* Search and filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`w-full p-3 ${colors.secondary}/60 backdrop-blur-sm border ${colors.border} rounded-base ${colors.text} focus:border-[#66FCF1] focus:outline-none`}
          />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`border-2 ${colors.border} ${colors.secondary}/40 backdrop-blur-sm rounded-base overflow-hidden hover:border-[#66FCF1] transition-all-medium group`}
            >
              {/* Project image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image || '/project-placeholder.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
              </div>

              {/* Project details */}
              <div className="p-6">
                <h3 className={`text-xl font-heading group-hover:text-[#66FCF1] transition-all ${colors.headings}`}>{project.title}</h3>
                <p className={`mt-2 text-sm opacity-80 line-clamp-3 ${colors.text}`}>{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`${colors.background} text-[#66FCF1] text-xs px-2 py-1 rounded group-hover:bg-[#66FCF1] group-hover:text-black transition-all`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex mt-6 space-x-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`text-sm font-medium text-[#66FCF1] hover:${colors.text} transition-all`}
                    >
                      View Project →
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium ${colors.text} hover:text-[#66FCF1] transition-all`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className={`text-xl ${colors.headings} mb-2`}>No projects found</h3>
            <p className={colors.text}>Try a different search term.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`w-full border-t ${colors.border} pt-8 pb-12 text-sm ${colors.background}/80 backdrop-blur-sm relative z-10`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`hover:${colors.accent} transition-all ${colors.text}`}>© {new Date().getFullYear()} Aarav Matalia. All rights reserved.</p>
            <p className={`mt-4 sm:mt-0 hover:${colors.accent} transition-all ${colors.text}`}>Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}