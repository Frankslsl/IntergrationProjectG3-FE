import { useState, useEffect } from 'react';
import { useAuth } from '../dashboard/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirstName = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login.');
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get('/api/user/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFirstName(response.data.firstName); // Assuming the first name is stored in 'firstName' field
      } catch (error) {
        toast.error('Error fetching first name');
      }
    };

    fetchFirstName();
  }, [navigate]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prevState => !prevState); 
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <span className="text-xl font-bold">Programming Academy</span>
      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center focus:outline-none focus:shadow-outline"
        >
          firstName
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
            <button
              onClick={() => navigate('/profile')}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Profile
            </button>
            <button className="block px-4 py-2 text-sm hover:bg-gray-200">Settings</button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
