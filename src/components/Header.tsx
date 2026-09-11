type Page = "dashboard" | "movements";
type Theme = "light" | "dark";

type HeaderProps = {
  page: Page;
  theme: Theme;
  onNavigate: (page: Page) => void;
  onToggleTheme: () => void;
};

export function Header({
  page,
  theme,
  onNavigate,
  onToggleTheme,
}: HeaderProps) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onNavigate("dashboard")}>
        <span className="brand-mark">E</span>
        <span>
          Estoque<span>Pro</span>
        </span>
      </button>
      <nav className="nav" aria-label="Navegação principal">
        <p>Menu principal</p>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => onNavigate("dashboard")}
        >
          <span>▦</span> Visão geral
        </button>
        <button
          className={page === "movements" ? "active" : ""}
          onClick={() => onNavigate("movements")}
        >
          <span>↕</span> Movimentações
        </button>
        <button disabled>
          <span>□</span> Relatórios <small>Em breve</small>
        </button>
      </nav>
      <div className="sidebar-footer">
        <div className="support">
          <span>?</span>
          <div>
            <b>Precisa de ajuda?</b>
            <small>Acesse a central de suporte</small>
          </div>
        </div>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`}
        >
          <span>{theme === "light" ? "☾" : "☀"}</span>
          <span>Modo {theme === "light" ? "escuro" : "claro"}</span>
          <i />
        </button>
        <div className="profile">
          <div className="avatar">GM</div>
          <div>
            <b>Gabriel Martins</b>
            <small>Administrador</small>
          </div>
          <button aria-label="Mais opções">•••</button>
        </div>
      </div>
    </aside>
  );
}
