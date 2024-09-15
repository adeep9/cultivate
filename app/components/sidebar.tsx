import Link from "next/link";
import { Buttontile } from "../components/ui/tile"; // Adjust import path as needed
import { Account } from "../components/ui/account";
import { SVGProps } from "react";

// Define the type for the SVG props
const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h18v18H3V3z"
    />
  </svg>
);

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

export function Sidebar() {
  return (
    <div className="w-60 h-screen bg-white border border-slate-300">
      <div className="p-4 h-full">
        <hr className="border-t border-gray-300 mb-4 mt-16" />
        <div className="w-full h-full">
          <p className="mt-2 ml-1 tracking-tight text-sm text-gray-300"> Main </p>
          <div className="pt-4">
            <Buttontile label="Dashboard" Icon={DashboardIcon} />
            <Buttontile label="Orders" Icon={SettingsIcon} />
            <Buttontile label="Payments" Icon={SettingsIcon} />
          </div>
          <Account />
        </div>
      </div>
    </div>
  );
}






