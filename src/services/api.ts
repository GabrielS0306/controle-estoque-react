import type { MovementType } from "../types/movement";
import type { Product, ProductForm } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Não foi possível concluir a operação.");
  }
  return response.status === 204
    ? (undefined as T)
    : (response.json() as Promise<T>);
}

export const api = {
  getProducts: () => request<Product[]>("/products"),
  createProduct: (product: ProductForm) =>
    request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    }),
  updateProduct: (id: number, product: ProductForm) =>
    request<Product>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    }),
  deleteProduct: (id: number) =>
    request<void>(`/products/${id}`, { method: "DELETE" }),
  createMovement: (
    productId: number,
    data: { type: MovementType; quantity: number; note?: string },
  ) =>
    request(`/products/${productId}/movements`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
