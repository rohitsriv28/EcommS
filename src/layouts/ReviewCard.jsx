import React from "react";
import { ImQuotesLeft } from "react-icons/im";

const ReviewCard = ({ name, content }) => {
  return (
    <div className="flex flex-col lg:w-2/6 border-2 border-DarkColor p-3 rounded-lg gap-5 cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out min-h-56 w-fit">
      <div>
        <ImQuotesLeft size={25} />
        <h1 className="text-xl font-semibold text-ExtraDarkColor pt-4">
          {name}
        </h1>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default ReviewCard;
