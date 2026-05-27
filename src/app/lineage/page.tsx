import { AppShell } from "@/components/app-shell";
import { PedigreeTree } from "@/components/pedigree-tree";
import { getLonghorn, getOffspring, longhorns } from "@/lib/sample-data";

export default async function LineagePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const selected = getLonghorn(params.id ?? "") ?? longhorns[1];
  const offspring = getOffspring(selected.id);

  return (
    <AppShell>
      <section className="section-tight">
        <div className="border-b border-neutral-200 pb-6">
          <p className="label">Family tree</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            3-generation pedigree
          </h1>
        </div>
      </section>

      <section className="section grid gap-6 lg:grid-cols-[300px_1fr]">
        <form className="card h-fit p-4">
          <label className="block space-y-2">
            <span className="label">Select longhorn</span>
            <select className="field" name="id" defaultValue={selected.id}>
              {longhorns.map((longhorn) => (
                <option value={longhorn.id} key={longhorn.id}>
                  {longhorn.name}
                </option>
              ))}
            </select>
          </label>
          <button className="button-primary mt-4 w-full" type="submit">
            View pedigree
          </button>
          <div className="mt-6 border-t border-neutral-200 pt-4">
            <p className="label">Offspring</p>
            <div className="mt-3 space-y-2 text-sm">
              {offspring.length ? (
                offspring.map((calf) => <p key={calf.id}>{calf.name}</p>)
              ) : (
                <p className="text-neutral-500">No offspring records.</p>
              )}
            </div>
          </div>
        </form>

        <div className="card p-5">
          <PedigreeTree longhorn={selected} />
        </div>
      </section>
    </AppShell>
  );
}
