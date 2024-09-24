import { Buttontile } from "../ui/tile"; // Adjust import path as needed
import  Account  from "../ui/account";


const HomeIcon = ({ className }: { className?: string }) => (
  <img src="/home.svg" alt="Home Icon" className={className} />
);

const OrderIcon = ({ className }: { className?: string }) => (
  <img src="/package-2.svg" alt="Home Icon" className={className} />
);

const PaymentIcon = ({ className }: { className?: string }) => (
  <img src="/zap.svg" alt="Home Icon" className={className} />
);

export function Sidebar() {

  return (
    <div className="w-60 h-screen bg-white border border-slate-300">
      <div className="p-4 h-full">
        <hr className="border-t border-gray-300 mb-4 mt-16" />
        <div className="w-full h-full">
          <p className="mt-2 ml-1 tracking-tight text-sm text-gray-300"> Main </p>
          <div className="pt-4">
            <Buttontile label="Home" href="/sdashboard" Icon={HomeIcon} />
            <Buttontile label="Orders" href="/supplier/orders" Icon={OrderIcon} />
            <Buttontile label="Fullfillment" href="/supplier/fulfillments" Icon={PaymentIcon} />
            <Buttontile label="Contact" href="/contact" Icon={PaymentIcon} />
          </div>
          <div className="mt-52 translate-y-48">
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
}






