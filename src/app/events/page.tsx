import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { events } from "@/lib/sample-data";

export default function EventsPage() {
  return (
    <AppShell>
      <section className="section-tight">
        <div className="border-b border-neutral-200 pb-6">
          <p className="label">Auctions, shows, and ranch community</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Events and auctions
          </h1>
        </div>
      </section>

      <section className="section space-y-4">
        {events.map((event) => (
          <article
            className="card grid gap-4 p-5 md:grid-cols-[180px_1fr_auto]"
            key={event.id}
          >
            <div>
              <p className="label">{event.type}</p>
              <p className="mt-2 text-lg font-semibold">{event.date}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {event.description}
              </p>
              <p className="mt-3 text-sm font-medium">{event.location}</p>
            </div>
            <CalendarDays size={24} />
          </article>
        ))}
      </section>
    </AppShell>
  );
}
