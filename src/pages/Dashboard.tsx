import { useMemo, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { emptyProduct, formatCurrency } from "../data/products";
import { Metrics } from "../components/Metrics";
import { ProductModal } from "../components/ProductModal";
import { ProductsTable } from "../components/ProductsTable";
import type { Product, ProductForm } from "../types/product";

type Props = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

export function Dashboard({ products, setProducts }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [lowOnly, setLowOnly] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyProduct);
  const [editing, setEditing] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const lowStock = products.filter(
    (product) => product.stock <= product.minimum,
  );
  const units = products.reduce((total, product) => total + product.stock, 0);
  const totalValue = products.reduce(
    (total, product) => total + product.stock * product.price,
    0,
  );
  const categories = useMemo(
    () => ["Todas", ...new Set(products.map((product) => product.category))],
    [products],
  );
  const visible = products.filter(
    (product) =>
      `${product.name} ${product.sku}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "Todas" || product.category === category) &&
      (!lowOnly || product.stock <= product.minimum),
  );
  const change = (field: keyof ProductForm, value: string) =>
    setForm((current) => ({
      ...current,
      [field]: ["stock", "minimum", "price"].includes(field)
        ? Number(value)
        : value,
    }));
  const newProduct = () => {
    setEditing(null);
    setForm(emptyProduct);
    setModal(true);
  };
  const edit = (product: Product) => {
    setEditing(product.id);
    setForm(product);
    setModal(true);
  };
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (editing)
      setProducts((list) =>
        list.map((product) =>
          product.id === editing ? { ...form, id: editing } : product,
        ),
      );
    else setProducts((list) => [...list, { ...form, id: Date.now() }]);
    setModal(false);
  };
  const remove = (id: number) => {
    if (confirm("Deseja excluir este produto?"))
      setProducts((list) => list.filter((product) => product.id !== id));
  };
  return (
    <>
      <section className="hero" id="inicio">
        <div>
          <p className="eyebrow">Visão geral</p>
          <h1>
            Olá, Gabriel <span>👋</span>
          </h1>
          <p>Acompanhe seus produtos e mantenha seu estoque sempre em dia.</p>
        </div>
        <button className="primary" onClick={newProduct}>
          ＋ Novo produto
        </button>
      </section>
      <Metrics
        products={products.length}
        units={units}
        lowStock={lowStock.length}
        totalValue={formatCurrency(totalValue)}
      />
      <section className="products">
        <div className="section-head">
          <div>
            <h2>Produtos</h2>
            <p>Gerencie seu catálogo e acompanhe o estoque.</p>
          </div>
          <button className="secondary" onClick={() => setLowOnly(!lowOnly)}>
            {lowOnly ? "Mostrar todos" : "Ver estoque baixo"}
          </button>
        </div>
        <div className="filters">
          <label className="search">
            ⌕
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou código..."
            />
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <ProductsTable
          products={visible}
          total={products.length}
          onEdit={edit}
          onRemove={remove}
        />
      </section>
      {!!lowStock.length && (
        <aside className="alert">
          <i>!</i>
          <div>
            <b>Atenção ao estoque</b>
            <p>
              {lowStock.map((product) => product.name).join(" e ")}{" "}
              {lowStock.length > 1 ? "estão com" : "está com"} estoque abaixo do
              mínimo.
            </p>
          </div>
          <button onClick={() => setLowOnly(true)}>Ver produtos →</button>
        </aside>
      )}
      {modal && (
        <ProductModal
          form={form}
          editing={editing !== null}
          onChange={change}
          onClose={() => setModal(false)}
          onSubmit={save}
        />
      )}
    </>
  );
}
