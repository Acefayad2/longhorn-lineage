import { LockKeyhole, Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { signIn, signUp } from "@/lib/actions";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AppShell>
      <section className="section grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="label">Member access</p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Sign in to manage verified herd records.
          </h1>
          <p className="max-w-xl leading-7 text-neutral-600">
            Supabase Auth powers owner, breeder, ranch admin, and platform admin
            access. The MVP includes auth forms and server actions ready for
            your Supabase project credentials.
          </p>
          {params.message ? (
            <div className="border border-neutral-300 bg-white p-4 text-sm">
              {params.message}
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <form action={signIn} className="card space-y-4 p-5">
            <div className="flex items-center gap-3">
              <LockKeyhole size={20} />
              <h2 className="text-xl font-semibold">Log in</h2>
            </div>
            <label className="block space-y-2">
              <span className="label">Email</span>
              <input className="field" name="email" type="email" required />
            </label>
            <label className="block space-y-2">
              <span className="label">Password</span>
              <input
                className="field"
                name="password"
                type="password"
                minLength={6}
                required
              />
            </label>
            <button className="button-primary w-full" type="submit">
              Sign in
            </button>
          </form>

          <form action={signUp} className="card space-y-4 p-5">
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <h2 className="text-xl font-semibold">Create account</h2>
            </div>
            <label className="block space-y-2">
              <span className="label">Full name</span>
              <input className="field" name="full_name" required />
            </label>
            <label className="block space-y-2">
              <span className="label">Email</span>
              <input className="field" name="email" type="email" required />
            </label>
            <label className="block space-y-2">
              <span className="label">Password</span>
              <input
                className="field"
                name="password"
                type="password"
                minLength={6}
                required
              />
            </label>
            <button className="button-secondary w-full" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
