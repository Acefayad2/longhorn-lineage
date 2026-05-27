import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  getLonghorn,
  marketplaceListings,
} from "@/lib/sample-data";

export default function MarketplacePage() {
  return (
    <AppShell>
      <section className="section-tight">
        <div className="border-b border-neutral-200 pb-6">
          <p className="label">Private treaty and sale cattle</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Marketplace listings
          </h1>
        </div>
      </section>

      <section className="section grid gap-5 md:grid-cols-2">
        {marketplaceListings.map((listing) => {
          const longhorn = getLonghorn(listing.longhorn_id);
          return (
            <article className="card p-5" key={listing.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label">{listing.status}</p>
                  <h2 className="mt-2 text-xl font-semibold">{listing.title}</h2>
                </div>
                <CircleDollarSign size={22} />
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="label">Price</dt>
                  <dd className="mt-1 font-medium">{listing.price}</dd>
                </div>
                <div>
                  <dt className="label">Location</dt>
                  <dd className="mt-1 font-medium">{listing.location}</dd>
                </div>
                <div>
                  <dt className="label">Seller</dt>
                  <dd className="mt-1 font-medium">{listing.seller}</dd>
                </div>
                <div>
                  <dt className="label">Animal</dt>
                  <dd className="mt-1 font-medium">{longhorn?.name}</dd>
                </div>
              </dl>
              {longhorn ? (
                <Link
                  href={`/longhorns/${longhorn.id}`}
                  className="button-secondary mt-6"
                >
                  View profile
                </Link>
              ) : null}
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}
