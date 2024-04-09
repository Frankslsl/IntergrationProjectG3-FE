import { Component } from "react";
import { useAuth } from "../dashboard/authContext";

interface User {
  email: string;
  username: string;
}

interface NavbarProps {
  user?: User | null;
  logout?: () => void;
}

interface NavbarState {
  isProfileMenuOpen: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  state: NavbarState = {
    isProfileMenuOpen: false,
  };
  toggleProfileMenu = () => {
    this.setState((prevState) => ({
      isProfileMenuOpen: !prevState.isProfileMenuOpen,
    }));
  };
  render() {
    const { isProfileMenuOpen } = this.state;
    const { user, logout } = this.props;
    return (
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold">Programming Academy</span>
        <div className="relative">
          <button
            onClick={this.toggleProfileMenu}
            className="flex items-center focus:outline-none focus:shadow-outline"
          >
            {user ? user.username : "Guest"}
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
                href="/user-profile"
                className="block px-4 py-2 text-sm hover:bg-gray-200"
              >
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Settings
              </a>
              {logout && (
                <a
                  href="#"
                  onClick={logout}
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Logout
                </a>
              )}
            </div>
          )}
        </div>
      </nav>
    );
  }
}

function NavbarWrapper() {
  const { user, logout } = useAuth();

  return <Navbar user={user} logout={logout} />;
}

export default NavbarWrapper;
