import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../config/Axios";
import useAuthContext from "../../context/useAuthContext";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email cannot be empty.")
    .email("Please enter a valid email address."),
  password: z.string().nonempty("Password cannot be empty."),
});

const Login = () => {
  const navigate = useNavigate();
  const { setApiToken, updatedUser } = useAuthContext();
  const [backendError, setBackendError] = useState(""); // State to manage backend error
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { accessToken, user } = response.data;
        setApiToken(accessToken);
        updatedUser(user);
        localStorage.setItem("loggedIn", JSON.stringify(true));
        navigate(-1, { replace: true });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setBackendError("User not found.");
        } else if (error.response.status === 401) {
          setBackendError("Invalid Email or Password.");
        }
      } else {
        console.error("Error Logging In", error);
        setBackendError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center px-4 py-10 bg-white text-black">
      <div className="bg-white p-10 w-full flex flex-col lg:flex-row max-w-[100rem] lg:gap-12 mt-12 lg:mt-32 ">
        {/* Login Section */}
        <div className="lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold mb-10">SIGN IN</h2>
          <p className="font-medium mt-7 mb-4">LOGIN TO YOUR ACCOUNT</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Backend error message below the password field */}
            {backendError && (
              <p className="text-red-500 text-sm mt-1">{backendError}</p>
            )}
            <button
              type="submit"
              className="inline-block w-full border border-black text-black bg-white px-4 py-2 font-medium cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <p className="text-sm">Have You Forgotten Your Password?</p>
          </div>
        </div>
        <div className="lg:w-1/3 flex flex-col justify-center lg:ml-10">
          <p className="font-medium mb-4">NEED AN ACCOUNT?</p>
          <Link to="/auth/signup" className="w-full">
            <button className="inline-block w-full border border-black text-black bg-white px-4 py-2 font-medium cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
