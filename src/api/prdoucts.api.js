import get, { patchApi, post, putApi } from "./base.api";

async function getProducts(page = 1, limit = 100) {
  try {
    const response = await get(
      `/product/getAll/page?page=${page}&limit=${limit}`
    );
    // console.log("Response:", response)
    const pData = response.data.map((p) => ({
      id: p.id,
      images: p.images ? p.images.split(",") : null,
      productName: p.productName,
      sellingPrice: p.sellingPrice,
      discountPercentage: p.discountPercentage,
      offerPrice: p.offerPrice,
      categoryId: p.categoryId,
      categoryName: p.category.categoryName,
      brand: p.brand.brandName,
    }));
    // console.log("pData:", pData)
    if (pData) return pData;
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Error fetching products!");
    return [];
  }
}

async function fetchInventory() {
  try {
    const inventory = await get(`/inventory/getAll`);
    // console.log("Inventory:", inventory);
    return inventory;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    alert("Error fetching inventory!");
    return {};
  }
}

async function getSingleProduct(id) {
  try {
    const prod = await get(`/product/getById/${id}`);
    return {
      id: prod.id,
      images: prod.images ? prod.images.split(",") : null,
      productName: prod.productName,
      offerPrice: prod.offerPrice,
      sellingPrice: prod.sellingPrice,
      description: prod.productDescription,
    };
  } catch (error) {
    console.error("Error fetching single product:", error);
    alert("Error fetching product");
    return [];
  }
}

async function getProductsByCategory(categoryId) {
  try {
    const response = await get(`/product/getByCategory/${categoryId}`);
    let data = response.map((p) => ({
      id: p.id,
      images: p.images ? p.images.split(",") : null,
      productName: p.productName,
      sellingPrice: p.sellingPrice,
      offerPrice: p.offerPrice,
      categoryId: p.categoryId,
      categoryName: p.category.categoryName,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export { getProducts, getSingleProduct, fetchInventory, getProductsByCategory };
