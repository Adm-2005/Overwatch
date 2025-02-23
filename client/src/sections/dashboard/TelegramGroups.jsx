import { useEffect, useState } from "react";
import { FaBell, FaFlag } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const TelegramGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${API_URL}/telegram/groups`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) setGroups(data.groups);
      } catch (error) {
        console.error("Error fetching Telegram groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <section className="w-full max-w-4xl mt-6">
      <h2 className="text-2xl font-semibold text-[#133996] mb-4">Telegram Groups</h2>
      {groups.length === 0 ? (
        <p className="text-gray-600">No groups connected.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group.group_id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold">{group.group_name}</h3>
              <p className="text-gray-500 text-sm">ID: {group.group_id}</p>
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

export default TelegramGroups;
