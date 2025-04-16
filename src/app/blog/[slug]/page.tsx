"use client";

import { BLOG_POSTS } from '../../blog-posts';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TimeBasedBackground, { useTimeContext } from '../../content/TimeBasedBackground';

// Change id from number to string to match the imported BLOG_POSTS
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
};

export default function BlogPostPage() {
  // Use Next.js' hook to access route parameters
  const { slug } = useParams();
  
  // Optionally check if slug exists and handle error if not a string
  if (!slug || typeof slug !== 'string') {
    return (
      <div className="min-h-screen text-center pt-24">
        <h1 className="font-heading text-3xl">Post not found</h1>
        <Link
          href="/blog"
          className="inline-block text-sm border-2 rounded-base px-4 py-2 mt-4"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <TimeBasedBackground forcedTime="night" showControls={false} />
      <BlogPostContent slug={slug} />
    </div>
  );
}

function BlogPostContent({ slug }: { slug: string }) {
  const { colors } = useTimeContext();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the post with the matching slug
    const foundPost = BLOG_POSTS.find((post) => post.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
    }
    setIsLoading(false);
  }, [slug]);

  if (!isLoading && !post) {
    return (
      <div className={`${colors.text} mx-auto max-w-[800px] p-8 md:p-16 pt-24 relative z-10 text-center`}>
        <h1 className={`${colors.headings} font-heading text-3xl mb-4`}>Post not found</h1>
        <Link
          href="/blog"
          className={`inline-block text-sm border-2 ${colors.border} rounded-base px-4 py-2 ${colors.accent} hover:bg-accent hover:text-black transition-all mt-4`}
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${colors.text} mx-auto max-w-[800px] p-8 md:p-16 pt-24 relative z-10 text-center`}>
        <p>Loading...</p>
      </div>
    );
  }

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
            href="/blog"
            className={`mr-4 text-sm border-2 ${colors.border} rounded-base px-4 py-2 ${colors.accent} hover:bg-accent hover:text-black transition-all`}
          >
            ← All posts
          </Link>
        </div>

        <article className={`border-2 ${colors.border} ${colors.secondary}/40 backdrop-blur-sm rounded-base p-6`}>
          <h1 className={`font-heading text-2xl sm:text-3xl ${colors.headings} animate-text-glow`}>{post!.title}</h1>
          <p className={`text-sm mt-2 opacity-70 ${colors.text}`}>{post!.date}</p>

          <div className={`mt-8 prose prose-invert max-w-none ${colors.text}`}>
            <ReactMarkdown>{post!.content}</ReactMarkdown>
          </div>
        </article>
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
