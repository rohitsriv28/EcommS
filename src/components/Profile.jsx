import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaPen } from "react-icons/fa";
import useAuthContext from "../context/useAuthContext";
import { ShowToast } from "./CustomToast";
import NotLoggedInPage from "./NotLoggedInPage";
import { patchUser } from "../api/user.api";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "../api/base.api";
import { motion, AnimatePresence } from "framer-motion";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name must not be empty"),
  lastName: z.string().min(1, "Last name must not be empty"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{9}$/, "Invalid phone number"),
});

const Profile = () => {
  const { user: usr, updatedUser } = useAuthContext();

  if (!usr) {
    return <NotLoggedInPage />;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [pro, setPro] = useState(false);
  const [user, setUser] = useState({
    firstName: usr.firstName ?? "",
    lastName: usr.lastName ?? "",
    email: usr.email ?? "",
    phone: usr.phone ?? "",
    image: usr?.image
      ? `${BASE_URL}/${usr.image}`
      : "https://via.placeholder.com/150",
  });
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (tempImage) {
      formData.append("image", tempImage);
    }

    try {
      setPro(true);
      const resp = await patchUser(formData, true);

      if (resp.status >= 200 || resp.status < 300) {
        setUser({
          ...user,
          ...data,
          image: tempImage ? URL.createObjectURL(tempImage) : user.image,
        });
        setIsEditing(false);
        setTempImage(null);

        updatedUser({ ...usr, ...data });

        ShowToast("success", "Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      ShowToast("error", "Failed to update profile");
    } finally {
      setPro(false);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setTempImage(null);
    reset(user);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setTempImage(e.target.files[0]);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.div
        className="min-h-[calc(80vh)] flex items-center justify-center bg-white text-black p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-gray-50 p-8 rounded-3xl shadow-2xl max-w-2xl w-full"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <motion.img
                src={tempImage ? URL.createObjectURL(tempImage) : user.image}
                alt="Profile"
                className="w-40 h-40 rounded-full mb-6 border-4 border-black object-cover shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              {isEditing && (
                <motion.button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-black text-white p-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCamera className="text-xl" />
                </motion.button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <motion.h1
              className="text-4xl font-bold text-black mt-4 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {`${user.firstName} ${user.lastName}`}
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {user.email}
            </motion.p>
          </motion.div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <FaUser className="text-black w-6 h-6" />
                {isEditing ? (
                  <div className="w-full flex space-x-4">
                    <div className="w-1/2">
                      <input
                        {...register("firstName")}
                        placeholder="First Name"
                        className="w-full border-b-2 border-gray-300 focus:border-black outline-none bg-transparent text-lg py-2"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <input
                        {...register("lastName")}
                        placeholder="Last Name"
                        className="w-full border-b-2 border-gray-300 focus:border-black outline-none bg-transparent text-lg py-2"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="w-full text-black text-lg font-medium">{`${user.firstName} ${user.lastName}`}</p>
                )}
              </motion.div>
              <motion.div
                className="flex items-center space-x-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <FaEnvelope className="text-black w-6 h-6" />
                {isEditing ? (
                  <div className="w-full">
                    <input
                      {...register("email")}
                      className="w-full border-b-2 border-gray-300 focus:border-black outline-none bg-transparent text-lg py-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="w-full text-black text-lg">{user.email}</p>
                )}
              </motion.div>
              <motion.div
                className="flex items-center space-x-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <FaPhone className="text-black w-6 h-6 rotate-90" />
                {isEditing ? (
                  <div className="w-full">
                    <input
                      {...register("phone")}
                      className="w-full border-b-2 border-gray-300 focus:border-black outline-none bg-transparent text-lg py-2"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="w-full text-black text-lg">{user.phone}</p>
                )}
              </motion.div>
            </div>
            <AnimatePresence>
              {isEditing ? (
                <motion.div
                  className="mt-8 flex justify-end space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 text-black px-6 py-3 rounded-full text-lg font-medium"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    disabled={pro}
                  >
                    {pro ? "Saving..." : "Save Changes"}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  className="mt-8 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium flex items-center space-x-2"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPen />
                    <span>Edit Profile</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default Profile;
