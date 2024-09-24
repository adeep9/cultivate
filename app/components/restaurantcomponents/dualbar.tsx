import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export function Dualbar() {

  // Access user type. Session data? R or S?
  // Get navbar constant links depending on user type
  // Map navbar links within <p> tags

  return (
    <div>
      {/* Sidebar for medium and larger screens */}
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <Sidebar />
      </div>
      
      {/* Main content area with Navbar for smaller screens */}
      <div className="flex-1">
        <div className="block md:hidden">
          <Navbar />
        </div>
        
      </div>
    </div>
  );
}




