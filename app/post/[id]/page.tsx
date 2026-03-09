import Footer from '@/components/Footer';
import PostDetail from '@/app/pages/PostDetail';
import { getPostsList, getPostInfo, getSiteConfig } from '@/libs/cache';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blogspark.dev";

export const dynamic = "force-static"

export async function generateStaticParams() {
    const posts = await getPostsList();
    return posts.map(post => ({ id: post }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = await getPostInfo(id);
    const siteConfig = await getSiteConfig();

    if (!post) {
        return { title: "Post Not Found" };
    }

    const title = post.title;
    const description = post.summary.slice(0, 155);
    const url = `${SITE_URL}/post/${id}`;

    return {
        title,
        description,
        authors: [{ name: siteConfig.author }],
        keywords: post.tags,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            title,
            description,
            url,
            publishedTime: post.createdAt,
            modifiedTime: post.modifiedAt,
            authors: [siteConfig.author],
            tags: post.tags,
            siteName: "BlogSpark",
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostInfo(id);
    const siteConfig = await getSiteConfig();

    const jsonLd = post
        ? {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.createdAt,
              dateModified: post.modifiedAt,
              author: {
                  "@type": "Person",
                  name: siteConfig.author,
                  url: siteConfig.github,
              },
              description: post.summary,
              url: `${SITE_URL}/post/${id}`,
              keywords: post.tags,
          }
        : null;

    return (
        <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-[#334155]">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-3xl">
                <PostDetail params={{ id }} />
            </main>
            <Footer />
        </div>
    );
}
