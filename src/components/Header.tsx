import "./header.css";

export function Header({ children }) {
  return (
    <header className="header-bar">
      <div className="header-content">
        <h1 className="header-title">Computer Parts Store</h1>
        {children}
      </div>
    </header>
  );
}
