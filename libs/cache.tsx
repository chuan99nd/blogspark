import fs from "fs/promises"
import path from "path"
import yaml from "js-yaml"
import { cache } from "react"
import { PostMetadata, SiteConfig } from "@/types/types"

const POSTS_DIR = path.join(process.cwd(), "public/static")

type PostStore = {
    posts: Map<string, PostMetadata>
    contents: Map<string, string>
    siteConfig: SiteConfig
}

export const loadPosts = cache(async (): Promise<PostStore> => {
    const posts = new Map<string, PostMetadata>()
    const contents = new Map<string, string>()

    const folders = await fs.readdir(POSTS_DIR, { withFileTypes: true })

    for (const folder of folders) {
        if (!folder.isDirectory()) continue

        const postId = folder.name
        const configPath = path.join(POSTS_DIR, postId, "_config.yaml")
        const contentPath = path.join(POSTS_DIR, postId, "_main.md")

        try {
            const yamlText = await fs.readFile(configPath, "utf-8")
            const metadata = yaml.load(yamlText) as PostMetadata

            posts.set(postId, { ...metadata, id: postId })

            const content = await fs.readFile(contentPath, "utf-8")
            contents.set(postId, content)
        } catch (err) {
            console.error(`❌ Failed to load ${postId}`, err)
        }
    }

    const siteConfigPath = path.join(process.cwd(), "public/about.me.json")
    const siteConfigText = await fs.readFile(siteConfigPath, "utf-8")

    return {
        posts,
        contents,
        siteConfig: JSON.parse(siteConfigText),
    }
})

export async function getPostInfo(id: string) {
    const { posts } = await loadPosts();
    return posts.get(id);
}

export async function getPostContent(id: string) {
    const { contents } = await loadPosts();
    return contents.get(id);
}

export async function getSiteConfig(): Promise<SiteConfig> {
    const { siteConfig } = await loadPosts();
    return siteConfig;
}

export async function getAllPosts(): Promise<PostMetadata[]> {
    const { posts } = await loadPosts();
    return Array.from(posts.values());
}

export async function getSortedTags(): Promise<[string, number][]> {
    const posts = await getAllPosts();
    const tagCounts = posts.reduce((acc, post) => {
        post.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
}

export async function getTagsList() {
    const tags = await getSortedTags();
    return tags.map(tag => tag[0]);
}

export async function getPostsList() {
    const posts = await getAllPosts();
    return posts.map(post => post.id);
}