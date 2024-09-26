import { Buttontile } from "../ui/tile"; // Adjust import path as needed
import { AccountData } from "./DualBar";
import AccountButton from "../ui/AccountButton";
import { ContactIcon, KeyIcon } from "lucide-react";

const OrderIcon = ({ className }: { className?: string }) => (
  <img src="/package-2.svg" alt="Home Icon" className={className} />
);

const PaymentIcon = ({ className }: { className?: string }) => (
  <img src="/zap.svg" alt="Home Icon" className={className} />
);

export function Sidebar({accountData}: {accountData: AccountData}) {

  return (
    <div className="w-60 h-screen bg-white border border-slate-300 flex flex-col justify-between">
      <div className="p-4">
        {/** Polinate main logo */}
        <img src="/logofull.svg" alt="polinate logo" className="w-36 h-16 transform translate-x-6" />
        <hr className="border-t border-gray-300 mb-4 mt-4" />
        {accountData.accountType === "restaurant" ? (
          <p className="mt-2 ml-1 tracking-tight text-sm text-gray-300"> Restaurant Partner</p>
        ) : (
          <p className="mt-2 ml-1 tracking-tight text-sm text-gray-300"> Supplier Partner</p>
        )}
        
        <div className="pt-4">
          {/*<Buttontile label="Home" href="/rdashboard" Icon={HomeIcon} />*/}
          {accountData.accountType === "restaurant" ? (
            <>
              <Buttontile label="Orders" href="/restaurant/orders" Icon={OrderIcon} />
              <Buttontile label="Par Levels" href="/restaurant/parlevels" Icon={KeyIcon} />
              <Buttontile label="Contact" href="/restaurant/contact" Icon={ContactIcon} />
            </>
          ) : (
            <>
              <Buttontile label="Orders" href="/supplier/orders" Icon={OrderIcon} />
              <Buttontile label="Contact" href="/supplier/contact" Icon={ContactIcon} />
            </>
          )}
          
        </div>
      </div>
      {/* Pin the Account component to the bottom */}
      <div className="p-4">
        <AccountButton accountData={accountData}/>
      </div>
    </div>
  );
}






