import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const ActionButton = ({ onClick, text, disabled, loading }) => (
  <button
    className={`flex-1 px-4 py-3 ${
      disabled ? "bg-gray-400" : "bg-black"
    } text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105`}
    onClick={onClick}
    disabled={disabled}
  >
    {loading ? <LoadingSpinner /> : text}
  </button>
);

export default ActionButton;
