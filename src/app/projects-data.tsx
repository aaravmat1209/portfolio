export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
  github?: string;
  featured: boolean;
  tech: string[];
};

export const PROJECTS = [
  {
    id: 1,
    title: "ChargeZone Pipeline",
    description: "An ML OPS pipeline that ingests, processes, and stores EV charging data from transformed excel files. The pipeline uses a PCA and KMeans clustering models to generate insights and predictions.",
    image: "/projects/chargezone.png",
    link: "https://github.com/aaravmat1209/chargezone-pipeline",
    github: "https://github.com/aaravmat1209/chargezone-pipeline",
    featured: true,
    tech: ["React.js", "Data Analaytics", "K-Means Clustering", "PCA", "MLOPS", "Python Flask", "Data Visualization"]
  },
  {
    id: 2,
    title: "Renvue.ai (Hackathon Winner)",
    description: "An AI powered marketplace to match investors with startups. Using advanced matching algorithms and natural language processing to analyze startup pitches and investor preferences, creating optimal connections in the venture ecosystem.",
    image: "/projects/renvue.png",
    link: "https://renvue.vercel.app/",
    github: "https://github.com/aaravmat1209/renvue",
    featured: true,
    tech: ["Next.js", "React", "Node.js", "Perplexity AI agent", "HuggingFace Transformers"]
  },
  {
    id: 3,
    title: "Gradify.io (Hackathon Winner)",
    description: "An Gemini based AI autograder that can evaluate multiple assignments based on multimodal inputs and provide feedback. The system handles various file formats, provides detailed scoring rubrics, and generates constructive feedback for students.",
    image: "/projects/gradify.png",
    link: "https://gradifyy.vercel.app/",
    github: "https://github.com/aaravmat1209/gradify",
    featured: true,
    tech: ["Gemini API", "TypeScript", "React", "OpenAI API", "LangChain", "FAISS"]
  },
  {
    id: 4,
    title: "Doable.ai (Hackathon Winner)",
    description: "An AI powered To-do list that gamifies your goals and helps you achieve them in a fun way.",
    image: "/projects/doable.jpeg",
    link: "https://doableai.vercel.app/",
    github: "https://github.com/aaravmat1209/doable.ai",
    featured: true,
    tech: ["React", "TypeScript", "Gemini API", "Firebase", "JavaScript"]
  },
  {
    id: 5,
    title: "FinScrape",
    description: "A web scraping Chrome extension that extract financial data from various sources using ensemble machine learning models. Processes unstructured data across financial websites and delivers structured insights for investment decision-making.",
    image: "/projects/finscrape.png",
    link: "https://github.com/aaravmat1209/FinScrape",
    github: "https://github.com/aaravmat1209/FinScrape",
    featured: false,
    tech: ["Yahoo Finance API", "LSTM", "RNNs", "Flask", "JSON"]
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "A responsive portfolio website built with Next.js and Tailwind CSS. Features include dark mode, animations, and a blog section with markdown support.",
    image: "/projects/portfolio.png",
    link: "https://github.com/aaravmat1209/portfolio",
    github: "https://github.com/aaravmat1209/portfolio",
    featured: false,
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"]
  },
  {
    id: 7,
    title: "Clivor.ai",
    description: "An RTMS zoom companion tool that helps with vocab simplification, real time translations and context overviews.",
    image: "/projects/clivor.png",
    link: "https://github.com/aaravmat1209/clivor-ai",
    github: "https://github.com/aaravmat1209/clivor-ai",
    featured: false,
    tech: ["NodeJS", "ZoomSDK", "RTMS", "WebSockets", "GeminiAPI"]
  },
  {
    id: 8,
    title: "TIAA Data Pipeline",
    description: "A AWS data pipeline that ingests, processes, and stores financial data from excel files. The pipeline uses AWS Lambda ,S3 and RDS for metadata generation and business insights",
    image: "/projects/tiaa.png",
    link: "https://github.com/aaravmat1209/TIAA",
    github: "https://github.com/aaravmat1209/TIAA",
    featured: false,
    tech: ["AWS SDK", "RDS", "S3", "CloudWatch", "Lambda", "Python", "gaitLLM(OpenAI)"]
  }
];

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(project => project.featured);
}

// Helper function to get a project by id
export function getProjectById(id: number): Project | undefined {
  return PROJECTS.find(project => project.id === id);
}