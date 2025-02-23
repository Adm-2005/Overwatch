import { useEffect, useState } from "react";
import { FaBell, FaFlag } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const DiscordServers = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch(`${API_URL}/discord/servers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) setServers(data.servers);
      } catch (error) {
        console.error("Error fetching Discord servers:", error);
      }
    };

    fetchServers();
  }, []);

  return (
    <section className="w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-[#133996] mb-4">Discord Servers</h2>
      {servers.length === 0 ? (
        <p className="text-gray-600">No servers connected.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servers.map((server) => (
            <div key={server.server_id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold">{server.server_name}</h3>
              <p className="text-gray-500 text-sm">ID: {server.server_id}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center bg-[#133996] text-white px-3 py-2 rounded-md hover:bg-[#0e2c73]">
                  <FaBell className="mr-2" /> View Alerts
                </button>
                <button className="flex items-center bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700">
                  <FaFlag className="mr-2" /> View Flagged Messages
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DiscordServers;
