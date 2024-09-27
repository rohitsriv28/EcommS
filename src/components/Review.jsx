import React from "react";
import ReviewCard from "../layouts/ReviewCard";

const reviews = [
  {
    id: 1,
    name: "Bruce Yadav",
    content:
      "Outstanding clothing with superior quality fabrics, impeccable craftsmanship, and trendy designs. Each piece exudes durability and style, ensuring a top-notch shopping experience. Highly recommended!",
  },
  {
    id: 2,
    name: "Steve Thapa",
    content:
      "I'm thoroughly impressed with the range and quality of clothes. The attention to detail in each garment is remarkable. Comfortable, stylish, and long-lasting - exactly what I look for in my wardrobe!",
  },
  {
    id: 3,
    name: "Thor OdinPutra",
    content:
      "The customer service is as impressive as the clothing itself. Quick delivery, easy returns, and always helpful support. It's refreshing to find a brand that values both product quality and customer satisfaction.",
  },
];

const Review = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center lg:px-32 px-5 overflow-hidden">
      <h1 className="font-semibold text-center text-ExtraDarkColor text-4xl lg:mt-14 mt-24">
        Feedback Corner
      </h1>
      <div className="flex flex-col items-center xl:flex-row gap-5 justify-center py-4 my-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            content={review.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
