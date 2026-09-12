import {
  LuArrowDownUp,
  LuCircleHelp,
  LuEllipsis,
  LuFileText,
  LuLayoutDashboard,
  LuMoon,
  LuSun,
} from "react-icons/lu";

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
          <span><LuLayoutDashboard aria-hidden="true" /></span> Visão geral
        </button>
        <button
          className={page === "movements" ? "active" : ""}
          onClick={() => onNavigate("movements")}
        >
          <span><LuArrowDownUp aria-hidden="true" /></span> Movimentações
        </button>
        <button disabled>
          <span><LuFileText aria-hidden="true" /></span> Relatórios{" "}
          <small>Em breve</small>
        </button>
      </nav>
      <div className="sidebar-footer">
        <div className="support">
          <span><LuCircleHelp aria-hidden="true" /></span>
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
          <span>
            {theme === "light" ? (
              <LuMoon aria-hidden="true" />
            ) : (
              <LuSun aria-hidden="true" />
            )}
          </span>
          <span>Modo {theme === "light" ? "escuro" : "claro"}</span>
          <i />
        </button>
        <div className="profile">
          <div className="avatar">GM</div>
          <div>
            <b>Gabriel Martins</b>
            <small>Administrador</small>
          </div>
          <button aria-label="Mais opções">
            <LuEllipsis aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
