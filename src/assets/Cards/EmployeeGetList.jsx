import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../Config/AxiosInstance.jsx';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const EmployeeGetList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this to display more or fewer items per page

  const getAllEmployees = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/getall",
        method: "GET",
        withCredentials: true,
      });

      setEmployees(response?.data?.data || []);
      setFilteredEmployees(response?.data?.data || []);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch employee list");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      const response = await axiosInstance({
        url: `/admin/delete/${id}`,
        method: "DELETE",
        withCredentials: true,
      });

      setFilteredEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete employee");
    }
  };

  // Function to toggle employee status
  const updateStatus = async (id) => {
    try {
      const response = await axiosInstance({
        url: `/admin/updateStatus/${id}`,
        method: "PATCH",
        withCredentials: true,
      });

      const updatedStatus = response.data.employee.status; // Assuming this returns the updated employee object
      setFilteredEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === id ? { ...employee, status: updatedStatus } : employee
        )
      );
      toast.success("Employee status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update employee status");
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  // Sorting logic
  const sortEmployees = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = React.useMemo(() => {
    let sortableEmployees = [...filteredEmployees];
    if (sortConfig.key !== null) {
      sortableEmployees.sort((a, b) => {
        if (sortConfig.key === 'Createdate') {
          return sortConfig.direction === 'asc'
            ? new Date(a.Createdate) - new Date(b.Createdate)
            : new Date(b.Createdate) - new Date(a.Createdate);
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [filteredEmployees, sortConfig]);

  // Trigger search on button click
  const onSearch = () => {
    const filtered = employees.filter((employee) => {
      return (
        employee.Name.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.Email.toLowerCase().includes(searchText.toLowerCase()) ||
        employee._id.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  
  // Get current employees for the current page
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or ID"
          className="border rounded-lg py-2 px-4 w-2/3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={onSearch}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Sl No</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4 cursor-pointer" onClick={() => sortEmployees('Name')}>
                  Name {sortConfig.key === 'Name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="py-2 px-4 cursor-pointer" onClick={() => sortEmployees('Email')}>
                  Email {sortConfig.key === 'Email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="py-2 px-4">Mobile No</th>
                <th className="py-2 px-4">Designation</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Course</th>
                <th className="py-2 px-4 cursor-pointer" onClick={() => sortEmployees('Createdate')}>
                  Create Date {sortConfig.key === 'Createdate' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee, index) => (
                  <tr key={employee._id} className="border-b">
                    <td className="py-2 px-4">{index + 1 + indexOfFirstEmployee}</td>
                    <td className="py-2 px-4">
                      {employee.Image ? (
                        <img
                          src={employee.Image}
                          alt={employee.Name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                          <span>No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4">{employee.Name}</td>
                    <td className="py-2 px-4">
                      <a href={`mailto:${employee.Email}`} className="text-blue-500 hover:underline">
                        {employee.Email}
                      </a>
                    </td>
                    <td className="py-2 px-4">{employee.Mobile}</td>
                    <td className="py-2 px-4">{employee.Designation}</td>
                    <td className="py-2 px-4">{employee.Gender}</td>
                    <td className="py-2 px-4">{employee.Course}</td>
                    <td className="py-2 px-4">{new Date(employee.Createdate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <span className={`font-semibold ${employee.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex space-x-2">
                      <Link to={`/AdminEmployeeEdit/${employee._id}`} className="py-1 px-3 bg-blue-500 text-white rounded">
                        Update
                      </Link>
                      <button
                        onClick={() => deleteEmployee(employee._id)}
                        className="ml-2 py-1 px-3 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => updateStatus(employee._id)}
                        className={`py-1 px-3 rounded ${employee.status === 'Active' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      >
                        {employee.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                     
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeGetList;
