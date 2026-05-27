import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { AppShell, VerifiedMark } from "@/components/app-shell";
import { LonghornCard } from "@/components/longhorn-card";
import { getRanch, getRanchLonghorns } from "@/lib/sample-data";

export default async function RanchProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ranch = getRanch(id);
  if (!ranch) {
    notFound();
  }

  const herd = getRanchLonghorns(ranch.id);

  return (
    <AppShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="section">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <p className="label">Ranch profile</p>
                <VerifiedMark verified={ranch.verified} />
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                {ranch.name}
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
                {ranch.description}
              </p>
            </div>
            <Link href="/admin" className="button-secondary">
              Request verification
            </Link>
          </div>
        </div>
      </section>

      <section className="section grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="card h-fit p-5">
          <h2 className="text-xl font-semibold">Ranch details</h2>
          <div className="mt-5 space-y-4 text-sm">
            <p className="flex items-center gap-3">
              <MapPin size={18} />
              {ranch.location}
            </p>
            <p className="flex items-center gap-3">
              <Phone size={18} />
              {ranch.phone}
            </p>
            <p>
              <span className="label block">Owner</span>
              <span className="mt-1 block font-medium">{ranch.owner_name}</span>
            </p>
            <p>
              <span className="label block">Website</span>
              <a className="mt-1 block font-medium underline" href={ranch.website}>
                {ranch.website.replace("https://", "")}
              </a>
            </p>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="label">Current herd</p>
              <h2 className="mt-1 text-2xl font-semibold">
                {herd.length} longhorns
              </h2>
            </div>
            <Link href="/longhorns" className="button-secondary">
              Directory
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {herd.map((longhorn) => (
              <LonghornCard
                longhorn={longhorn}
                ranch={ranch}
                key={longhorn.id}
              />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
