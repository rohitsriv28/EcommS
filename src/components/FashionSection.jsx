import ProductCategorySection from "../components/ProductCategorySection";

const Fashion = ({ products }) => {
  console.log(Fashion);
  const filterFashion = (products) =>
    products.filter((product) => product.categoryId === 3);

  return (
    <ProductCategorySection
      title="Fashion"
      link="/product/category/3"
      filterFunction={filterFashion}
      products={products}
    />
  );
};

export default Fashion;
