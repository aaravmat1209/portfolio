export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
  comingSoon?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Why AWS Lambda Changed My Development Workflow",
    date: "Coming Soon",
    excerpt: "How serverless functions simplified my backend architecture and reduced costs.",
    slug: "aws-lambda-workflow",
    content: `
## 

This blog post is currently being written and will be available soon.

Check back later for a complete article on AWS Lambda and how it can change your development workflow.
    `,
    comingSoon: true
  },
  {
    id: "2",
    title: "Building a REST API with Express in 10 Minutes",
    date: "Coming Soon",
    excerpt: "A quick guide to creating a functional REST API using Express.js.",
    slug: "express-rest-api",
    content: `
## 

This blog post is currently being written and will be available soon.

Check back later for a complete guide on building REST APIs with Express.js.
    `,
    comingSoon: true
  },
  {
    id: "3",
    title: "Python vs Node.js: Which to Choose for Your API?",
    date: "Coming Soon",
    excerpt: "A focused comparison for backend API development.",
    slug: "python-vs-nodejs-api",
    content: `
## 

This blog post is currently being written and will be available soon.

Check back later for a complete comparison between Python and Node.js for API development.
    `,
    comingSoon: true
  },
];