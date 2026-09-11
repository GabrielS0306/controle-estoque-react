import type { Product } from "../types/product";
import { formatCurrency } from "../data/products";

type Props = {
  products: Product[];
  total: number;
  onEdit: (product: Product) => void;
  onRemove: (id: number) => void;
};
export function ProductsTable({ products, total, onEdit, onRemove }: Props) {
  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Código</th>
              <th>Estoque</th>
              <th>Preço</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isLow = product.stock <= product.minimum;
              return (
                <tr key={product.id}>
                  <td>
                    <div className="product-name">
                      <span className={`image image-${product.id % 5}`}>
                        {product.name[0]}
                      </span>
                      <b>{product.name}</b>
                    </div>
                  </td>
                  <td>
                    <span className="tag">{product.category}</span>
                  </td>
                  <td className="sku">{product.sku}</td>
                  <td>
                    <b className={isLow ? "low" : "stock"}>
                      {product.stock} un.
                    </b>
                    {isLow && <span className="low-label">Baixo</span>}
                  </td>
                  <td className="price">{formatCurrency(product.price)}</td>
                  <td className="actions">
                    <button
                      onClick={() => onEdit(product)}
                      aria-label={`Editar ${product.name}`}
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => onRemove(product.id)}
                      aria-label={`Excluir ${product.name}`}
                    >
                      ⌫
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!products.length && (
          <p className="empty">Nenhum produto encontrado.</p>
        )}
      </div>
      <footer>
        Exibindo <b>{products.length}</b> de <b>{total}</b> produtos{" "}
        <span>
          ‹ &nbsp; <b>1</b> &nbsp; ›
        </span>
      </footer>
    </>
  );
}
