"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  showInsights: boolean;
  /** False on inner pages, where the section links must lead back to the home page. */
  home?: boolean;
};

export function SiteHeader({ name, showInsights, home = true }: Props) {
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

  const base = home ? "" : "/";
  const links = [
    { href: `${base}#about`, label: "About" },
    { href: `${base}#experience`, label: "Experience" },
    { href: `${base}#projects`, label: "Projects" },
    { href: `${base}#technology`, label: "Technology" },
    ...(showInsights ? [{ href: `${base}#insights`, label: "Insights" }] : []),
  ];
  const close = () => setOpen(false);

  return (
    <header className="site-header" data-open={open} ref={headerRef}>
      <div className="container site-header__inner">
        {home ? (
          <div className="site-header__brand">{name}</div>
        ) : (
          <Link href="/" className="site-header__brand">
            {name}
          </Link>
        )}
        <nav className="site-nav" id="site-menu">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href={`${base}#contact`} className="site-header__cta" onClick={close}>
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
