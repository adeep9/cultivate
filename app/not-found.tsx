import { HeroHighlight } from "./components/ui/hero-highlight";
import Link from "next/link"; // Import Link from next/link

const Custom404 = () => {
  return (
    <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4">        
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-8xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
                404
            </h1>
            <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
                Page not found!
            </p>
            <Link href="/login">
            <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Back
            </button>
            </Link>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default Custom404;