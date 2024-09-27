import { Link } from "react-router-dom";
import ProductCard from "../layouts/ProductCard";

const ProductCategorySection = ({ title, link, filterFunction, products }) => {
  const filteredProducts = filterFunction(products);
  console.log(title, link, filterFunction, products);

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center pt-24 lg:pt-16 px-4 sm:px-6 lg:px-8 2xl:mx-24">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Link
          to={link}
          className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-center text-ExtraDarkColor mb-2 sm:mb-0"
        >
          <h1 className="cursor-pointer">{title}</h1>
        </Link>
        <Link to={link}>
          <p className="font-semibold cursor-pointer text-lg sm:text-xl lg:text-2xl">
            See all
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id}>
              <ProductCard
                id={item.id}
                images={item.images}
                productName={item.productName || "N/A"}
                offerPrice={item.offerPrice}
                sellingPrice={item.sellingPrice}
                productDescription={item.productDescription}
                discountPercentage={item.discountPercentage}
                brand={item.brand}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-40">
            <p className="text-lg font-semibold text-gray-600">
              No products available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategorySection;
