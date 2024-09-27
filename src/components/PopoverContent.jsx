import React from "react";
import { useNavigate } from "react-router-dom";

const PopoverContent = () => {
  const navigate = useNavigate();

  return (
    <div className="px-3 py-2">
      <p className="font-semibold mb-2">Not logged in</p>
      <p className="text-sm">Please log in to continue</p>
      <button
        className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors w-full"
        onClick={() => navigate("/auth/login")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default PopoverContent;
