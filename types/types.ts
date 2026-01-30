
export interface PostMetadata {
  id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  summary: string;
  tags: string[];
  catalog: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string; // Markdown content
}

export interface SiteConfig {
  author: string;
  role: string;
  avatarUrl: string;
  github: string;
  bio: string;
  footerBio: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}
