import { HeroHighlight } from "@/app/components/ui/hero-highlight"
import Link from "next/link"

const Contact = () => {
  return (
    <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4">        
        <div className="space-y-8 animate-fade-in">
                <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
                    Contact Us!
                </p>
                <Link href="/login">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Phone
                </button>
                </Link>
                <Link href="/">
                <button
                    className="px-4 m-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Email
                </button>
                </Link>
        </div>
      </div>
    </HeroHighlight>
  )
}

export default Contact