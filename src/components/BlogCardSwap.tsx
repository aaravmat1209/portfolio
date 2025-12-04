import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import CardSwap, { Card } from './CardSwap';

interface BlogPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
}

interface BlogCardSwapProps {
    posts: BlogPost[];
    width?: number;
    height?: number;
}

export interface BlogCardSwapRef {
    next: () => void;
    prev: () => void;
}

const BlogCardSwap = forwardRef<BlogCardSwapRef, BlogCardSwapProps>(
    ({ posts, width = 650, height = 400 }, ref) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [key, setKey] = useState(0);

        // Expose next/prev methods to parent
        useImperativeHandle(ref, () => ({
            next: () => {
                setCurrentIndex((prev) => (prev + 1) % posts.length);
                setKey((prev) => prev + 1);
            },
            prev: () => {
                setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
                setKey((prev) => prev + 1);
            },
        }));

        // Reorder posts to show current one on top
        const orderedPosts = [
            ...posts.slice(currentIndex),
            ...posts.slice(0, currentIndex),
        ];

        return (
            <CardSwap
                key={key}
                width={width}
                height={height}
                cardDistance={50}
                verticalDistance={60}
                delay={999999} // Effectively disable auto-swap
                pauseOnHover={false}
                easing="elastic"
                skewAmount={5}
            >
                {orderedPosts.map((post) => (
                    <Card
                        key={post.id}
                        customClass="blog-card"
                        style={{
                            background: 'linear-gradient(135deg, rgba(31, 40, 51, 0.95) 0%, rgba(11, 12, 16, 0.95) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid #1F2833',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: '0 10px 40px rgba(102, 252, 241, 0.15)',
                            cursor: 'pointer',
                        }}
                        onClick={() => (window.location.href = `/blog/${post.slug}`)}
                    >
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#66FCF1] mb-3">
                                {post.title}
                            </h3>
                            <p className="text-sm text-[#66FCF1] bg-[#0B0C10] px-4 py-2 rounded-lg font-medium border border-[#66FCF1]/30 inline-block mb-4">
                                {post.date}
                            </p>
                            <p className="text-[#C5C6C7] leading-relaxed text-base mb-4">
                                {post.excerpt}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-[#66FCF1] font-medium">
                            <span>Read more</span>
                            <span>→</span>
                        </div>
                    </Card>
                ))}
            </CardSwap>
        );
    }
);

BlogCardSwap.displayName = 'BlogCardSwap';

export default BlogCardSwap;
