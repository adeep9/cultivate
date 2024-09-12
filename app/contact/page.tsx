import { HeroHighlight } from "../components/ui/hero-highlight";
import Link from "next/link"; // Import Link from next/link

const Exists = () => {
  return (
    <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4">        
        <div className="space-y-8 animate-fade-in">
                <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
                    Contact Us Today!
                </p>
                <p className="text-sm font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
                    Ph: 0490 383 021<br/>
                    Email: admin@cultivate.com.au
                </p>
                <Link href="/signup">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Phone
                </button>
                </Link>
                <Link href="/login">
                <button
                    className="px-4 m-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Email
                </button>
                </Link>

        </div>
      </div>
    </HeroHighlight>
  );
};

export default Exists;