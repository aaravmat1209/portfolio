export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Why AWS Lambda Changed My Development Workflow",
    date: "May 15, 2025",
    excerpt: "How serverless functions simplified my backend architecture and reduced costs.",
    slug: "aws-lambda-workflow",
    content: `
## What is AWS Lambda?

AWS Lambda is a serverless compute service that lets you run code without provisioning servers. You pay only for the compute time you consume.

## Key Benefits I've Found

- **No server management needed**: AWS handles infrastructure completely
- **Automatic scaling**: Functions scale automatically based on incoming requests
- **Pay-per-use pricing**: Only pay for the exact compute time used, not idle servers
- **Event-driven architecture**: Functions can be triggered by various AWS services

## My Use Case: Dynamic Image Resizing

I built an image processing service that automatically resizes uploaded images:

\`\`\`javascript
exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  
  // Resize the image using Sharp
  const resizedImage = await resizeImage(bucket, key);
  
  // Upload to destination bucket
  await uploadResizedImage(resizedImage);
  
  return { status: 'success' };
};
\`\`\`

This Lambda function triggers whenever an image is uploaded to S3, processes it, and saves the result—all without managing any servers.

## Cost Comparison

For my image service that processes ~5,000 images per month:

- Traditional EC2: $18-25/month (t3.small)
- Lambda: $0.20-0.35/month

The dramatic cost reduction comes from only paying for actual usage rather than keeping a server running 24/7.
    `,
  },
  {
    id: "2",
    title: "Building a REST API with Express in 10 Minutes",
    date: "March 23, 2025",
    excerpt: "A quick guide to creating a functional REST API using Express.js.",
    slug: "express-rest-api",
    content: `
## Setting Up Express

First, create a new project and install Express:

\`\`\`bash
npm init -y
npm install express
\`\`\`

## Creating the Basic API

Create an \`index.js\` file with this basic structure:

\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
const books = [
  { id: 1, title: "Clean Code", author: "Robert Martin" },
  { id: 2, title: "The Pragmatic Programmer", author: "Dave Thomas" }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET a single book
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST a new book
app.post('/api/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.status(201).json(book);
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`

## Testing Your API

Test with curl or Postman:

\`\`\`bash
# Get all books
curl http://localhost:3000/api/books


That's it! You now have a functional REST API in just 10 minutes.

## Next Steps

To make this production-ready, consider adding:
- Data validation
- Error handling
- Authentication
- Database integration
    `,
  },
  {
    id: "3",
    title: "Python vs Node.js: Which to Choose for Your API?",
    date: "February 15, 2025",
    excerpt: "A focused comparison for backend API development.",
    slug: "python-vs-nodejs-api",
    content: `
## Quick Comparison

| Feature | Python | Node.js |
|---------|--------|---------|
| Performance | Good for CPU-intensive tasks | Excellent for I/O operations |
| Concurrency | Uses multi-processing | Single-threaded event loop |
| Learning curve | Gentle, readable syntax | Steeper if new to callbacks/promises |
| Package ecosystem | PyPI (extensive) | npm (largest package registry) |

## Request Handling Performance

For a simple "Hello World" API handling 10,000 requests:

- **Node.js (Express)**: ~8,000 req/sec
- **Python (FastAPI)**: ~3,000 req/sec
- **Python (Flask)**: ~2,000 req/sec

## Code Comparison: Creating a Simple API Endpoint

**Python (FastAPI):**
\`\`\`python
from fastapi import FastAPI
app = FastAPI()

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "Example User"}
\`\`\`

**Node.js (Express):**
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/users/:userId', (req, res) => {
  res.json({
    userId: parseInt(req.params.userId),
    name: "Example User"
  });
});
\`\`\`

## When to Choose Which?

**Choose Python when:**
- Working with data science/ML workflows
- Need readable, simple syntax
- Working with CPU-intensive operations

**Choose Node.js when:**
- Building real-time applications
- Handling many concurrent requests
- Creating full-stack JavaScript applications
    `,
  },
];