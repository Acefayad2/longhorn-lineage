import Link from "next/link";
import { ArrowRight, GitBranch, Layers3 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { LineageWheel } from "@/components/lineage-wheel";
import { PedigreeTree } from "@/components/pedigree-tree";
import { getLonghorn, getOffspring, longhorns } from "@/lib/sample-data";

export default async function LineagePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const selected = getLonghorn(params.id ?? "") ?? longhorns[3];
  const offspring = getOffspring(selected.id);

  return (
    <AppShell>
      <section className="soft-band">
        <div className="section grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="label">Lineage studio</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              A visual pedigree wheel built for fast ranch decisions.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
              Rotate focus between ancestors and offspring, then use the simple
              table below when you need the exact registration trail.
            </p>
          </div>
          <div className="panel grid gap-3 p-4 sm:grid-cols-2">
            <div>
              <p className="label">Current focus</p>
              <p className="mt-1 text-xl font-semibold">{selected.name}</p>
            </div>
            <div>
              <p className="label">Known offspring</p>
              <p className="mt-1 text-xl font-semibold">{offspring.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <LineageWheel selectedId={selected.id} />
      </section>

      <section className="section grid gap-6 pt-0 lg:grid-cols-[1fr_340px]">
        <article className="panel p-5">
          <div className="flex items-center gap-3">
            <Layers3 size={20} />
            <h2 className="text-xl font-semibold">Readable pedigree table</h2>
          </div>
          <div className="mt-5">
            <PedigreeTree longhorn={selected} />
          </div>
        </article>

        <aside className="panel h-fit p-5">
          <div className="flex items-center gap-3">
            <GitBranch size={20} />
            <h2 className="text-xl font-semibold">Offspring path</h2>
          </div>
          <div className="mt-4 space-y-3">
            {offspring.length ? (
              offspring.map((calf) => (
                <Link
                  href={`/lineage?id=${calf.id}`}
                  className="flex items-center justify-between border-t border-neutral-200 pt-3 text-sm font-semibold hover:underline"
                  key={calf.id}
                >
                  {calf.name}
                  <ArrowRight size={15} />
                </Link>
              ))
            ) : (
              <p className="border-t border-neutral-200 pt-3 text-sm leading-6 text-neutral-600">
                No offspring records yet. Add calves from the longhorn form and
                they will appear here.
              </p>
            )}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
