import React from "react";
import { GoPencil } from "react-icons/go";

const AddressCard = ({ user, onEdit }) => {
  return (
    <>
      <div className="w-full border-black border-2 rounded-md p-4 flex gap-6 items-center">
        <input
          type="radio"
          style={{ accentColor: "black" }}
          className="w-4 h-4"
          checked
          readOnly
        />

        <div className="w-full flex justify-between items-center">
          <div>
            <p className="text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </p>
            <p>{user?.phone}</p>
            <p>{user?.landmark}</p>
            <p>
              {user?.houseNoAreaStreet}, {user?.cityTown}, {user?.state},{" "}
              {user?.pinCode}
            </p>
          </div>
          <div className="flex items-center cursor-pointer gap-4 flex-row-reverse">
            <GoPencil
              size={24}
              onClick={onEdit}
              className="hover:text-blue-500 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
