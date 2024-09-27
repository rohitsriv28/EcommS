import { useEffect, useState } from "react";
import { getProductsByCategory } from "../api/prdoucts.api";
import ProductCard from "../layouts/ProductCard";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory(id);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] bg-transparent">
        <p className="text-xl font-semibold text-black animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-180px)] mx-auto px-4 sm:px-6 lg:px-8 max-w-[120rem] w-full">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 mt-8">
        {products.length > 0 && products[0].categoryName}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <ProductCard
                id={item.id}
                images={item.images}
                productName={item.productName || "N/A"}
                offerPrice={item.offerPrice}
                sellingPrice={item.sellingPrice}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 col-span-full">
            <p className="text-xl font-medium text-gray-600">
              No products available in this category.
            </p>
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default CategoryProducts;
