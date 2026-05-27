import Link from "next/link";
import { CalendarDays, CircleDollarSign, ShieldCheck } from "lucide-react";
import { AppShell, VerifiedMark } from "@/components/app-shell";
import {
  events,
  longhorns,
  marketplaceListings,
  ranches,
  verificationRequests,
} from "@/lib/sample-data";

export default function DashboardPage() {
  const verifiedCount = longhorns.filter(
    (longhorn) => longhorn.verification_status === "verified",
  ).length;

  return (
    <AppShell>
      <section className="section-tight">
        <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="label">Ranch operations</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Dashboard
            </h1>
          </div>
          <Link href="/longhorns/new" className="button-primary">
            Add longhorn
          </Link>
        </div>
      </section>

      <section className="section grid gap-4 md:grid-cols-4">
        {[
          ["Longhorn records", longhorns.length],
          ["Verified cattle", verifiedCount],
          ["Ranch profiles", ranches.length],
          ["Open listings", marketplaceListings.length],
        ].map(([label, value]) => (
          <article className="card p-5" key={label}>
            <p className="label">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="section grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card">
          <div className="border-b border-neutral-200 p-5">
            <h2 className="text-xl font-semibold">Ranch roster</h2>
          </div>
          <div className="divide-y divide-neutral-200">
            {ranches.map((ranch) => (
              <Link
                href={`/ranches/${ranch.slug}`}
                key={ranch.id}
                className="flex items-center justify-between gap-4 p-5 hover:bg-neutral-50"
              >
                <div>
                  <h3 className="font-semibold">{ranch.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {ranch.location} · {ranch.owner_name}
                  </p>
                </div>
                <VerifiedMark verified={ranch.verified} />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <article className="card p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-semibold">Pending verification</h2>
            </div>
            <div className="mt-5 space-y-4">
              {verificationRequests.map((request) => (
                <div key={request.id} className="border-t border-neutral-200 pt-4">
                  <p className="font-medium">{request.target_name}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {request.notes}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="card p-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} />
              <h2 className="text-xl font-semibold">Next event</h2>
            </div>
            <p className="mt-4 font-medium">{events[0].title}</p>
            <p className="mt-1 text-sm text-neutral-500">
              {events[0].date} · {events[0].location}
            </p>
          </article>

          <article className="card p-5">
            <div className="flex items-center gap-3">
              <CircleDollarSign size={20} />
              <h2 className="text-xl font-semibold">Marketplace pulse</h2>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              {marketplaceListings.length} listings are staged with status,
              seller, location, and cattle profile links.
            </p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
