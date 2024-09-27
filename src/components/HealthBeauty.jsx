import ProductCategorySection from "../components/ProductCategorySection";

const HealthBeauty = ({ products }) => {
  const filterHealthBeauty = (products) =>
    products.filter((product) => product.categoryId === 4);

  return (
    <ProductCategorySection
      title="Health & Beauty"
      link="/product/category/4"
      filterFunction={filterHealthBeauty}
      products={products}
    />
  );
};

export default HealthBeauty;
