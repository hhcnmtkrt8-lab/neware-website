import { products as staticProducts, productRoutes, getProductsByRoute, getRouteById } from "@/data/neware";
import { getNotionProducts, getNotionProduct, notionProductToProduct } from "./notion-products";
import type { Product, ProductRoute } from "@/data/neware";

export type { Product, ProductRoute };

export async function getProducts(): Promise<Product[]> {
  const notionProducts = await getNotionProducts();
  if (notionProducts && notionProducts.length > 0) {
    console.log("[Data] Using Notion products:", notionProducts.length);
    return notionProducts.map(notionProductToProduct);
  }
  console.log("[Data] Using static products (fallback):", staticProducts.length);
  return staticProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  const notionProduct = await getNotionProduct(id);
  if (notionProduct) {
    return notionProductToProduct(notionProduct);
  }
  return staticProducts.find((p) => p.id === id) ?? null;
}

export async function getProductsByRouteId(routeId: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.routeId === routeId);
}

export { getProductsByRoute, getRouteById };

export { productRoutes };
