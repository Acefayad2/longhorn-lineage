"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export type NavItem = {
  href: string;
  label: string;
};

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        className="icon-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-[73px] border-b border-neutral-200 bg-white px-4 py-3 shadow-sm sm:px-6">
          <nav className="mx-auto grid max-w-7xl gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
