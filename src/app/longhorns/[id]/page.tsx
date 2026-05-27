import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Pencil, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PedigreeTree } from "@/components/pedigree-tree";
import {
  getLonghorn,
  getOffspring,
  getRanch,
} from "@/lib/sample-data";

export default async function LonghornProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const longhorn = getLonghorn(id);
  if (!longhorn) {
    notFound();
  }

  const ranch = getRanch(longhorn.ranch_id);
  const sire = longhorn.sire_id ? getLonghorn(longhorn.sire_id) : undefined;
  const dam = longhorn.dam_id ? getLonghorn(longhorn.dam_id) : undefined;
  const offspring = getOffspring(longhorn.id);

  return (
    <AppShell>
      <section className="section grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[440px] overflow-hidden border border-neutral-200 bg-neutral-100">
          <Image
            src={longhorn.photos[0]}
            alt={longhorn.name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover grayscale"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="label">{longhorn.registration_number}</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                {longhorn.name}
              </h1>
              <p className="mt-3 leading-7 text-neutral-600">
                {longhorn.description}
              </p>
            </div>
            <Link href="/longhorns/new" className="button-secondary gap-2">
              <Pencil size={16} />
              Edit
            </Link>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["DOB", longhorn.dob],
              ["Sex", longhorn.sex],
              ["Horn measurement", longhorn.horn_measurement],
              ["Color", longhorn.color],
              ["Breeder", longhorn.breeder],
              ["Current owner", longhorn.current_owner],
              ["Ranch", ranch?.name ?? "Unassigned"],
              ["Verification", longhorn.verification_status],
            ].map(([label, value]) => (
              <div className="card p-4" key={label}>
                <dt className="label">{label}</dt>
                <dd className="mt-2 font-medium capitalize">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <article className="card p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} />
            <h2 className="text-xl font-semibold">Lineage</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link
              href={sire ? `/longhorns/${sire.id}` : "#"}
              className="tree-node"
            >
              <span className="label">Sire</span>
              <span className="font-semibold">{sire?.name ?? "Unknown"}</span>
            </Link>
            <Link
              href={dam ? `/longhorns/${dam.id}` : "#"}
              className="tree-node"
            >
              <span className="label">Dam</span>
              <span className="font-semibold">{dam?.name ?? "Unknown"}</span>
            </Link>
          </div>
          <div className="mt-6">
            <PedigreeTree longhorn={longhorn} />
          </div>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-semibold">Documents</h2>
          <div className="mt-4 space-y-3">
            {longhorn.documents.map((document) => (
              <div
                className="flex items-center gap-3 border-t border-neutral-200 pt-3"
                key={document}
              >
                <FileText size={18} />
                <span className="text-sm font-medium">{document}</span>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-semibold">Offspring</h2>
          <div className="mt-4 space-y-3">
            {offspring.length ? (
              offspring.map((calf) => (
                <Link
                  href={`/longhorns/${calf.id}`}
                  className="block border-t border-neutral-200 pt-3 text-sm font-medium hover:underline"
                  key={calf.id}
                >
                  {calf.name}
                </Link>
              ))
            ) : (
              <p className="text-sm text-neutral-500">
                No offspring records in the sample dataset.
              </p>
            )}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
