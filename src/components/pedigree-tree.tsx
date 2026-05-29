import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLonghorn } from "@/lib/sample-data";
import type { Longhorn } from "@/lib/types";

function CompactRecord({
  label,
  longhorn,
}: {
  label: string;
  longhorn?: Longhorn;
}) {
  if (!longhorn) {
    return (
      <div className="rounded-2xl border border-dashed border-[#b9d8af] bg-[#f8fff3] p-4 text-[#7d967f]">
        <p className="label">{label}</p>
        <p className="mt-2 font-semibold">Unknown</p>
      </div>
    );
  }

  return (
    <Link
      href={`/longhorns/${longhorn.id}`}
      className="group rounded-2xl border border-[#cfe4c7] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#087333] hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="relative size-12 overflow-hidden rounded-full border border-[#cfe4c7] bg-[#e5f4dc]">
          <Image
            src={longhorn.photos[0]}
            alt={longhorn.name}
            fill
            sizes="48px"
            className="object-cover saturate-[0.9]"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="label block">{label}</span>
          <span className="mt-1 block truncate font-semibold">
            {longhorn.name}
          </span>
          <span className="mt-1 block truncate text-xs text-[#5f7d69]">
            {longhorn.registration_number}
          </span>
        </span>
        <ArrowUpRight
          size={15}
          className="text-[#7d967f] transition group-hover:text-[#087333]"
        />
      </div>
    </Link>
  );
}

export function PedigreeTree({ longhorn }: { longhorn: Longhorn }) {
  const sire = longhorn.sire_id ? getLonghorn(longhorn.sire_id) : undefined;
  const dam = longhorn.dam_id ? getLonghorn(longhorn.dam_id) : undefined;
  const grandparents = [
    {
      label: "Sire's sire",
      longhorn: sire?.sire_id ? getLonghorn(sire.sire_id) : undefined,
    },
    {
      label: "Sire's dam",
      longhorn: sire?.dam_id ? getLonghorn(sire.dam_id) : undefined,
    },
    {
      label: "Dam's sire",
      longhorn: dam?.sire_id ? getLonghorn(dam.sire_id) : undefined,
    },
    {
      label: "Dam's dam",
      longhorn: dam?.dam_id ? getLonghorn(dam.dam_id) : undefined,
    },
  ];

  return (
    <div className="grid gap-5">
      <div className="rounded-[24px] border border-[#07351b] bg-[#07351b] p-5 text-white shadow-xl shadow-[#07351b]/15">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative size-20 overflow-hidden rounded-full border-2 border-[#dff4d7] bg-[#e5f4dc]">
            <Image
              src={longhorn.photos[0]}
              alt={longhorn.name}
              fill
              sizes="80px"
              className="object-cover saturate-[0.95]"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#cde8c3]">
              Selected record
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{longhorn.name}</h3>
            <p className="mt-1 text-sm text-[#dff4d7]">
              {longhorn.registration_number} · {longhorn.horn_measurement}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CompactRecord label="Sire" longhorn={sire} />
        <CompactRecord label="Dam" longhorn={dam} />
      </div>

      <div>
        <p className="label mb-3">Grandparent generation</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {grandparents.map((item) => (
            <CompactRecord
              key={item.label}
              label={item.label}
              longhorn={item.longhorn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
