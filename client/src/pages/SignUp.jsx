import React from 'react';
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="text-2xl font-bold text-blue-900 text-center mb-4">
          Create an Account
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/sign-in" className="text-blue-700 hover:text-blue-800 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;