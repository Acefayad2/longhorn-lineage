import { Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { createLonghorn } from "@/lib/actions";
import { longhorns, ranches } from "@/lib/sample-data";

export default async function NewLonghornPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AppShell>
      <section className="section max-w-5xl">
        <div className="mb-8 border-b border-neutral-200 pb-6">
          <p className="label">Herd records</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Add or edit longhorn
          </h1>
          {params.message ? (
            <p className="mt-4 border border-neutral-300 bg-white p-3 text-sm">
              {params.message}
            </p>
          ) : null}
        </div>

        <form action={createLonghorn} className="card grid gap-5 p-5 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="label">Name</span>
            <input className="field" name="name" required />
          </label>
          <label className="block space-y-2">
            <span className="label">Registration number</span>
            <input className="field" name="registration_number" required />
          </label>
          <label className="block space-y-2">
            <span className="label">DOB</span>
            <input className="field" name="dob" type="date" required />
          </label>
          <label className="block space-y-2">
            <span className="label">Sex</span>
            <select className="field" name="sex" defaultValue="Cow">
              <option>Bull</option>
              <option>Cow</option>
              <option>Steer</option>
              <option>Heifer</option>
            </select>
          </label>
          <label className="block space-y-2">
            <span className="label">Sire</span>
            <select className="field" name="sire_id" defaultValue="">
              <option value="">Unknown</option>
              {longhorns.map((longhorn) => (
                <option value={longhorn.id} key={longhorn.id}>
                  {longhorn.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span className="label">Dam</span>
            <select className="field" name="dam_id" defaultValue="">
              <option value="">Unknown</option>
              {longhorns.map((longhorn) => (
                <option value={longhorn.id} key={longhorn.id}>
                  {longhorn.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span className="label">Breeder</span>
            <input className="field" name="breeder" />
          </label>
          <label className="block space-y-2">
            <span className="label">Current owner</span>
            <input className="field" name="current_owner" />
          </label>
          <label className="block space-y-2">
            <span className="label">Ranch</span>
            <select className="field" name="ranch_id" defaultValue="">
              <option value="">Select ranch</option>
              {ranches.map((ranch) => (
                <option value={ranch.id} key={ranch.id}>
                  {ranch.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span className="label">Horn measurement</span>
            <input className="field" name="horn_measurement" />
          </label>
          <label className="block space-y-2">
            <span className="label">Color</span>
            <input className="field" name="color" />
          </label>
          <label className="block space-y-2">
            <span className="label">Photos</span>
            <span className="flex h-11 items-center gap-2 rounded border border-dashed border-neutral-300 px-3 text-sm text-neutral-500">
              <Upload size={16} />
              Storage upload hook ready
            </span>
          </label>
          <label className="block space-y-2 md:col-span-2">
            <span className="label">Description</span>
            <textarea className="textarea" name="description" />
          </label>
          <div className="flex justify-end md:col-span-2">
            <button className="button-primary" type="submit">
              Save longhorn
            </button>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
