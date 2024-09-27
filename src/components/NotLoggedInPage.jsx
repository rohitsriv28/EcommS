import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotLoggedInPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-[calc(85dvh)] bg-white text-black flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <FaLock className="text-6xl text-gray-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
        <p className="text-gray-600 mb-6">
          You are not logged in. Please log in to access this content.
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotLoggedInPage;
