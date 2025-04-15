import { BLOG_POSTS } from '../blog-posts';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="text-foreground mx-auto max-w-[800px] p-8 md:p-16">
      <div className="mb-8 flex items-center">
        <Link 
          href="/" 
          className="mr-4 text-sm border-border bg-secondary-background rounded-base border-2 px-4 py-2 hover:bg-main hover:text-main-foreground transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="font-heading text-3xl sm:text-4xl">Blog</h1>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="border-border shadow-shadow bg-secondary-background rounded-base border-2 p-6 hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <h2 className="font-heading text-xl sm:text-2xl">{post.title}</h2>
            <p className="text-sm mt-2 opacity-70">{post.date}</p>
            <p className="mt-4">{post.excerpt}</p>
            <Link 
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-medium text-main hover:underline"
            >
              Read full post →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}