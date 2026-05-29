"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch, RotateCcw, Sparkles } from "lucide-react";
import {
  getLonghorn,
  getOffspring,
  getRanch,
  longhorns,
} from "@/lib/sample-data";
import type { Longhorn } from "@/lib/types";

type OrbitNode = {
  label: string;
  longhorn?: Longhorn;
  x: number;
  y: number;
  tone: "parent" | "grandparent" | "offspring";
};

function OrbitCard({ node }: { node: OrbitNode }) {
  const position = { left: `${node.x}%`, top: `${node.y}%` };
  const tone =
    node.tone === "parent"
      ? "border-[#00b246]"
      : node.tone === "offspring"
        ? "border-[#b96a3a]"
        : "border-[#b9d8af]";

  if (!node.longhorn) {
    return (
      <div
        className={`orbit-node border-dashed ${tone} text-[#7d967f]`}
        style={position}
      >
        <span className="label block text-[10px]">{node.label}</span>
        <span className="mt-1 block text-sm font-semibold">Unknown</span>
      </div>
    );
  }

  return (
    <Link
      href={`/lineage?id=${node.longhorn.id}`}
      className={`orbit-node ${tone}`}
      style={position}
    >
      <div className="orbit-node-inner">
        <span className="orbit-node-photo">
          <Image
            src={node.longhorn.photos[0]}
            alt={node.longhorn.name}
            fill
            sizes="48px"
            className="object-cover saturate-[0.9]"
          />
        </span>
        <span className="min-w-0">
          <span className="label block text-[10px]">{node.label}</span>
          <span className="mt-1 block truncate text-sm font-semibold">
            {node.longhorn.name}
          </span>
          <span className="mt-1 block truncate text-xs text-[#5f7d69]">
            {node.longhorn.registration_number}
          </span>
        </span>
      </div>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#087333]">
        Focus
        <ArrowUpRight size={12} />
      </span>
    </Link>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[#cfe4c7] bg-[#fffdf6] px-3 py-2">
      <p className="label text-[10px]">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

export function LineageWheel({ selectedId }: { selectedId: string }) {
  const selected = getLonghorn(selectedId) ?? longhorns[1];
  const sire = selected.sire_id ? getLonghorn(selected.sire_id) : undefined;
  const dam = selected.dam_id ? getLonghorn(selected.dam_id) : undefined;
  const sireSire = sire?.sire_id ? getLonghorn(sire.sire_id) : undefined;
  const sireDam = sire?.dam_id ? getLonghorn(sire.dam_id) : undefined;
  const damSire = dam?.sire_id ? getLonghorn(dam.sire_id) : undefined;
  const damDam = dam?.dam_id ? getLonghorn(dam.dam_id) : undefined;
  const offspring = getOffspring(selected.id);
  const ranch = getRanch(selected.ranch_id);

  const orbitNodes: OrbitNode[] = [
    { label: "Sire", longhorn: sire, x: 31, y: 42, tone: "parent" },
    { label: "Dam", longhorn: dam, x: 69, y: 42, tone: "parent" },
    { label: "Sire's sire", longhorn: sireSire, x: 18, y: 18, tone: "grandparent" },
    { label: "Sire's dam", longhorn: sireDam, x: 18, y: 72, tone: "grandparent" },
    { label: "Dam's sire", longhorn: damSire, x: 82, y: 18, tone: "grandparent" },
    { label: "Dam's dam", longhorn: damDam, x: 82, y: 72, tone: "grandparent" },
    { label: "Offspring", longhorn: offspring[0], x: 50, y: 86, tone: "offspring" },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <aside className="panel h-fit p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded bg-[#00b246] text-white">
            <GitBranch size={19} />
          </span>
          <div>
            <p className="label">Focus animal</p>
            <h2 className="text-xl font-semibold">{selected.name}</h2>
          </div>
        </div>

        <form className="mt-5">
          <label className="block space-y-2">
            <span className="label">Jump to record</span>
            <select
              className="field"
              name="id"
              defaultValue={selected.id}
              onChange={(event) => {
                event.currentTarget.form?.requestSubmit();
              }}
            >
              {longhorns.map((longhorn) => (
                <option value={longhorn.id} key={longhorn.id}>
                  {longhorn.name}
                </option>
              ))}
            </select>
          </label>
        </form>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <StatPill label="Horn" value={selected.horn_measurement} />
          <StatPill label="Sex" value={selected.sex} />
          <StatPill label="Ranch" value={ranch?.name ?? "Unassigned"} />
          <StatPill label="Status" value={selected.verification_status} />
        </div>

        <div className="mt-5 rounded bg-[#07351b] p-4 text-white">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles size={16} />
            Easy read
          </p>
          <p className="mt-2 text-sm leading-6 text-[#dff4d7]">
            Parents sit on the inner orbit, grandparents sit outside, and the
            bottom point shows the first offspring record when one exists.
          </p>
        </div>

        <div className="mt-5 grid gap-2">
          {(
            [
            ["Sire", sire],
            ["Dam", dam],
            ["First offspring", offspring[0]],
            ] satisfies Array<[string, Longhorn | undefined]>
          ).map(([label, longhorn]) => (
            <Link
              className="button-secondary justify-between"
              href={longhorn ? `/lineage?id=${longhorn.id}` : "/lineage"}
              key={String(label)}
            >
              <span>{String(label)}</span>
              <RotateCcw size={15} />
            </Link>
          ))}
        </div>
      </aside>

      <section className="panel overflow-hidden p-3 sm:p-5">
        <div className="overflow-x-auto pb-2">
          <div className="family-map relative mx-auto h-[640px] w-[860px] overflow-hidden rounded-[30px] border border-[#b9d8af]">
          <div className="lineage-center-card">
            <div className="relative mx-auto mb-3 size-20 overflow-hidden rounded-full border-2 border-[#dff4d7] bg-[#e5f4dc]">
              <Image
                src={selected.photos[0]}
                alt={selected.name}
                fill
                priority
                sizes="80px"
                className="object-cover saturate-[0.95]"
              />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cde8c3]">
              Current focus
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{selected.name}</h3>
            <p className="mt-2 text-xs text-[#dff4d7]">
              {selected.registration_number}
            </p>
          </div>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {orbitNodes.map((node) => {
              return (
                <path
                  key={`${node.label}-${node.x}-${node.y}`}
                  d={`M 50 50 C 50 ${node.y}, ${node.x} 50, ${node.x} ${node.y}`}
                  fill="none"
                  stroke={
                    node.tone === "offspring"
                      ? "rgba(185,106,58,0.42)"
                      : "rgba(8,115,51,0.3)"
                  }
                  strokeWidth="0.42"
                  strokeLinecap="round"
                />
              );
            })}
            <path
              d="M 18 18 C 24 24, 25 34, 31 42"
              fill="none"
              stroke="rgba(8,115,51,0.18)"
              strokeWidth="0.3"
            />
            <path
              d="M 18 72 C 24 66, 25 52, 31 42"
              fill="none"
              stroke="rgba(8,115,51,0.18)"
              strokeWidth="0.3"
            />
            <path
              d="M 82 18 C 76 24, 75 34, 69 42"
              fill="none"
              stroke="rgba(8,115,51,0.18)"
              strokeWidth="0.3"
            />
            <path
              d="M 82 72 C 76 66, 75 52, 69 42"
              fill="none"
              stroke="rgba(8,115,51,0.18)"
              strokeWidth="0.3"
            />
          </svg>
          {["Grandparents", "Parents", "Offspring"].map((label, index) => (
            <span
              key={label}
              className="absolute left-5 rounded-full border border-[#cfe4c7] bg-white/80 px-3 py-1 text-xs font-semibold text-[#496755]"
              style={{ top: `${18 + index * 27}%` }}
            >
              {label}
            </span>
          ))}
          {orbitNodes.map((node) => (
            <OrbitCard key={`${node.label}-${node.x}-${node.y}`} node={node} />
          ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#496755]">
          <span className="rounded-full bg-[#dff4d7] px-3 py-1">Green: parents</span>
          <span className="rounded-full bg-[#fff6de] px-3 py-1">Clay: offspring</span>
          <span className="rounded-full bg-white px-3 py-1">Tap a card to refocus</span>
        </div>
      </section>
    </div>
  );
}
