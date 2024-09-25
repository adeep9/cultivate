import { SupplierSidebar } from "./SupplierSidebar";
import { SupplierNavbar } from "./SupplierNavbar";

export function SupplierDualbar() {
  return (
    <div>
      {/* Sidebar for medium and larger screens */}
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <SupplierSidebar />
      </div>
      
      {/* Main content area with Navbar for smaller screens */}
      <div className="flex-1">
        <div className="block md:hidden">
          <SupplierNavbar />
        </div>
        
      </div>
    </div>
  );
}




