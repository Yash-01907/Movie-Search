// src/components/Login.jsx
// A sleek, dark-themed login form refactored with React Hook Form and Tailwind CSS.

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

function Login() {
  // Initialize React Hook Form for state management and validation
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  /**
   * This function is called by handleSubmit after successful form validation.
   * @param {object} data - The validated form data, containing email and password.
   */
  const handleLogin = (data) => {
    // --- TODO: Place your authentication logic here ---
    // Example: Call an API with the email and password from the 'data' object
    console.log('Attempting to log in with:', data);

    // On a successful login from your API, you would navigate the user
    // navigate('/dashboard');
  };

  return (
    // Main container: fills the viewport, centers content, and sets the dark background color.
    <div className="flex items-center justify-center min-h-screen bg-[#1e1e1e] font-sans">
      
      {/* Form Card: A slightly lighter dark shade to stand out, with rounded corners and shadow */}
      <div className="w-full max-w-md p-8 space-y-8 bg-[#2a2a2a] rounded-xl shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue
          </p>
        </div>

        {/* The form now uses handleSubmit to wrap the handleLogin function */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          
          {/* Email Input Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 text-white bg-[#333333] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          {/* Password Input Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 text-white bg-[#333333] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2a2a2a] focus:ring-blue-500 transition-transform transform hover:scale-105 duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        <hr className="border-gray-600" />

        {/* Footer link to the Sign Up page */}
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
