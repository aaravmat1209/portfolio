import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CardSwap, { Card } from './CardSwap';

interface BlogPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    content?: string;
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
        const [expandedPost, setExpandedPost] = useState<BlogPost | null>(null);

        // Expose next/prev methods to parent
        useImperativeHandle(ref, () => ({
            next: () => {
                if (!expandedPost) {
                    setCurrentIndex((prev) => (prev + 1) % posts.length);
                    setKey((prev) => prev + 1);
                }
            },
            prev: () => {
                if (!expandedPost) {
                    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
                    setKey((prev) => prev + 1);
                }
            },
        }));

        // Reorder posts to show current one on top
        const orderedPosts = [
            ...posts.slice(currentIndex),
            ...posts.slice(0, currentIndex),
        ];

        const handleReadMore = (post: BlogPost, e: React.MouseEvent) => {
            e.stopPropagation();
            setExpandedPost(post);
        };

        const handleCloseExpanded = () => {
            setExpandedPost(null);
        };

        return (
            <>
                <CardSwap
                    key={key}
                    width={width}
                    height={height}
                    cardDistance={50}
                    verticalDistance={60}
                    delay={999999}
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
                            <button
                                onClick={(e) => handleReadMore(post, e)}
                                className="flex items-center gap-2 text-[#66FCF1] font-medium hover:text-[#45A29E] transition-colors"
                            >
                                <span>Read more</span>
                                <span>→</span>
                            </button>
                        </Card>
                    ))}
                </CardSwap>

                {/* Expanded Article Modal */}
                <AnimatePresence>
                    {expandedPost && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={handleCloseExpanded}
                        >
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                            {/* Expanded Card */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30
                                }}
                                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto
                                bg-gradient-to-br from-[#1F2833]/95 to-[#0B0C10]/95
                                backdrop-blur-xl border-2 border-[#66FCF1]/50 rounded-3xl p-8 md:p-12
                                shadow-2xl shadow-[#66FCF1]/20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close hint */}
                                <div className="absolute top-4 right-4 text-[#C5C6C7] text-sm opacity-70">
                                    Click outside to close
                                </div>

                                {/* Article Content */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-[#66FCF1] mb-4">
                                            {expandedPost.title}
                                        </h2>
                                        <p className="text-sm text-[#66FCF1] bg-[#0B0C10] px-4 py-2 rounded-lg font-medium border border-[#66FCF1]/30 inline-block">
                                            {expandedPost.date}
                                        </p>
                                    </div>

                                    <div className="prose prose-invert prose-cyan max-w-none">
                                        <p className="text-[#C5C6C7] text-lg leading-relaxed mb-6">
                                            {expandedPost.excerpt}
                                        </p>

                                        {/* Full article content */}
                                        <div className="text-[#C5C6C7] leading-relaxed space-y-4">
                                            <p>
                                                This is where the full article content would be displayed.
                                                In a real implementation, you would fetch the complete article
                                                content from your blog posts data or API.
                                            </p>
                                            <p>
                                                The article can include multiple paragraphs, code blocks,
                                                images, and other rich content formatted in markdown or HTML.
                                            </p>
                                            <p>
                                                Users can scroll through the content and click outside the
                                                card to return to the blog overview.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="pt-6 border-t border-[#1F2833]">
                                        <a
                                            href={`/blog/${expandedPost.slug}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#66FCF1] text-[#0B0C10]
                                            rounded-lg font-semibold transition-all duration-300
                                            hover:scale-105 hover:shadow-lg hover:shadow-[#66FCF1]/50"
                                        >
                                            View Full Article
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }
);

BlogCardSwap.displayName = 'BlogCardSwap';

export default BlogCardSwap;
