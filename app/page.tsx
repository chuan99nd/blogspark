import Footer from '@/components/Footer';
import Home from '@/app/pages/Home';
import { getTagsList } from '@/libs/cache';
import type { Metadata } from 'next';

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "BlogSpark — Platform Engineering & DevOps Blog",
  description:
    "Insights on platform engineering, Kubernetes, DevOps, and scalable infrastructure. Written by Hoàng Chuẩn Trần.",
  alternates: { canonical: "/" },
};

export async function generateStaticParams() {
  const tags = await getTagsList();

  return tags.map(tag => ({ tagName: tag }));
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-8 md:py-12 max-w-6xl">
        <Home tagName={undefined} />
      </main>
      <Footer />
    </div>
  );
}
