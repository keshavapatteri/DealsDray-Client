import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate import
import Cookies from 'js-cookie'; // Ensure you have this library installed
import { toast } from 'react-toastify'; // Ensure you have this library installed

const AdminHeader = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // State for menu toggle

  // Logout handler
  const handleLogout = () => {
    Cookies.remove('adminLogin'); // Remove admin login cookie
    toast.success('Logout Successful'); // Show success message
    navigate('/login'); // Redirect to login page after logout
  };

  // Menu toggle handler for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the mobile menu
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/getAllEmployee" className="hover:text-gray-400">
            Get All Employees
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-400">
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-14 right-0 bg-gray-800 w-full">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link to="/" className="hover:text-gray-400" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/getAllEmployee" className="hover:text-gray-400" onClick={toggleMenu}>
                  Get All Employees
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="hover:text-gray-400">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
