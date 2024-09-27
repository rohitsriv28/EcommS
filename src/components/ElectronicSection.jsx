import ProductCategorySection from "../components/ProductCategorySection";

const Electronics = ({ products }) => {
  const filterElectronics = (products) =>
    products.filter((product) => product.categoryId === 2);

  return (
    <ProductCategorySection
      title="Electronics"
      link="/product/category/2"
      filterFunction={filterElectronics}
      products={products}
    />
  );
};

export default Electronics;
