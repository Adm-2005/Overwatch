import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/contextManager";

const API_URL = import.meta.env.VITE_API_URL;

const Connection = () => {
  const { platform } = useParams();
  const { user } = useAppContext();

  const isDiscord = platform === "discord";

  const [formData, setFormData] = useState({
    ...(isDiscord ? { server_id: "", server_name: "" } : { group_id: "", group_name: "" }),
    owner_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("You need to be logged in to connect.");
      setLoading(false);
      return;
    }

    const endpoint = isDiscord ? "/discord/connect" : "/telegram/connect";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...formData, user_id: user.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Successfully connected!");
      } else {
        setError(data.error || "Connection failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#A2C6EA]">
      <Navbar />

      <div className="flex flex-grow items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            {isDiscord ? "Connect Discord Server" : "Connect Telegram Group"}
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              name={isDiscord ? "server_id" : "group_id"}
              placeholder={isDiscord ? "Enter Server ID" : "Enter Group ID"}
              value={isDiscord ? formData.server_id : formData.group_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name={isDiscord ? "server_name" : "group_name"}
              placeholder={isDiscord ? "Enter Server Name" : "Enter Group Name"}
              value={isDiscord ? formData.server_name : formData.group_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="owner_name"
              placeholder="Enter Owner Name"
              value={formData.owner_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="mt-4 bg-[#133996] w-full rounded-md text-white px-3 py-2 disabled:opacity-50 hover:bg-[#0e2c73]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect"}
          </button>

          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
          {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Connection;
