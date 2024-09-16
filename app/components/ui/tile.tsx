import { FC } from "react";
import Link from "next/link"; // Import Link component from Next.js

// Define prop types for the component
interface ButtontileProps {
  label: string; // Define the type of 'label' as string
  href: string; // Define the type of 'href' as string for the button link
  Icon?: FC<{ className?: string }>; // Define the type of 'Icon' as an optional React component
}

export const Buttontile: FC<ButtontileProps> = ({ label, href, Icon }) => {
  return (
    <div className="w-full">
      {/* Use Link directly without wrapping in <a> */}
      <Link href={href}>
        {/* Button styled as a link */}
        <button className="w-full h-8 border border-white bg-transparent text-black font-medium rounded-md mb-3 hover:bg-gray-100/50 hover:border-gray-50 flex items-center justify-left">
          {/* Render the icon if provided */}
          {Icon && <Icon className="ml-2 w-5 h-5" />} {/* Icon component */}
          {/* Label: always visible */}
          <p className="ml-2 tracking-tight text-left">{label}</p>
        </button>
      </Link>
    </div>
  );
};










