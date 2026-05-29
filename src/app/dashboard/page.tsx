import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { AppShell, VerifiedMark } from "@/components/app-shell";
import {
  events,
  getLonghorn,
  longhorns,
  marketplaceListings,
  ranches,
  verificationRequests,
} from "@/lib/sample-data";

const workflow = [
  {
    title: "Confirm Rio Pearl transfer",
    text: "Owner transfer receipt is uploaded and waiting on registry review.",
    href: "/admin",
    icon: ShieldCheck,
  },
  {
    title: "Attach calf papers",
    text: "Llano Silverline has an application but needs the final certificate.",
    href: "/longhorns/lh-4",
    icon: FileText,
  },
  {
    title: "Review sale prospect",
    text: "Marketplace listing is available and tied to the lineage wheel.",
    href: "/marketplace",
    icon: CircleDollarSign,
  },
];

export default function DashboardPage() {
  const verifiedCount = longhorns.filter(
    (longhorn) => longhorn.verification_status === "verified",
  ).length;
  const openListings = marketplaceListings.filter(
    (listing) => listing.status !== "sold",
  );
  const newest = [...longhorns].slice(0, 4);

  return (
    <AppShell>
      <section className="soft-band">
        <div className="section grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="label">Ranch command center</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Everything that needs attention, in one place.
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-[#496755]">
              Start with the work queue, jump into a record, or open the
              lineage wheel when pedigree is the question.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/longhorns/new" className="button-primary">
              Add longhorn
            </Link>
            <Link href="/lineage?id=lh-4" className="button-secondary">
              Open lineage wheel
            </Link>
          </div>
        </div>
      </section>

      <section className="section grid gap-4 md:grid-cols-4">
        {[
          ["Longhorn records", longhorns.length],
          ["Verified cattle", verifiedCount],
          ["Ranch profiles", ranches.length],
          ["Active listings", openListings.length],
        ].map(([label, value]) => (
          <article className="panel p-5" key={label}>
            <p className="label">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="section grid gap-6 pt-0 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <article className="panel p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck size={20} />
              <h2 className="text-xl font-semibold">Today&apos;s work queue</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {workflow.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="grid gap-3 rounded border border-[#cfe4c7] bg-[#fffdf6] p-4 transition hover:border-[#087333] hover:bg-white sm:grid-cols-[auto_1fr_auto]"
                >
                  <item.icon size={20} />
                  <span>
                    <span className="block font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#496755]">
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </article>

          <article className="panel p-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} />
              <h2 className="text-xl font-semibold">Calendar and auctions</h2>
            </div>
            <div className="mt-4 space-y-3">
              {events.slice(0, 2).map((event) => (
                <div
                  className="border-t border-[#cfe4c7] pt-3 text-sm"
                  key={event.id}
                >
                  <p className="font-semibold">{event.title}</p>
                  <p className="mt-1 text-[#5f7d69]">
                    {event.date} · {event.location}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="grid gap-6">
          <article className="panel overflow-hidden">
            <div className="border-b border-[#cfe4c7] p-5">
              <h2 className="text-xl font-semibold">Ranch roster</h2>
            </div>
            <div className="divide-y divide-[#cfe4c7]">
              {ranches.map((ranch) => (
                <Link
                  href={`/ranches/${ranch.slug}`}
                  key={ranch.id}
                  className="flex items-center justify-between gap-4 p-5 hover:bg-[#fffdf6]"
                >
                  <div>
                    <h3 className="font-semibold">{ranch.name}</h3>
                    <p className="mt-1 text-sm text-[#5f7d69]">
                      {ranch.location} · {ranch.owner_name}
                    </p>
                  </div>
                  <VerifiedMark verified={ranch.verified} />
                </Link>
              ))}
            </div>
          </article>

          <article className="panel p-5">
            <div className="flex items-center gap-3">
              <GitBranch size={20} />
              <h2 className="text-xl font-semibold">Recently viewed herd</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {newest.map((longhorn) => {
                const sire = longhorn.sire_id
                  ? getLonghorn(longhorn.sire_id)
                  : undefined;
                const dam = longhorn.dam_id
                  ? getLonghorn(longhorn.dam_id)
                  : undefined;
                return (
                  <Link
                    href={`/longhorns/${longhorn.id}`}
                    className="rounded border border-[#cfe4c7] bg-[#fffdf6] p-4 hover:border-[#087333]"
                    key={longhorn.id}
                  >
                    <p className="font-semibold">{longhorn.name}</p>
                    <p className="mt-1 text-xs text-[#5f7d69]">
                      {longhorn.registration_number}
                    </p>
                    <p className="mt-3 text-sm text-[#496755]">
                      {sire?.name ?? "Unknown sire"} /{" "}
                      {dam?.name ?? "Unknown dam"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </article>

          <article className="panel p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-semibold">Verification requests</h2>
            </div>
            <div className="mt-4 space-y-3">
              {verificationRequests.map((request) => (
                <div key={request.id} className="border-t border-[#cfe4c7] pt-3">
                  <p className="font-medium">{request.target_name}</p>
                  <p className="mt-1 text-sm text-[#5f7d69]">
                    {request.notes}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
