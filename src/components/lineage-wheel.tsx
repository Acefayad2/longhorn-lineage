"use client";

import Link from "next/link";
import { GitBranch, RotateCcw, Sparkles } from "lucide-react";
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
  angle: number;
  radius: number;
};

function point(angle: number, radius: number) {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    left: `${50 + Math.cos(radians) * radius}%`,
    top: `${50 + Math.sin(radians) * radius}%`,
  };
}

function OrbitCard({ node }: { node: OrbitNode }) {
  const position = point(node.angle, node.radius);

  if (!node.longhorn) {
    return (
      <div className="orbit-node border-dashed text-[#7d967f]" style={position}>
        <span className="label block text-[10px]">{node.label}</span>
        <span className="mt-1 block text-sm font-semibold">Unknown</span>
      </div>
    );
  }

  return (
    <Link
      href={`/lineage?id=${node.longhorn.id}`}
      className="orbit-node"
      style={position}
    >
      <span className="label block text-[10px]">{node.label}</span>
      <span className="mt-1 block truncate text-sm font-semibold">
        {node.longhorn.name}
      </span>
      <span className="mt-1 block truncate text-xs text-[#5f7d69]">
        {node.longhorn.registration_number}
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
    { label: "Sire", longhorn: sire, angle: 300, radius: 25 },
    { label: "Dam", longhorn: dam, angle: 60, radius: 25 },
    { label: "Sire's sire", longhorn: sireSire, angle: 245, radius: 40 },
    { label: "Sire's dam", longhorn: sireDam, angle: 335, radius: 40 },
    { label: "Dam's sire", longhorn: damSire, angle: 25, radius: 40 },
    { label: "Dam's dam", longhorn: damDam, angle: 115, radius: 40 },
    {
      label: "Offspring",
      longhorn: offspring[0],
      angle: 180,
      radius: 39,
    },
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

      <section className="panel overflow-hidden p-4 sm:p-6">
        <div className="lineage-wheel relative mx-auto aspect-square max-w-3xl rounded-full border border-[#b9d8af] bg-[#fffaf0]">
          <div className="absolute left-1/2 top-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded border border-[#07351b] bg-[#07351b] p-4 text-center text-white shadow-xl sm:w-52">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cde8c3]">
              Subject
            </p>
            <h3 className="mt-2 text-lg font-semibold sm:text-2xl">
              {selected.name}
            </h3>
            <p className="mt-2 text-xs text-[#dff4d7]">
              {selected.registration_number}
            </p>
          </div>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {orbitNodes.map((node) => {
              const target = point(node.angle, node.radius);
              return (
                <line
                  key={`${node.label}-${node.angle}`}
                  x1="50"
                  y1="50"
                  x2={target.left.replace("%", "")}
                  y2={target.top.replace("%", "")}
                  stroke="rgba(23,23,23,0.18)"
                  strokeWidth="0.35"
                />
              );
            })}
          </svg>
          {orbitNodes.map((node) => (
            <OrbitCard key={`${node.label}-${node.angle}`} node={node} />
          ))}
        </div>
      </section>
    </div>
  );
}
