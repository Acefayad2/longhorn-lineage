import { BadgeCheck, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { markVerified } from "@/lib/actions";
import {
  getLonghorn,
  getRanch,
  longhorns,
  ranches,
  verificationRequests,
} from "@/lib/sample-data";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const pendingLonghorns = longhorns.filter(
    (longhorn) => longhorn.verification_status !== "verified",
  );

  return (
    <AppShell>
      <section className="section-tight">
        <div className="border-b border-neutral-200 pb-6">
          <p className="label">Platform operations</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Admin verification dashboard
          </h1>
          {params.message ? (
            <p className="mt-4 border border-neutral-300 bg-white p-3 text-sm">
              {params.message}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <article className="card">
          <div className="border-b border-neutral-200 p-5">
            <div className="flex items-center gap-3">
              <ShieldAlert size={21} />
              <h2 className="text-xl font-semibold">Review queue</h2>
            </div>
          </div>
          <div className="divide-y divide-neutral-200">
            {verificationRequests.map((request) => (
              <div
                key={request.id}
                className="grid gap-4 p-5 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="label">{request.target_type}</p>
                  <h3 className="mt-1 font-semibold">{request.target_name}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{request.notes}</p>
                  <p className="mt-2 text-xs text-neutral-500">
                    Submitted by {request.submitted_by}
                  </p>
                </div>
                <div className="flex gap-2">
                  <form action={markVerified}>
                    <input
                      type="hidden"
                      name="request_id"
                      value={request.id}
                    />
                    <input
                      type="hidden"
                      name="target_type"
                      value={request.target_type}
                    />
                    <input
                      type="hidden"
                      name="target_id"
                      value={
                        request.target_type === "longhorn"
                          ? (getLonghorn("lh-2")?.id ?? "")
                          : (getRanch("cedar-creek-cattle-co")?.id ?? "")
                      }
                    />
                    <button className="button-primary" type="submit">
                      Mark verified
                    </button>
                  </form>
                  <button className="button-secondary" type="button">
                    Needs info
                  </button>
                </div>
              </div>
            ))}
            {pendingLonghorns.map((longhorn) => (
              <div
                key={longhorn.id}
                className="grid gap-4 p-5 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="label">longhorn</p>
                  <h3 className="mt-1 font-semibold">{longhorn.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {longhorn.registration_number} is currently{" "}
                    {longhorn.verification_status}.
                  </p>
                </div>
                <form action={markVerified}>
                  <input type="hidden" name="target_type" value="longhorn" />
                  <input type="hidden" name="target_id" value={longhorn.id} />
                  <button className="button-primary" type="submit">
                    Mark verified
                  </button>
                </form>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-6">
          <article className="card p-5">
            <div className="flex items-center gap-3">
              <BadgeCheck size={21} />
              <h2 className="text-xl font-semibold">Cattle status</h2>
            </div>
            <p className="mt-4 text-3xl font-semibold">
              {pendingLonghorns.length}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              records need verification
            </p>
          </article>
          <article className="card p-5">
            <h2 className="text-xl font-semibold">Ranch verification</h2>
            <div className="mt-4 space-y-3">
              {ranches.map((ranch) => (
                <div
                  key={ranch.id}
                  className="flex items-center justify-between border-t border-neutral-200 pt-3 text-sm"
                >
                  <span>{ranch.name}</span>
                  <span className="font-medium">
                    {ranch.verified ? "Verified" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
