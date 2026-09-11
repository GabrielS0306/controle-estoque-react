export type Product = {
  id: number;
  name: string;
  category: string;
  sku: string;
  stock: number;
  minimum: number;
  price: number;
};

export type ProductForm = Omit<Product, "id">;
