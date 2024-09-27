import ProductCategorySection from "../components/ProductCategorySection";

const HomeKitechen = ({ products }) => {
  const filterHomeKitechen = (products) =>
    products.filter((product) => product.categoryId === 5);

  return (
    <ProductCategorySection
      title="Home & Kitechen"
      link="/product/category/5"
      filterFunction={filterHomeKitechen}
      products={products}
    />
  );
};

export default HomeKitechen;
