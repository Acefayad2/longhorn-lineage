import Link from "next/link";
import { getLonghorn } from "@/lib/sample-data";
import type { Longhorn } from "@/lib/types";

function PedigreeNode({
  longhorn,
  label,
  depth,
}: {
  longhorn?: Longhorn;
  label: string;
  depth: number;
}) {
  if (!longhorn || depth === 0) {
    return (
      <div className="tree-node border-dashed text-[#7d967f]">
        <span className="label">{label}</span>
        <span>Unknown</span>
      </div>
    );
  }

  const sire = longhorn.sire_id ? getLonghorn(longhorn.sire_id) : undefined;
  const dam = longhorn.dam_id ? getLonghorn(longhorn.dam_id) : undefined;

  return (
    <div className="space-y-3">
      <Link href={`/longhorns/${longhorn.id}`} className="tree-node">
        <span className="label">{label}</span>
        <span className="font-semibold">{longhorn.name}</span>
        <span className="text-xs text-[#5f7d69]">
          {longhorn.registration_number}
        </span>
      </Link>
      {depth > 1 ? (
        <div className="grid gap-3 border-l border-[#cfe4c7] pl-3">
          <PedigreeNode longhorn={sire} label="Sire" depth={depth - 1} />
          <PedigreeNode longhorn={dam} label="Dam" depth={depth - 1} />
        </div>
      ) : null}
    </div>
  );
}

export function PedigreeTree({ longhorn }: { longhorn: Longhorn }) {
  const sire = longhorn.sire_id ? getLonghorn(longhorn.sire_id) : undefined;
  const dam = longhorn.dam_id ? getLonghorn(longhorn.dam_id) : undefined;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
      <div className="tree-node bg-[#07351b] text-white">
        <span className="text-xs uppercase tracking-[0.22em] text-[#cde8c3]">
          Subject
        </span>
        <span className="text-xl font-semibold">{longhorn.name}</span>
        <span className="text-sm text-[#dff4d7]">
          {longhorn.registration_number}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PedigreeNode longhorn={sire} label="Sire line" depth={3} />
        <PedigreeNode longhorn={dam} label="Dam line" depth={3} />
      </div>
    </div>
  );
}
