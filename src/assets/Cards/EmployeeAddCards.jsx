import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../Config/AxiosInstance';
import { toast } from 'react-toastify';

const EmployeeAddCards = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const courses = watch('course') || []; // Watch for course changes

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setValue('Image', file); // Set the image file in the form data
    } else {
      toast.error("Please upload a valid image (PNG/JPEG).");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    // Check for errors in the required fields
    const missingFields = [];

    if (!data.Name) missingFields.push('Name');
    if (!data.Email) missingFields.push('Email');
    if (!data.Mobile) missingFields.push('Mobile');
    if (!data.Designation) missingFields.push('Designation');
    if (!data.Gender) missingFields.push('Gender');
    if (courses.length === 0) missingFields.push('Course');
    if (!data.Image) missingFields.push('Image');

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return; // Stop submission if there are missing fields
    }

    const employeeData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        employeeData.append(key, data[key].join(',')); // Join array values for submission
      } else {
        employeeData.append(key, data[key]);
      }
    });

    try {
      const response = await axiosInstance({
        url: "/admin/createemployee",
        method: "post",
        data: employeeData,
        withCredentials: true,
      });

      console.log('Employee added:', response.data);
      toast.success("Employee added successfully!");

      // Reset form fields after successful submission
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          setValue(key, []);
        } else {
          setValue(key, '');
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error("Failed to add employee");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Add Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('Name', { required: true })}
            className={`w-full px-3 py-2 border rounded ${errors.Name ? 'border-red-500' : ''}`}
          />
          {errors.Name && <span className="text-red-500">This field is required.</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('Email', { required: true })}
            className={`w-full px-3 py-2 border rounded ${errors.Email ? 'border-red-500' : ''}`}
          />
          {errors.Email && <span className="text-red-500">This field is required.</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="tel"
            {...register('Mobile', { 
              required: true, 
              pattern: { 
                value: /^[0-9]{10}$/, // Ensure it's exactly 10 digits
                message: "Please enter a valid 10-digit mobile number."
              }
            })}
            className={`w-full px-3 py-2 border rounded ${errors.Mobile ? 'border-red-500' : ''}`}
          />
          {errors.Mobile && <span className="text-red-500">{errors.Mobile.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <select
            {...register('Designation', { required: true })}
            className={`w-full px-3 py-2 border rounded ${errors.Designation ? 'border-red-500' : ''}`}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.Designation && <span className="text-red-500">This field is required.</span>}
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
          {errors.Gender && <span className="text-red-500">This field is required.</span>}
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
                    setValue('course', updatedCourses); // Update course state
                  }}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <span className="ml-2">{Course}</span>
              </label>
            ))}
          </div>
          {courses.length === 0 && <span className="text-red-500">Please select at least one course.</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Image (PNG/JPEG)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeAddCards;
