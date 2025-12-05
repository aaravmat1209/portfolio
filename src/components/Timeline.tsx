'use client';

import React from 'react';
import { motion } from 'motion/react';

interface TimelineItem {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    skills: string[];
}

interface TimelineProps {
    items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]" />

            {/* Timeline Items */}
            <div className="space-y-12">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            } flex-row`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-[var(--primary)] border-[var(--background)]4 border-[#0B0C10] z-10 
                        shadow-lg shadow-[var(--primary)]/50" />

                        {/* Content Card */}
                        <div className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                            }`}>
                            <div className="bg-[var(--surface)]/80 backdrop-blur-sm border-2 border-[var(--surface)] rounded-xl p-6
                            hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20
                            group">
                                {/* Period Badge */}
                                <div className="inline-block px-3 py-1 mb-3 text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 
                                border border-[var(--primary)]/30 rounded-lg">
                                    {item.period}
                                </div>

                                {/* Role & Company */}
                                <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                                    {item.role}
                                </h3>
                                <p className="text-lg text-[var(--muted)] mb-2">
                                    {item.company}
                                </p>
                                <p className="text-sm text-[var(--muted)]/70 mb-4">
                                    📍 {item.location}
                                </p>

                                {/* Description */}
                                <p className="text-[var(--muted)] leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 text-sm bg-[var(--background)] text-[var(--primary)] rounded-lg border border-[var(--primary)]/20
                                            hover:border-[var(--primary)] transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Timeline);
