export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  slug: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Learning about Cloud Development",
    date: "May 15, 2025",
    excerpt: "A deep dive into the technologies and design decisions behind my portfolio website.",
    slug: "how-i-built-this-portfolio",
  },
  {
    id: "2",
    title: "My Development Workflow in 2025",
    date: "March 23, 2025",
    excerpt: "Tools, techniques, and habits that have improved my productivity as a developer.",
    slug: "development-workflow-2025",
  },
  {
    id: "3",
    title: "Exploring New Web Technologies",
    date: "February 15, 2025",
    excerpt: "An overview of emerging web technologies that are changing how we build applications.",
    slug: "exploring-new-web-technologies",
  },
];