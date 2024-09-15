import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";

export function Dashboard() {
  return (
    <div className="w-full h-screen bg-goated">
      {/* Sidebar will be hidden on medium screens and larger */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* "Hello" will be visible only on small and medium screens */}
      <div className="block md:hidden">
        <Navbar/>
      </div>
    </div>
  );
}


