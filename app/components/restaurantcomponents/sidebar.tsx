import { Buttontile } from "../ui/tile"; // Adjust import path as needed
import  Account  from "../ui/account";
import { ContactIcon, KeyIcon } from "lucide-react";

const OrderIcon = ({ className }: { className?: string }) => (
  <img src="/package-2.svg" alt="Home Icon" className={className} />
);

export function Sidebar() {
  return (
    <div className="w-60 h-screen bg-white border border-slate-300 flex flex-col justify-between">
      <div className="p-4">
        <hr className="border-t border-gray-300 mb-4 mt-16" />
        <p className="mt-2 ml-1 tracking-tight text-sm text-gray-300"> Main </p>
        <div className="pt-4">
          {/*<Buttontile label="Home" href="/rdashboard" Icon={HomeIcon} />*/}
          <Buttontile label="Orders" href="/restaurant/orders" Icon={OrderIcon} />
          <Buttontile label="Par Levels" href="/restaurant/parlevels" Icon={KeyIcon} />
          <Buttontile label="Contact" href="/restaurant/contact" Icon={ContactIcon} />
        </div>
      </div>
      {/* Pin the Account component to the bottom */}
      <div className="p-4">
        <Account />
      </div>
    </div>
  );
}






