import Footer from '@/components/Footer';
import Home from '@/app/pages/Home';

export default async function PageFilter({
    params,
}: {
    params: Promise<{ tagName: string }>;
}) {
    const { tagName } = await params;

    return (
        <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-[#334155]">
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                <Home tagName={decodeURIComponent(tagName)} />
            </main>
            <Footer />
        </div>
    );
}
