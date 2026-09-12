type MetricProps = {
  icon: ReactNode;
  tone: string;
  label: string;
  number: string | number;
  caption: string;
};

function Metric({ icon, tone, label, number, caption }: MetricProps) {
  return (
    <article className="metric">
      <i className={tone}>{icon}</i>
      <div>
        <p>{label}</p>
        <strong>{number}</strong>
        <small className={tone === "orange" ? "attention" : ""}>
          {caption}
        </small>
      </div>
    </article>
  );
}

type MetricsProps = {
  products: number;
  units: number;
  lowStock: number;
  totalValue: string;
};
export function Metrics({
  products,
  units,
  lowStock,
  totalValue,
}: MetricsProps) {
  return (
    <section className="metrics">
      <Metric
        icon={<LuPackage aria-hidden="true" />}
        tone="blue"
        label="Produtos cadastrados"
        number={products}
        caption="+2 este mês"
      />
      <Metric
        icon={<LuBoxes aria-hidden="true" />}
        tone="purple"
        label="Unidades em estoque"
        number={units}
        caption="Em todos os produtos"
      />
      <Metric
        icon={<LuTriangleAlert aria-hidden="true" />}
        tone="orange"
        label="Estoque baixo"
        number={lowStock}
        caption={lowStock ? "Atenção necessária" : "Tudo em ordem"}
      />
      <Metric
        icon={<LuWalletCards aria-hidden="true" />}
        tone="green"
        label="Valor em estoque"
        number={totalValue}
        caption="Valor estimado"
      />
    </section>
  );
}
import type { ReactNode } from "react";
import {
  LuTriangleAlert,
  LuBoxes,
  LuPackage,
  LuWalletCards,
} from "react-icons/lu";
