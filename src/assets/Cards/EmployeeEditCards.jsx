import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../Config/AxiosInstance';

const EmployeeEditCards = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const courses = watch('Course') || []; 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch employee data when the component mounts
    const fetchEmployeeData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance.get(`/admin/getById/${id}`); 
        const employeeData = response.data.data;
        console.log(response);

        // Set default values in the form
        reset({
          Name: employeeData.Name,
          Email: employeeData.Email,
          Mobile: employeeData.Mobile,
          Designation: employeeData.Designation,
          Gender: employeeData.Gender,
          Course: employeeData.Course ? employeeData.Course.split(',') : [], // Split array values for courses
          Image: employeeData.Image || '', // Assuming you want to show the image URL as well
        });
        
        
      } catch (error) {
        console.error('Error fetching employee data:', error);
        toast.error("Failed to fetch employee data");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchEmployeeData();
  }, [id, reset]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setValue('Image', file); // Set the image file in the form data
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please upload a valid image (PNG/JPEG).");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const employeeData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        employeeData.append(key, data[key].join(',')); // Join array values for submission
      } else {
        employeeData.append(key, data[key]);
      }
    });

    try {
        const response = await axiosInstance.put(`/admin/updateEmployee/${id}`, employeeData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type if necessary
            },
            withCredentials: true,
          });

      console.log('Employee updated:', response.data);
      if (response.data) {
        toast.success("Employee updated successfully!");
        reset(); // Reset the form fields

        // Navigate to another page (e.g., employee list) after update
        navigate('/getAllEmployee'); // Adjust the route as necessary
      } else {
        toast.error("Update failed: " + response.data.message);
      }
    } catch (error) {
      console.error('Error updating employee:', error.response ? error.response.data : error);
      toast.error("Failed to update employee");
    }
  };

  if (loading) {
    return <div className="text-center">Loading employee data...</div>; // Loading indicator
  }
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Edit Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields remain unchanged */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('Name', { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('Email', { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="tel"
            {...register('Mobile', { required: true, pattern: { value: /^\d{10}$/, message: "Please enter a valid 10-digit mobile number." } })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <select
            {...register('Designation', { required: true })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register('Gender', { required: true })}
                value="Male"
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Male</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                {...register('Gender', { required: true })}
                value="Female"
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Female</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                {...register('Gender', { required: true })}
                value="Other"
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Course</label>
          <div className="flex flex-col space-y-2">
            {['MCA', 'BCA', 'BSc'].map((Course) => (
              <label key={Course} className="flex items-center">
                <input
                  type="checkbox"
                  {...register('Course')}
                  value={Course}
                  checked={courses.includes(Course)}
                  onChange={(e) => {
                    const updatedCourses = e.target.checked
                      ? [...courses, Course]
                      : courses.filter((c) => c !== Course);
                    setValue('Course', updatedCourses); // Update course state
                  }}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <span className="ml-2">{Course}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Image (PNG/JPEG)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeEditCards;
