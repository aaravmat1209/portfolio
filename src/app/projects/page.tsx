"use client";

import { useState } from 'react';
import Link from 'next/link';
import {PROJECTS, Project } from '../projects-data';
import { ArrowLeft } from 'lucide-react'; // You may need to install: npm install lucide-react

export default function ProjectsPage() {
  const [filter, setFilter] = useState('');

  // Filter projects based on search input
  const filteredProjects = PROJECTS.filter(project => 
    project.title.toLowerCase().includes(filter.toLowerCase()) ||
    project.description.toLowerCase().includes(filter.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-color-dark">
      {/* Navigation bar */}
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-color-dark shadow-lg">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link
            href="/"
            className="text-accent font-heading text-lg sm:text-xl hover:scale-105 transition-all whitespace-nowrap"
          >
            Aarav Matalia
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header with Return button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-4xl font-heading text-accent mb-4 sm:mb-0">My Projects</h1>
          <Link
            href="/content?section=projects"
            className="flex items-center text-sm border-accent border-2 rounded-base px-4 py-2 text-accent hover:bg-accent hover:text-main-foreground transition-all"
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
            className="w-full p-3 bg-secondary-background border border-main rounded-base text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border-main bg-secondary-background rounded-base border-2 overflow-hidden hover:border-accent transition-all-medium group"
            >
              {/* Project image */}
              <div className="h-48 bg-main overflow-hidden">
                <img
                  src={project.image || '/project-placeholder.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
              </div>

              {/* Project details */}
              <div className="p-6">
                <h3 className="text-xl font-heading group-hover:text-accent transition-all">{project.title}</h3>
                <p className="mt-2 text-sm opacity-80 line-clamp-3">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-main text-main-foreground text-xs px-2 py-1 rounded group-hover:bg-accent transition-all"
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
                      className="text-sm font-medium text-accent hover:text-foreground transition-all"
                    >
                      View Project →
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-accent transition-all"
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
            <h3 className="text-xl text-accent mb-2">No projects found</h3>
            <p className="text-foreground">Try a different search term.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-main pt-8 pb-12 text-sm bg-color-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="hover:text-accent transition-all">© {new Date().getFullYear()} Aarav Matalia. All rights reserved.</p>
            <p className="mt-4 sm:mt-0 hover:text-accent transition-all">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}