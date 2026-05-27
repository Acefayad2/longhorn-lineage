import Link from "next/link";
import { BadgeCheck, Search } from "lucide-react";
import { signOut } from "@/lib/actions";
import { MobileNav, type NavItem } from "./mobile-nav";

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/longhorns", label: "Longhorns" },
  { href: "/lineage", label: "Lineage" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/events", label: "Events" },
  { href: "/admin", label: "Admin" },
];

export function AppShell({
  children,
  signedIn = false,
}: {
  children: React.ReactNode;
  signedIn?: boolean;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded bg-neutral-950 text-sm font-black text-white">
              LL
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight">
                Longhorn Lineage
              </span>
              <span className="hidden text-xs text-neutral-500 sm:block">
                Records, ranches, pedigree
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/longhorns" className="icon-button" aria-label="Search">
              <Search size={18} />
            </Link>
            {signedIn ? (
              <form action={signOut}>
                <button className="button-secondary" type="submit">
                  Sign out
                </button>
              </form>
            ) : (
              <Link href="/auth" className="button-primary">
                Sign in
              </Link>
            )}
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export function VerifiedMark({ verified }: { verified: boolean }) {
  if (!verified) {
    return <span className="status status-muted">Unverified</span>;
  }

  return (
    <span className="status status-dark">
      <BadgeCheck size={14} />
      Verified
    </span>
  );
}
