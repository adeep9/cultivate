import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Account() {
  return (
    <div className="mt-64 transform translate-y-44">
      <hr className="border-t border-gray-300 mb-4 mt-16" />
      {/* Button with hover effect and styling */}
      <button className="pt-2 flex items-center border border-transparent hover:border-gray-200 rounded-md p-2 cursor-pointer transition-colors w-full text-left">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* Name and Email */}
        <div className="ml-3">
          <p className="text-sm font-medium text-black tracking-tight">Adeep Mitra</p>
          <p className="text-xs text-gray-500">adeepmitr@gmail.com</p>
        </div>
      </button>
    </div>
  );
}

