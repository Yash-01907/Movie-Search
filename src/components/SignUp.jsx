// src/components/SignUp.jsx
// A sleek, dark-themed sign-up form refactored with React Hook Form and Tailwind CSS.

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Corrected import path

function SignUp() {
  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  // watch() lets us observe the value of the password field for validation
  const passwordValue = watch("password", "");

  /**
   * This function is called by handleSubmit upon successful validation.
   * @param {object} data - The validated form data.
   */
  const createAccount = (data) => {
    // The password match validation is now handled by react-hook-form,
    // so we don't need a manual check here.

    // --- TODO: Place your registration API call here ---
    // The 'data' object contains { fullName, email, password }
    console.log("Registering user with:", data);

    // On successful registration, navigate the user to another page
    navigate("/");
  };

  return (
    // Main container: fills the viewport, centers content, and sets the dark background color.
    <div className="flex items-center justify-center min-h-screen bg-[#1e1e1e] font-sans">
      {/* Form Card: A slightly lighter dark shade for contrast, with rounded corners and shadow */}
      <div className="w-full max-w-md p-8 space-y-8 bg-[#2a2a2a] rounded-xl shadow-2xl">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Join us by filling out the form below
          </p>
        </div>

        {/* The form now uses handleSubmit to wrap our createAccount function */}
        <form onSubmit={handleSubmit(createAccount)} className="space-y-4">
          
          {/* Full Name Input Field */}
          <div>
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full px-4 py-3 text-white bg-[#333333] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
          </div>

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 text-white bg-[#333333] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Input Field */}
          <div>
            <label htmlFor="confirm-password"className="block mb-2 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="w-full px-4 py-3 text-white bg-[#333333] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "The passwords do not match",
              })}
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2a2a2a] focus:ring-blue-500 transition-transform transform hover:scale-105 duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <hr className="border-gray-600" />

        {/* Footer link to the Sign In page */}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
