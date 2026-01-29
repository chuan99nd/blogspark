import Footer from '@/components/Footer';
import Home from '@/app/pages/Home';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-[#334155]">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <Home tagName={undefined} />
      </main>
      <Footer />
    </div>
  );
}
