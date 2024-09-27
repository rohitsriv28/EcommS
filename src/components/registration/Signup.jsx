import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BASE_URL } from "../../api/base.api";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons

const schema = z.object({
  firstName: z
    .string()
    .min(1, "Name cannot be empty.")
    .regex(/^[a-zA-Z]+$/, "Only alphabets are allowed."),
  lastName: z
    .string()
    .min(1, "Name cannot be empty.")
    .regex(/^[a-zA-Z]+$/, "Only alphabets are allowed."),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters long.")
    .regex(
      /(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain letters and numbers."
    ),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  // State for show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // State for API errors (email error in this case)
  const [apiError, setApiError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("companyId", 1);

      const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setApiError(error.response.data.message);
      } else {
        console.error("Error signing up", error);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center px-4 py-10 bg-white text-black">
      <div className="bg-white p-10 w-full flex flex-col lg:flex-row max-w-[100rem] lg:gap-12 mt-10">
        {/* Sign Up Section */}
        <div className="lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold mb-10">SIGN UP</h2>
          <p className="font-medium mt-7 mb-4">CREATE A NEW ACCOUNT</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <input
                type="tel"
                placeholder="Phone"
                {...register("phone")}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
              {apiError && (
                <p className="text-red-500 text-sm mt-1">{apiError}</p>
              )}
            </div>
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="inline-block w-full border border-black text-black bg-white px-4 py-2 font-medium cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Signup
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 flex flex-col justify-center lg:ml-10">
          <p className="font-medium mb-4">ALREADY A MEMBER?</p>
          <Link to="/auth/login" className="w-full">
            <button className="inline-block w-full border border-black text-black bg-white px-4 py-2 font-medium cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
