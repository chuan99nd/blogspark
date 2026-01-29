import Footer from '@/components/Footer';
import PostDetail from '@/app/pages/PostDetail';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-[#334155]">
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                <PostDetail params={{ id }} />
            </main>
            <Footer />
        </div>
    );
}
