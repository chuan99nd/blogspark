import { PostMetadata } from "@/types/types";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { SiteConfig } from "@/types/types";

const POSTS_DIR = path.join(process.cwd(), "public/static");

const mapId2Info = new Map<string, PostMetadata>();

const mapId2Content = new Map<string, string>();

let siteConfig: SiteConfig;

export async function initMapPostInfo() {

    const folders = await fs.readdir(POSTS_DIR, { withFileTypes: true });

    for (const folder of folders) {
        if (!folder.isDirectory()) continue;

        const postId = folder.name;
        const configPath = path.join(POSTS_DIR, postId, "config.yaml");
        const contentPath = path.join(POSTS_DIR, postId, "main.md");

        try {
            const yamlText = await fs.readFile(configPath, "utf-8");
            const metadata = yaml.load(yamlText) as PostMetadata;

            mapId2Info.set(postId, { ...metadata, id: postId });

            const content = await fs.readFile(contentPath, "utf-8");
            mapId2Content.set(postId, content);
        } catch (err) {
            console.error(`❌ Failed to load ${postId}/config.yaml`, err);
        }
    }
    console.log(`✅ Loaded ${mapId2Info.size} posts`);

    const siteConfigPath = path.join(process.cwd(), "public/about.me.json");
    const siteConfigText = await fs.readFile(siteConfigPath, "utf-8");
    siteConfig = JSON.parse(siteConfigText);
    console.log(`✅ Loaded site config`);
}

export function getPostInfo(id: string) {
    return mapId2Info.get(id);
}

export function getPostContent(id: string) {
    return mapId2Content.get(id);
}

export function getSiteConfig(): SiteConfig {
    return siteConfig;
}

export function getAllPosts(): PostMetadata[] {
    return Array.from(mapId2Info.values());
}

export function getSortedTags(): [string, number][] {
    const tagCounts = getAllPosts().reduce((acc, post) => {
        post.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
}