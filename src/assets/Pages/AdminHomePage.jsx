import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../Config/AxiosInstance';
import { toast } from 'react-toastify';

const AdminHomePage = () => {
  const [totalEmployees, setTotalEmployees] = useState(0); // State for employee count

  const fetchTotalEmployeeCount = async () => {
    try {
      const response = await axiosInstance.get("/admin/totalcount");
      setTotalEmployees(response?.data.total || 0);
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch total employees");
    }
  };

  useEffect(() => {
    fetchTotalEmployeeCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Main Content */}
      <div className="container mx-auto">
        {/* Welcome Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Welcome to the Admin Dashboard</h2>
          <p className="text-gray-500 text-lg">Manage your employees and keep track of the company's workforce effortlessly.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card for Total Employees */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Total Employees</h3>
            <p className="text-5xl font-bold">{totalEmployees}</p>
          </div>
        </div>

        {/* Add Employee Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Add a New Employee</h2>
            <p className="text-gray-500 mb-6">Easily add a new employee to the company database by clicking the button below.</p>
            <Link to='/addEmployee'>
              <button className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-700 transition duration-300">
                Add Employee
              </button>
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">View All Employees</h2>
            <p className="text-gray-500 mb-6">Access the complete list of employees in the database.</p>
            <Link to='/getAllEmployee'>
              <button className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-700 transition duration-300">
                Get All Employees
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
