import Footer from '@/components/Footer';
import Home from '@/app/pages/Home';
import { getTagsList } from '@/libs/cache';
import type { Metadata } from 'next';

export const dynamic = "force-static"

export async function generateStaticParams() {
    const tags = await getTagsList();
    return tags.map(tag => ({ tagName: encodeURIComponent(tag) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ tagName: string }>;
}): Promise<Metadata> {
    const { tagName } = await params;
    const decoded = decodeURIComponent(tagName);
    const title = `Posts tagged "${decoded}"`;
    const description = `Browse all blog posts tagged with ${decoded} — platform engineering, DevOps, and infrastructure insights.`;

    return {
        title,
        description,
        alternates: { canonical: `/tag/${tagName}` },
        openGraph: {
            title,
            description,
            type: "website",
        },
    };
}

export default async function PageFilter({
    params,
}: {
    params: Promise<{ tagName: string }>;
}) {
    const { tagName } = await params;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto px-6 py-8 md:py-12 max-w-6xl">
                <Home tagName={decodeURIComponent(tagName)} />
            </main>
            <Footer />
        </div>
    );
}
