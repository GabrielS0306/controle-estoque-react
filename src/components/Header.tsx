export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#inicio">
        <span className="brand-mark">E</span>Estoque<span>Pro</span>
      </a>
      <div className="header-actions">
        <button className="bell" aria-label="Notificações">
          ♧<i />
        </button>
        <div className="avatar">GM</div>
      </div>
    </header>
  );
}
