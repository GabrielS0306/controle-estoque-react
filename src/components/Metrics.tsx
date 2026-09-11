type MetricProps = {
  icon: string;
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
        icon="▣"
        tone="blue"
        label="Produtos cadastrados"
        number={products}
        caption="+2 este mês"
      />
      <Metric
        icon="▥"
        tone="purple"
        label="Unidades em estoque"
        number={units}
        caption="Em todos os produtos"
      />
      <Metric
        icon="◒"
        tone="orange"
        label="Estoque baixo"
        number={lowStock}
        caption={lowStock ? "Atenção necessária" : "Tudo em ordem"}
      />
      <Metric
        icon="◇"
        tone="green"
        label="Valor em estoque"
        number={totalValue}
        caption="Valor estimado"
      />
    </section>
  );
}
