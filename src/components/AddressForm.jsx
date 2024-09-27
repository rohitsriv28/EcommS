import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nepaliLocations } from "./nepaliLocation";
import { patchUser } from "../api/user.api";
import AddressCard from "./AddressCard";
import useAuthContext from "../context/useAuthContext";
import { axiosInstance } from "../config/Axios";

const addressSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty.")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain alphabets."),
  phone: z
    .string()
    .min(1, "Phone number cannot be empty.")
    .regex(/^\d{10}$/, "Phone number must be 10 digits."),
  email: z
    .string()
    .min(1, "Email cannot be empty.")
    .email("Please enter a valid email address."),
  houseNo: z
    .string()
    .min(1, "House No./ Area cannot be empty.")
    .regex(
      /^[a-zA-Z0-9/\- ]+$/,
      "House No./ Area can include alphabets, numbers, '/', and '-'."
    ),
  landmark: z
    .string()
    .min(1, "Landmark cannot be empty.")
    .regex(
      /^[a-zA-Z0-9\- ]+$/,
      "Landmark can include alphabets, numbers, and '-'."
    ),
  cityTown: z.string().min(1, "City cannot be empty."),
  state: z.string().min(1, "State cannot be empty."),
  pinCode: z
    .string()
    .min(1, "Pin Code cannot be empty.")
    .regex(/^\d+$/, "Pin Code should only contain numbers."),
});

const Address = ({
  formData,
  handleChange,
  activeSection,
  toggleSection,
  user,
  setFormData,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cities, setCities] = useState([]);
  const { setApiToken, updatedUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: formData,
  });

  const selectedState = watch("state");

  useEffect(() => {
    if (selectedState) {
      setCities(nepaliLocations[selectedState] || []);
      setValue("cityTown", "");
    } else {
      setCities([]);
    }
  }, [selectedState, setValue]);

  const fetchAccessToken = async () => {
    try {
      const response = await axiosInstance.get("/auth/refresh/");
      const newAccessToken = response.data.accessToken;
      if (newAccessToken) {
        setApiToken(newAccessToken);
        updatedUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching access token after saving address", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await patchUser(
        {
          houseNoAreaStreet: data.houseNo,
          landmark: data.landmark,
          state: data.state,
          cityTown: data.cityTown,
          pinCode: Number(data.pinCode),
        },
        false
      );
      setFormData(data);
      setIsEditMode(false);

      // Call the auth/refresh API after successful address update
      await fetchAccessToken();
    } catch (error) {
      console.error("error:", error.message);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (!user) {
      console.error("User object is undefined or null");
      return;
    }

    const newData = {
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      phone: user.phone || "",
      email: user.email || "",
      houseNo: user.houseNoAreaStreet || "",
      landmark: user.landmark || "",
      state: user.state || "",
      cityTown: user.cityTown || "",
      pinCode: user.pinCode ? String(user.pinCode) : "",
    };

    setFormData(newData);
    reset(newData);
    setIsEditMode(true);
  };

  return (
    <>
      <div
        className="bg-ExtraDarkColor text-white p-4 rounded-md cursor-pointer flex justify-between items-center"
        onClick={() => toggleSection("address")}
      >
        Address Information
        {activeSection ? <FaCaretUp /> : <FaCaretDown />}
      </div>
      {activeSection && (
        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {!user.state || isEditMode ? (
            <>
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  {...register("name")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  readOnly
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex space-x-4 mb-6">
                <div className="w-1/2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    readOnly
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    readOnly
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="houseNo"
                    placeholder="House No./ Area/ Street"
                    {...register("houseNo")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {errors.houseNo && (
                    <p className="text-red-500 text-sm">
                      {errors.houseNo.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    {...register("landmark")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {errors.landmark && (
                    <p className="text-red-500 text-sm">
                      {errors.landmark.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <div className="w-1/3">
                  <select
                    name="state"
                    {...register("state")}
                    onChange={(e) => {
                      handleChange(e);
                      register("state").onChange(e);
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Select State</option>
                    {Object.keys(nepaliLocations).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="w-1/3">
                  <select
                    name="cityTown"
                    {...register("cityTown")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={!selectedState}
                  >
                    <option value="">
                      {selectedState ? "Select City" : "Select the state first"}
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.cityTown && (
                    <p className="text-red-500 text-sm">
                      {errors.cityTown.message}
                    </p>
                  )}
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="Pin Code"
                    {...register("pinCode")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {errors.pinCode && (
                    <p className="text-red-500 text-sm">
                      {errors.pinCode.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-white text-black border-2 border-black px-4 py-2 rounded hover:bg-gray-900 hover:text-white transition-colors disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
              >
                Save
              </button>
            </>
          ) : (
            <AddressCard
              user={user}
              onEdit={handleEdit}
              isEditMode={isEditMode}
            />
          )}
        </form>
      )}
    </>
  );
};

export default Address;
