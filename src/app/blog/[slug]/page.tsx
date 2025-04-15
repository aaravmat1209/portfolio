import { BLOG_POSTS } from '../../blog-posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
          <h2>Introduction</h2>
          <p>This is a placeholder for the full blog post content. In a real implementation, you would have complete content here.</p>
          
          <h2>Main Points</h2>
          <ul>
            <li>Key takeaway one</li>
            <li>Important concept two</li>
            <li>Critical insight three</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>Final thoughts and closing remarks for this blog post.</p>
        </div>
      </article>
    </div>
  );
}