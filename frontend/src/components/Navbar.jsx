import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50">
      {/* Logo */}
<div className="text-xl font-bold text-primary">
  <a href="/" className="hover:underline">Messenger App</a>
</div>


      {/* Navigation Links */}
      <div className="flex items-center gap-6">
  {/* Settings */}
  <Link to="/settings" className="flex items-center gap-2 text-gray-700 hover:text-primary transition">
    <Settings className="w-5 h-5" />
    <span className="text-sm font-medium">Settings</span>
  </Link>
{/* Profile & Logout - only visible when logged in */}
  {authUser && (
    <>
      <Link
        to="/profile"
        className="text-sm font-medium text-gray-700 hover:text-primary transition"
      >
        Profile
      </Link>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </>
  )}
</div>


      
    </nav>
  );
};

export default Navbar;
