import React, { useState } from "react";
import "./header.css";

// re-render only ever happens when...
// 1. props change
// 2. setState was called

export function Header({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header-bar">
      <div className="header-content">
        <div className="header-title">Computer Parts Store</div>
        <div className="nav-opener">
          <FancyMenuButton
            onClick={() => {
              const nextOpen = !open;
              // open it! or close if it's open already
              setOpen(nextOpen);
            }}
            open={open}
          />
          {open ? children : null}
        </div>
      </div>
    </header>
  );
}

function FancyMenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <div className={`nav-opener ${open ? "active" : ""}`} onClick={onClick}>
      <span></span>
    </div>
  );
}
