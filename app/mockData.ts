
import { Post, SiteConfig } from '../types/types';

export const siteConfig: SiteConfig = {
  author: "Trung Hieu (Elliot) Nguyen",
  github: "https://github.com/hieu-nguyen",
  bio: "Hi, I’m Trung Hieu (Elliot) Nguyen, a software engineer passionate about building scalable backend systems and exploring innovative tech solutions. On this blog, I share insights, experiences, and lessons learned from my journey in software development. Thanks for stopping by!",
  socials: {
    twitter: "https://twitter.com/hieudev",
    linkedin: "https://linkedin.com/in/hieu-nguyen",
    email: "contact@hieu.dev"
  }
};

export const mockPosts: Post[] = [
  {
    metadata: {
      id: "mvcc-deep-dive",
      title: "Multi-version Concurrent Control",
      createdAt: "2026-01-26T00:00:00Z",
      modifiedAt: "2026-01-26T00:00:00Z",
      summary: "A practical deep dive into MVCC: concurrency protocols, version storage, garbage collection, and index design.",
      tags: ["Backend", "Paper Notes"],
      catalog: "engineering"
    },
    content: "# Multi-version Concurrent Control\n\nDeep dive into how databases manage concurrency without locking..."
  },
  {
    metadata: {
      id: "amazon-dynamodb-architecture",
      title: "Amazon DynamoDB: A Scalable, Predictably Performant, and Fully Managed NoSQL Database Service",
      createdAt: "2026-01-15T00:00:00Z",
      modifiedAt: "2026-01-15T00:00:00Z",
      summary: "A practical tour of DynamoDB's architecture: how it partitions data, controls throughput with GAC, balances hot spots, and keeps availability and durability high.",
      tags: ["Distributed System", "Backend"],
      catalog: "engineering"
    },
    content: "# Amazon DynamoDB Architecture\n\nExploring the internals of one of the world's most scalable NoSQL databases..."
  },
  {
    metadata: {
      id: "intro-to-zookeeper",
      title: "Introduction To ZooKeeper",
      createdAt: "2025-10-05T00:00:00Z",
      modifiedAt: "2025-10-05T00:00:00Z",
      summary: "A practical tour of ZooKeeper's data model, common recipes (locks, barriers, group membership), and the internals (ZAB, snapshots) that make it reliable.",
      tags: ["Distributed System", "Backend"],
      catalog: "engineering"
    },
    content: "# Introduction To ZooKeeper\n\nHow coordination services work in distributed environments..."
  },
  {
    metadata: {
      id: "web-dev-essentials",
      title: "Modern Web Development Essentials",
      createdAt: "2025-09-20T00:00:00Z",
      modifiedAt: "2025-09-20T00:00:00Z",
      summary: "Essential tools and practices for building high-performance web applications in 2025.",
      tags: ["Web Development", "JavaScript", "Front-end"],
      catalog: "engineering"
    },
    content: "Content about web development..."
  },
  {
    metadata: {
      id: "react-19-features",
      title: "React 19: What's New and Why It Matters",
      createdAt: "2025-08-12T00:00:00Z",
      modifiedAt: "2025-08-12T00:00:00Z",
      summary: "An overview of the latest features in React 19, including the React Compiler and Server Components improvements.",
      tags: ["Front-end", "JavaScript"],
      catalog: "engineering"
    },
    content: "Content about React 19..."
  },
  {
    metadata: {
      id: "cracking-the-system-design",
      title: "Cracking the System Design Interview",
      createdAt: "2025-07-01T00:00:00Z",
      modifiedAt: "2025-07-01T00:00:00Z",
      summary: "Key concepts and patterns to master for system design interviews at big tech companies.",
      tags: ["Interview", "Backend", "Distributed System"],
      catalog: "career"
    },
    content: "Content about interviews..."
  },
  {
    metadata: {
      id: "cpp-concurrency",
      title: "Conquering Concurrency in C++23",
      createdAt: "2025-06-15T00:00:00Z",
      modifiedAt: "2025-06-15T00:00:00Z",
      summary: "Modern approaches to thread safety, jthread, and atomic operations in the latest C++ standard.",
      tags: ["C++", "Backend"],
      catalog: "engineering"
    },
    content: "Content about C++..."
  },
  {
    metadata: {
      id: "competitive-programming-tips",
      title: "Competitive Programming: A Roadmap",
      createdAt: "2025-05-10T00:00:00Z",
      modifiedAt: "2025-05-10T00:00:00Z",
      summary: "How to prepare for coding contests and improve your algorithmic thinking.",
      tags: ["Competitive Programming", "JavaScript"],
      catalog: "learning"
    },
    content: "Content about CP..."
  }
];
