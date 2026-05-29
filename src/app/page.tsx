import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  GitBranch,
  Search,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  events,
  getRanch,
  longhorns,
  marketplaceListings,
  ranches,
  verificationRequests,
} from "@/lib/sample-data";

const quickActions = [
  {
    href: "/longhorns/new",
    title: "Add cattle",
    text: "Create a profile with parents, owner, ranch, photos, and papers.",
    icon: ClipboardList,
  },
  {
    href: "/lineage?id=lh-4",
    title: "Open lineage wheel",
    text: "Spin through sire, dam, grandparents, and offspring at a glance.",
    icon: GitBranch,
  },
  {
    href: "/marketplace",
    title: "Check listings",
    text: "See available, pending, and sold marketplace records.",
    icon: CircleDollarSign,
  },
];

export default function Home() {
  const featured = longhorns[3];
  const featuredRanch = getRanch(featured.ranch_id);
  const verifiedCount = longhorns.filter(
    (longhorn) => longhorn.verification_status === "verified",
  ).length;

  return (
    <AppShell>
      <section className="bg-[#f3f8ef]">
        <div className="section grid min-h-[calc(100vh-73px)] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded border border-[#b9d8af] bg-[#fffdf6] px-3 py-2 text-sm font-semibold text-[#173322]">
              <BadgeCheck size={16} />
              Your ranch neighborhood, all in one place
            </div>
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Longhorn Lineage
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#496755]">
                One calm workspace for ranch profiles, cattle records,
                ownership, documents, sales, events, and family trees that are
                easy to explain at the chute, office, or auction table.
              </p>
            </div>
            <form
              action="/longhorns"
              className="panel grid max-w-2xl gap-3 p-3 sm:grid-cols-[1fr_auto]"
            >
              <div className="flex items-center gap-2 px-2">
                <Search size={18} className="text-[#5f7d69]" />
                <input
                  className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-[#7d967f]"
                  name="q"
                  placeholder="Search cattle, ranch, owner, sire, dam, registration"
                />
              </div>
              <button className="button-primary gap-2" type="submit">
                Search registry
                <ArrowRight size={16} />
              </button>
            </form>
            <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  href={action.href}
                  key={action.title}
                  className="panel p-4 transition hover:-translate-y-0.5 hover:border-[#087333] hover:bg-[#fffdf6]"
                >
                  <action.icon size={20} />
                  <h2 className="mt-4 font-semibold">{action.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#496755]">
                    {action.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
            <div className="panel overflow-hidden">
              <div className="relative aspect-[4/5] min-h-[520px] bg-[#e5f4dc]">
                <Image
                  src={featured.photos[0]}
                  alt={featured.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover saturate-[0.9]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#07351b]/88 p-5 text-white backdrop-blur">
                  <p className="label text-[#cde8c3]">Featured lineage</p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    {featured.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#dff4d7]">
                    {featured.registration_number} · {featuredRanch?.name}
                  </p>
                  <Link
                    href={`/lineage?id=${featured.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    View family wheel
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                ["Cattle records", String(longhorns.length)],
                ["Verified", `${verifiedCount}/${longhorns.length}`],
                ["Ranches", String(ranches.length)],
                ["Open reviews", String(verificationRequests.length)],
              ].map(([label, value]) => (
                <div className="panel p-5" key={label}>
                  <p className="label">{label}</p>
                  <p className="mt-2 text-3xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="soft-band">
        <div className="section grid gap-5 lg:grid-cols-3">
          <article className="panel p-5">
            <ShieldCheck size={22} />
            <h2 className="mt-5 text-xl font-semibold">Verification queue</h2>
            <p className="mt-2 text-sm leading-6 text-[#496755]">
              Review ranch and cattle submissions before marking them trusted.
            </p>
            <Link href="/admin" className="button-secondary mt-5">
              Open admin
            </Link>
          </article>
          <article className="panel p-5">
            <CalendarDays size={22} />
            <h2 className="mt-5 text-xl font-semibold">Next auction</h2>
            <p className="mt-2 font-medium">{events[0].title}</p>
            <p className="mt-1 text-sm text-[#496755]">
              {events[0].date} · {events[0].location}
            </p>
            <Link href="/events" className="button-secondary mt-5">
              View events
            </Link>
          </article>
          <article className="panel p-5">
            <CircleDollarSign size={22} />
            <h2 className="mt-5 text-xl font-semibold">Marketplace</h2>
            <p className="mt-2 text-sm leading-6 text-[#496755]">
              {marketplaceListings.length} sample listings are ready with
              linked cattle profiles and sale status.
            </p>
            <Link href="/marketplace" className="button-secondary mt-5">
              Browse listings
            </Link>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
