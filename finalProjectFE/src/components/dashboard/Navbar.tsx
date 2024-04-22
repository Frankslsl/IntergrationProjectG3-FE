import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastConfig from "../toastConfig/toastConfig";
import { useAuth } from "../dashboard/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsprofileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleProfileMenu = () => {
    setIsprofileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <span className="text-xl font-bold">Programming Academy</span>
      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center focus:outline-none focus:shadow-outline"
        >
          {user?.username}
          <svg
            className="fill-current h-4 w-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 text-black">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                try {
                  logout();
                  toast.success("Logout successfully", {
                    ...toastConfig,
                    position: "top-center",
                  });
                  navigate("/home");
                } catch (error) {
                  console.error(error);
                }
              }}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
