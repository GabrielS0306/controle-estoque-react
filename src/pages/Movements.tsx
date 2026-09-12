import { useEffect, useMemo, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Movement, MovementType } from "../types/movement";
import type { Product } from "../types/product";
import { api } from "../services/api";
import { LuArrowDownToLine, LuArrowUpFromLine, LuList } from "react-icons/lu";

type Props = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};
const today = new Date().toLocaleDateString("pt-BR");

export function Movements({ products, setProducts }: Props) {
  const [movements, setMovements] = useState<Movement[]>(() =>
    JSON.parse(localStorage.getItem("estoque-pro-movimentos") || "[]"),
  );
  const [filter, setFilter] = useState<"Todos" | MovementType>("Todos");
  const [productId, setProductId] = useState(String(products[0]?.id ?? ""));
  const [type, setType] = useState<MovementType>("Entrada");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  useEffect(
    () =>
      localStorage.setItem("estoque-pro-movimentos", JSON.stringify(movements)),
    [movements],
  );
  const visible = useMemo(
    () =>
      filter === "Todos"
        ? movements
        : movements.filter((movement) => movement.type === filter),
    [movements, filter],
  );
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const product = products.find((item) => item.id === Number(productId));
    if (!product || quantity < 1) return;
    if (type === "Saída" && quantity > product.stock) {
      alert("A saída não pode ser maior que o estoque disponível.");
      return;
    }
    try {
      await api.createMovement(product.id, {
        type,
        quantity,
        note: note.trim() || undefined,
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao registrar movimentação.",
      );
      return;
    }
    const movement: Movement = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      type,
      quantity,
      date: today,
      note: note.trim() || "Movimentação manual",
    };
    setProducts((list) =>
      list.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock:
                type === "Entrada"
                  ? item.stock + quantity
                  : item.stock - quantity,
            }
          : item,
      ),
    );
    setMovements((list) => [movement, ...list]);
    setQuantity(1);
    setNote("");
  };
  const entries = movements
    .filter((movement) => movement.type === "Entrada")
    .reduce((total, movement) => total + movement.quantity, 0);
  const exits = movements
    .filter((movement) => movement.type === "Saída")
    .reduce((total, movement) => total + movement.quantity, 0);
  return (
    <>
      <section className="hero movements-hero">
        <div>
          <p className="eyebrow">Controle de estoque</p>
          <h1>Movimentações</h1>
          <p>
            Registre entradas e saídas para manter seu inventário atualizado.
          </p>
        </div>
      </section>
      <section className="movement-summary">
        <article>
          <span className="movement-icon entry"><LuArrowDownToLine aria-hidden="true" /></span>
          <div>
            <p>Entradas registradas</p>
            <strong>{entries} un.</strong>
          </div>
        </article>
        <article>
          <span className="movement-icon exit"><LuArrowUpFromLine aria-hidden="true" /></span>
          <div>
            <p>Saídas registradas</p>
            <strong>{exits} un.</strong>
          </div>
        </article>
        <article>
          <span className="movement-icon neutral"><LuList aria-hidden="true" /></span>
          <div>
            <p>Movimentações</p>
            <strong>{movements.length}</strong>
          </div>
        </article>
      </section>
      <section className="movement-grid">
        <form className="movement-form" onSubmit={submit}>
          <div className="section-head">
            <div>
              <h2>Nova movimentação</h2>
              <p>Atualize o estoque de um produto.</p>
            </div>
          </div>
          <label>
            Produto
            <select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} · {product.stock} un.
                </option>
              ))}
            </select>
          </label>
          <div className="movement-fields">
            <label>
              Tipo
              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as MovementType)
                }
              >
                <option>Entrada</option>
                <option>Saída</option>
              </select>
            </label>
            <label>
              Quantidade
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </label>
          </div>
          <label>
            Observação <span>(opcional)</span>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ex.: Compra com fornecedor"
            />
          </label>
          <button className="primary">Registrar {type.toLowerCase()}</button>
        </form>
        <section className="history">
          <div className="section-head">
            <div>
              <h2>Histórico recente</h2>
              <p>Acompanhe as últimas alterações.</p>
            </div>
          </div>
          <div className="movement-tabs">
            <button
              className={filter === "Todos" ? "selected" : ""}
              onClick={() => setFilter("Todos")}
            >
              Todos
            </button>
            <button
              className={filter === "Entrada" ? "selected" : ""}
              onClick={() => setFilter("Entrada")}
            >
              Entradas
            </button>
            <button
              className={filter === "Saída" ? "selected" : ""}
              onClick={() => setFilter("Saída")}
            >
              Saídas
            </button>
          </div>
          <div className="history-list">
            {visible.length ? (
              visible.map((movement) => (
                <article key={movement.id} className="history-item">
                  <span
                    className={`movement-icon ${movement.type === "Entrada" ? "entry" : "exit"}`}
                  >
                    {movement.type === "Entrada" ? (
                      <LuArrowDownToLine aria-hidden="true" />
                    ) : (
                      <LuArrowUpFromLine aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <b>{movement.productName}</b>
                    <p>
                      {movement.note} · {movement.date}
                    </p>
                  </div>
                  <strong
                    className={
                      movement.type === "Entrada" ? "entry-text" : "exit-text"
                    }
                  >
                    {movement.type === "Entrada" ? "+" : "-"}
                    {movement.quantity} un.
                  </strong>
                </article>
              ))
            ) : (
              <div className="history-empty">
                Nenhuma movimentação registrada ainda.
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
