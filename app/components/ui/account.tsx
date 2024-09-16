import Link from "next/link"; // Import the Link component from Next.js
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Ensure you import the Avatar components correctly

const AccountButton = () => {
  return (
    <Link href="/account">
      <div className="pt-2 flex items-center border border-transparent hover:border-gray-200 rounded-md p-2 cursor-pointer transition-colors w-full text-left">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* Name and Email */}
        <div className="ml-3">
          <p className="text-sm font-medium text-black tracking-tight">Adeep Mitra</p>
          <p className="text-xs text-gray-500">adeepmitr@gmail.com</p>
        </div>
      </div>
    </Link>
  );
};

export default AccountButton;



