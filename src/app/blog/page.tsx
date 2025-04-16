"use client";

import { BLOG_POSTS } from '../blog-posts';
import Link from 'next/link';
import TimeBasedBackground, { useTimeContext } from '../content/TimeBasedBackground';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Night mode background */}
      <TimeBasedBackground forcedTime="night" showControls={false} />
      
      <BlogContent />
    </div>
  );
}

function BlogContent() {
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
    
      <div className={`${colors.text} mx-auto max-w-[800px] p-8 md:p-16 pt-24 relative z-10`}>
        <div className="mb-8 flex items-center">
          <Link 
            href="/content" 
            className={`mr-4 text-sm border-2 ${colors.border} rounded-base px-4 py-2 ${colors.accent} hover:bg-accent hover:text-black transition-all`}
          >
            ← Back to Portfolio
          </Link>
          <h1 className={`font-heading text-3xl sm:text-4xl ${colors.headings} animate-text-glow`}>Blog</h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className={`border-2 ${colors.border} ${colors.secondary}/40 backdrop-blur-sm rounded-base p-6 hover:translate-x-1 hover:translate-y-1 transition-all hover:border-[#66FCF1]`}
            >
              <h2 className={`font-heading text-xl sm:text-2xl ${colors.headings}`}>{post.title}</h2>
              <p className={`text-sm mt-2 opacity-70 ${colors.text}`}>{post.date}</p>
              <p className={`mt-4 ${colors.text}`}>{post.excerpt}</p>
              <Link 
                href={`/blog/${post.slug}`}
                className={`mt-4 inline-block text-sm font-medium text-[#66FCF1] hover:${colors.text} transition-all`}
              >
                Read full post →
              </Link>
            </article>
          ))}
        </div>
      </div>
    
      {/* Footer */}
      <footer className={`w-full border-t ${colors.border} pt-8 pb-12 text-sm ${colors.background}/80 backdrop-blur-sm relative z-10 mt-12`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`transition-all hover:${colors.accent} ${colors.text}`}>© {new Date().getFullYear()} Aarav Matalia. All rights reserved.</p>
            <p className={`mt-4 sm:mt-0 transition-all hover:${colors.accent} ${colors.text}`}>Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}