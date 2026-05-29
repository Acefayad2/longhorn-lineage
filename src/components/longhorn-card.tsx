import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CircleDot, Clock3 } from "lucide-react";
import type { Longhorn, Ranch } from "@/lib/types";

function VerificationBadge({ status }: { status: Longhorn["verification_status"] }) {
  if (status === "verified") {
    return (
      <span className="status status-dark">
        <BadgeCheck size={14} />
        Verified
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className="status border border-[#dfc49d] bg-[#fff6de] text-[#82511f]">
        <Clock3 size={14} />
        Pending
      </span>
    );
  }

  return (
    <span className="status status-muted">
      <CircleDot size={14} />
      Unverified
    </span>
  );
}

export function LonghornCard({
  longhorn,
  ranch,
}: {
  longhorn: Longhorn;
  ranch?: Ranch;
}) {
  return (
    <Link
      href={`/longhorns/${longhorn.id}`}
      className="group card overflow-hidden transition hover:-translate-y-0.5 hover:border-[#087333] hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-[#e5f4dc]">
        <Image
          src={longhorn.photos[0]}
          alt={longhorn.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover saturate-[0.85] transition duration-300 group-hover:scale-[1.03] group-hover:saturate-100"
        />
        <span className="absolute left-3 top-3 rounded bg-[#fffdf6] px-2 py-1 text-xs font-medium text-[#173322]">
          {longhorn.sex}
        </span>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {longhorn.name}
            </h3>
            <p className="text-sm text-[#5f7d69]">
              {longhorn.registration_number}
            </p>
          </div>
          <VerificationBadge status={longhorn.verification_status} />
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
        <p className="line-clamp-2 border-t border-[#cfe4c7] pt-4 text-sm leading-6 text-[#496755]">
          {longhorn.description}
        </p>
      </div>
    </Link>
  );
}
