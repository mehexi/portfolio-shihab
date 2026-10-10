"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  showInsights: boolean;
};

export function SiteHeader({ name, showInsights }: Props) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // While the mobile menu is open, Escape or a tap outside the header closes it.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#technology", label: "Technology" },
    ...(showInsights ? [{ href: "#insights", label: "Insights" }] : []),
  ];
  const close = () => setOpen(false);

  return (
    <header className="site-header" data-open={open} ref={headerRef}>
      <div className="container site-header__inner">
        <div className="site-header__brand">{name}</div>
        <nav className="site-nav" id="site-menu">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="site-header__cta" onClick={close}>
            Contact
          </a>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
