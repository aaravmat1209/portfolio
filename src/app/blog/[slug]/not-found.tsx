import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-foreground mx-auto max-w-[800px] p-8 md:p-16 text-center">
      <h2 className="font-heading text-3xl mb-4">Post Not Found</h2>
      <p className="mb-8">Sorry, the blog post you&#39;re looking for doesn&#39;t exist.</p>
      <Link 
        href="/blog"
        className="border-border bg-main text-main-foreground rounded-base border-2 px-4 py-2 hover:opacity-90 transition-opacity"
      >
        Back to Blog
      </Link>
    </div>
  );
}