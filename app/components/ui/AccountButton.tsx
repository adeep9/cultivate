import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Ensure you import the Avatar components correctly
import {
  Sheet,
  SheetContent,
  SheetTrigger, // Import SheetTrigger from Sheet component
} from "@/components/ui/sheet";

import AccountInfo from "./AccountInfo";
import { AccountData } from "../suppliercomponents/DualBar";


const AccountButton = ({accountData}: {accountData: AccountData}) => {
  const {
    name,
    email
  } = accountData.accountInfo
  

  return (
    <Sheet>
      {/* Use SheetTrigger to open the Sheet */}
      <SheetTrigger asChild>
        {/* The trigger content (avatar and user details) */}
        <div className="pt-2 flex items-center border border-transparent hover:border-gray-200 rounded-md p-2 cursor-pointer transition-colors w-full text-left">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{name?name[0]:"N"}</AvatarFallback>
          </Avatar>
          {/* Name and Email */}
          <div className="ml-3">
            <p className="text-sm font-medium text-black tracking-tight break-words whitespace-normal">
              {name || "No Name"}
            </p>
            <p className="text-xs text-gray-500">
              {email ? (email.length > 20 ? `${email.slice(0, 20)}...` : email) : "example@gmail.com"}
            </p>
          </div>
        </div>
      </SheetTrigger>

      {/* Sheet content that will be shown when the trigger is clicked */}
      <SheetContent>
        {/* Add additional content or components here */}
        <div className="p-4">
          <div>
            <AccountInfo accountData={accountData}/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountButton;




