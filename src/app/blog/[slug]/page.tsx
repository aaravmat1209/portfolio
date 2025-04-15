import { BLOG_POSTS } from '../../blog-posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown'; // Install this: npm install react-markdown

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="text-foreground mx-auto max-w-[800px] p-8 md:p-16">
      <div className="mb-8 flex items-center">
        <Link 
          href="/blog" 
          className="mr-4 text-sm border-border bg-secondary-background rounded-base border-2 px-4 py-2 hover:bg-main hover:text-main-foreground transition-colors"
        >
          ← All posts
        </Link>
      </div>

      <article className="border-border shadow-shadow bg-secondary-background rounded-base border-2 p-6">
        <h1 className="font-heading text-2xl sm:text-3xl">{post.title}</h1>
        <p className="text-sm mt-2 opacity-70">{post.date}</p>
        
        <div className="mt-8 prose prose-green dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}