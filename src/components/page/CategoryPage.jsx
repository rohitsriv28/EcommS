import React from "react";
import { useParams } from "react-router-dom";
import CategoryProducts from "../CategoryProducts";

const CategoryPage = () => {
  const { categoryId, categoryName } = useParams();

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)] bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {categoryName}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Explore our selection of {categoryName.toLowerCase()} products
          </p>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <CategoryProducts
            categoryId={categoryId}
            categoryName={categoryName}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
