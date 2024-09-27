import ProductCategorySection from "../components/ProductCategorySection";

const Mobiles = ({ products }) => {
  const filterMobiles = (products) =>
    products.filter((product) => product.categoryId === 1);

  return (
    <ProductCategorySection
      title="Mobiles"
      link="/product/category/1"
      filterFunction={filterMobiles}
      products={products}
    />
  );
};

export default Mobiles;
