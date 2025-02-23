import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/contextManager";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  handles?: string[];
  lastActive?: Date;
}

const SignUp: React.FC = () => {
  const { signUp, setUser } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    handles: "", // Comma-separated values
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const storedUser = localStorage.getItem("user");
    const existingUser = storedUser ? JSON.parse(storedUser) : null;

    if (existingUser && existingUser.email === formData.email) {
      setError("User already exists. Redirecting to Sign In...");
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const newUser: User = {
        id: crypto.randomUUID(),
        username: formData.username,
        email: formData.email,
        role: "user",
        handles: formData.handles ? formData.handles.split(",").map((h) => h.trim()) : [],
        lastActive: new Date(),
      };

      signUp(newUser);
      setUser(newUser);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-4">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block font-medium text-gray-700">Full Name</label>
            <input id="username" type="text" value={formData.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium text-gray-700">Email Address</label>
            <input id="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
            <input id="password" type="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
            <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="handles" className="block font-medium text-gray-700">Handles (comma-separated)</label>
            <input id="handles" type="text" value={formData.handles} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g. @twitter, @github" />
          </div>

          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg">Sign Up</button>

          <div className="text-center text-sm text-gray-600">
            <p>Already have an account? <Link to="/sign-in" className="text-blue-700 hover:text-blue-800 font-medium">Sign In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
