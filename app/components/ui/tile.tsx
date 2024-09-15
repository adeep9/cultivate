import { FC } from "react";

// Define prop types for the component
interface ButtontileProps {
  label: string; // Define the type of 'label' as string
  Icon?: FC<{ className?: string }>; // Define the type of 'Icon' as an optional React component
}

export const Buttontile: FC<ButtontileProps> = ({ label, Icon }) => {
  return (
    <div className="w-full">
      <button className="w-full h-8 border border-white bg-transparent text-black font-medium rounded-md mb-3 hover:bg-gray-100/50 hover:border-gray-50 flex items-center justify-left">
        {/* Render the icon if provided */}
        {Icon && <Icon className="ml-2 w-5 h-5" />} {/* Icon component */}
        {/* Label: always visible */}
        <p className="ml-2 tracking-tight text-left">{label}</p>
      </button>
    </div>
  );
};








