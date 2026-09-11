type Page = "dashboard" | "movements";

type HeaderProps = { page: Page; onNavigate: (page: Page) => void };

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNavigate("dashboard")}>
        <span className="brand-mark">E</span>Estoque<span>Pro</span>
      </button>
      <nav className="nav" aria-label="Navegação principal">
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => onNavigate("dashboard")}
        >
          Visão geral
        </button>
        <button
          className={page === "movements" ? "active" : ""}
          onClick={() => onNavigate("movements")}
        >
          Movimentações
        </button>
      </nav>
      <div className="header-actions">
        <button className="bell" aria-label="Notificações">
          ♧<i />
        </button>
        <div className="avatar">GM</div>
      </div>
    </header>
  );
}
