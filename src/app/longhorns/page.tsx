import Link from "next/link";
import { Filter, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { LonghornCard } from "@/components/longhorn-card";
import { getRanch, searchLonghorns } from "@/lib/sample-data";

export default async function LonghornDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sex?: string; status?: string }>;
}) {
  const params = await searchParams;
  let results = searchLonghorns(params.q ?? "");

  if (params.sex) {
    results = results.filter((longhorn) => longhorn.sex === params.sex);
  }

  if (params.status) {
    results = results.filter(
      (longhorn) => longhorn.verification_status === params.status,
    );
  }

  return (
    <AppShell>
      <section className="section-tight">
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label">Searchable registry</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Longhorn directory
            </h1>
          </div>
          <Link href="/longhorns/new" className="button-primary gap-2">
            <Plus size={17} />
            Add longhorn
          </Link>
        </div>
      </section>

      <section className="section-tight">
        <form className="card grid gap-3 p-4 lg:grid-cols-[1fr_180px_180px_auto]">
          <input
            className="field"
            name="q"
            placeholder="Search name, ranch, registration, sire, dam, owner"
            defaultValue={params.q}
          />
          <select className="field" name="sex" defaultValue={params.sex ?? ""}>
            <option value="">All sex</option>
            <option>Bull</option>
            <option>Cow</option>
            <option>Steer</option>
            <option>Heifer</option>
          </select>
          <select
            className="field"
            name="status"
            defaultValue={params.status ?? ""}
          >
            <option value="">All status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="unverified">Unverified</option>
          </select>
          <button className="button-secondary gap-2" type="submit">
            <Filter size={17} />
            Filter
          </button>
        </form>
      </section>

      <section className="section grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {results.map((longhorn) => (
          <LonghornCard
            key={longhorn.id}
            longhorn={longhorn}
            ranch={getRanch(longhorn.ranch_id)}
          />
        ))}
      </section>
    </AppShell>
  );
}
