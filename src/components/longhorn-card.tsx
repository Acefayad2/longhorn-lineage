import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CircleDot } from "lucide-react";
import type { Longhorn, Ranch } from "@/lib/types";

export function LonghornCard({
  longhorn,
  ranch,
}: {
  longhorn: Longhorn;
  ranch?: Ranch;
}) {
  return (
    <Link href={`/longhorns/${longhorn.id}`} className="group card overflow-hidden">
      <div className="relative aspect-[4/3] bg-neutral-100">
        <Image
          src={longhorn.photos[0]}
          alt={longhorn.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover grayscale transition duration-300 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <span className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-xs font-medium">
          {longhorn.sex}
        </span>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {longhorn.name}
            </h3>
            <p className="text-sm text-neutral-500">
              {longhorn.registration_number}
            </p>
          </div>
          {longhorn.verification_status === "verified" ? (
            <BadgeCheck className="mt-1 text-neutral-950" size={18} />
          ) : (
            <CircleDot className="mt-1 text-neutral-400" size={18} />
          )}
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="label">Ranch</dt>
            <dd>{ranch?.name ?? "Unassigned"}</dd>
          </div>
          <div>
            <dt className="label">Horn</dt>
            <dd>{longhorn.horn_measurement}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
