import { Buttontile } from "../components/ui/tile"; // Adjust import path as needed
import  Account  from "../components/ui/account";


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
            <Buttontile label="Home" href="/dashboard" Icon={HomeIcon} />
            <Buttontile label="Orders" href="/orders" Icon={OrderIcon} />
            <Buttontile label="Payments" href="/payments" Icon={PaymentIcon} />
          </div>
          <div className="mt-64 translate-y-48">
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
}






