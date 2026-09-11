import type { Product, ProductForm } from "../types/product";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Camiseta Essential",
    category: "Vestuário",
    sku: "CAM-001",
    stock: 42,
    minimum: 12,
    price: 79.9,
  },
  {
    id: 2,
    name: "Tênis Urban",
    category: "Calçados",
    sku: "TEN-024",
    stock: 8,
    minimum: 10,
    price: 249.9,
  },
  {
    id: 3,
    name: "Mochila Daily",
    category: "Acessórios",
    sku: "MOC-015",
    stock: 18,
    minimum: 8,
    price: 159.9,
  },
  {
    id: 4,
    name: "Jaqueta Puffer",
    category: "Vestuário",
    sku: "JAQ-008",
    stock: 3,
    minimum: 6,
    price: 329.9,
  },
  {
    id: 5,
    name: "Boné Classic",
    category: "Acessórios",
    sku: "BON-017",
    stock: 27,
    minimum: 10,
    price: 69.9,
  },
];

export const emptyProduct: ProductForm = {
  name: "",
  category: "Vestuário",
  sku: "",
  stock: 0,
  minimum: 5,
  price: 0,
};
export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
