import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Database, Network } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { longhorns, ranches } from "@/lib/sample-data";

export default function Home() {
  const featured = longhorns[0];

  return (
    <AppShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="section grid min-h-[calc(100vh-73px)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded border border-neutral-200 px-3 py-2 text-sm font-medium">
              <BadgeCheck size={16} />
              Trusted records for Texas Longhorn herds
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
                Longhorn Lineage
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-neutral-600">
                A premium black-and-white registry workspace for ranches,
                breeders, auctions, and owners to track cattle profiles,
                verified documents, ownership, and 3-generation pedigrees.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="button-primary gap-2">
                Open dashboard
                <ArrowRight size={17} />
              </Link>
              <Link href="/longhorns" className="button-secondary">
                Browse directory
              </Link>
            </div>
            <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-neutral-200 pt-6">
              <div>
                <dt className="label">Cattle</dt>
                <dd className="mt-1 text-2xl font-semibold">
                  {longhorns.length}
                </dd>
              </div>
              <div>
                <dt className="label">Ranches</dt>
                <dd className="mt-1 text-2xl font-semibold">{ranches.length}</dd>
              </div>
              <div>
                <dt className="label">Pedigree</dt>
                <dd className="mt-1 text-2xl font-semibold">3 Gen</dd>
              </div>
            </dl>
          </div>

          <div className="relative min-h-[520px] overflow-hidden border border-neutral-200 bg-neutral-100">
            <Image
              src={featured.photos[0]}
              alt={featured.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-black/75 p-5 text-white backdrop-blur">
              <p className="label text-neutral-300">Featured profile</p>
              <h2 className="mt-2 text-2xl font-semibold">{featured.name}</h2>
              <p className="mt-1 text-sm text-neutral-300">
                {featured.registration_number} · {featured.horn_measurement}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Database,
            title: "Complete herd records",
            text: "Profile data, horn measurements, document lists, ownership status, and ranch assignment live together.",
          },
          {
            icon: Network,
            title: "Lineage-first workflow",
            text: "Sire, dam, offspring, and 3-generation pedigree views are modeled directly in the cattle records.",
          },
          {
            icon: BadgeCheck,
            title: "Verification ready",
            text: "Admins can review pending cattle and ranch verification requests before marking records trusted.",
          },
        ].map((item) => (
          <article key={item.title} className="card p-5">
            <item.icon size={22} />
            <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {item.text}
            </p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
