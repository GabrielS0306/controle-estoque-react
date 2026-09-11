import type { FormEvent } from "react";
import type { ProductForm } from "../types/product";

type Props = {
  form: ProductForm;
  editing: boolean;
  onChange: (field: keyof ProductForm, value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
};
export function ProductModal({
  form,
  editing,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="backdrop" onMouseDown={onClose}>
      <form
        className="modal"
        onSubmit={onSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-title">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2>{editing ? "Editar produto" : "Novo produto"}</h2>
          </div>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form">
          <label className="full">
            Nome do produto
            <input
              required
              value={form.name}
              onChange={(event) => onChange("name", event.target.value)}
            />
          </label>
          <label>
            Categoria
            <select
              value={form.category}
              onChange={(event) => onChange("category", event.target.value)}
            >
              {[
                "Vestuário",
                "Calçados",
                "Acessórios",
                "Eletrônicos",
                "Outros",
              ].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Código / SKU
            <input
              required
              value={form.sku}
              onChange={(event) => onChange("sku", event.target.value)}
            />
          </label>
          <label>
            Estoque atual
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => onChange("stock", event.target.value)}
            />
          </label>
          <label>
            Estoque mínimo
            <input
              type="number"
              min="0"
              value={form.minimum}
              onChange={(event) => onChange("minimum", event.target.value)}
            />
          </label>
          <label className="full">
            Preço unitário
            <input
              type="number"
              min="0"
              step=".01"
              value={form.price}
              onChange={(event) => onChange("price", event.target.value)}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button className="secondary" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary">
            {editing ? "Salvar alterações" : "Cadastrar produto"}
          </button>
        </div>
      </form>
    </div>
  );
}
