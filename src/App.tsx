import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { initialProducts } from "./data/products";
import { api } from "./services/api";
import { Dashboard } from "./pages/Dashboard";
import { Movements } from "./pages/Movements";
import { LuBell } from "react-icons/lu";
import type { Product } from "./types/product";
import "./App.css";

type Page = "dashboard" | "movements";
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("estoque-pro-tema") as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [products, setProducts] = useState<Product[]>(
    () =>
      JSON.parse(localStorage.getItem("estoque-pro") || "null") ||
      initialProducts,
  );
  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch(() => undefined);
  }, []);
  useEffect(
    () => localStorage.setItem("estoque-pro", JSON.stringify(products)),
    [products],
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("estoque-pro-tema", theme);
  }, [theme]);
  return (
    <div className="application">
      <Header
        page={page}
        theme={theme}
        onNavigate={setPage}
        onToggleTheme={() =>
          setTheme((current) => (current === "light" ? "dark" : "light"))
        }
      />
      <main className="app-shell">
        <div className="content-top">
          <div>
            <span>11 de setembro de 2026</span>
          </div>
          <button className="notification" aria-label="Notificações">
            <LuBell aria-hidden="true" />
            <i />
          </button>
        </div>
        {page === "dashboard" ? (
          <Dashboard products={products} setProducts={setProducts} />
        ) : (
          <Movements products={products} setProducts={setProducts} />
        )}
      </main>
    </div>
  );
}
