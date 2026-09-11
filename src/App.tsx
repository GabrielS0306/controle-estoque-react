import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { initialProducts } from "./data/products";
import { Dashboard } from "./pages/Dashboard";
import { Movements } from "./pages/Movements";
import type { Product } from "./types/product";
import "./App.css";

type Page = "dashboard" | "movements";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [products, setProducts] = useState<Product[]>(
    () =>
      JSON.parse(localStorage.getItem("estoque-pro") || "null") ||
      initialProducts,
  );
  useEffect(
    () => localStorage.setItem("estoque-pro", JSON.stringify(products)),
    [products],
  );

  return (
    <main className="app-shell">
      <Header page={page} onNavigate={setPage} />
      {page === "dashboard" ? (
        <Dashboard products={products} setProducts={setProducts} />
      ) : (
        <Movements products={products} setProducts={setProducts} />
      )}
    </main>
  );
}
