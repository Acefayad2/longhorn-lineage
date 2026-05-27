import type {
  Event,
  Longhorn,
  MarketplaceListing,
  Ranch,
  VerificationRequest,
} from "./types";

export const ranches: Ranch[] = [
  {
    id: "ranch-1",
    name: "Black Mesa Longhorns",
    slug: "black-mesa-longhorns",
    location: "Fredericksburg, TX",
    owner_name: "Marisol Grant",
    description:
      "A family-run breeding program focused on calm disposition, strong horn growth, and proven maternal lines.",
    phone: "(830) 555-0142",
    website: "https://example.com/black-mesa",
    verified: true,
  },
  {
    id: "ranch-2",
    name: "Llano Ridge Ranch",
    slug: "llano-ridge-ranch",
    location: "Llano, TX",
    owner_name: "Evan Whitaker",
    description:
      "Performance-minded Texas Longhorn operation with select private treaty cattle and regional auction consignments.",
    phone: "(325) 555-0198",
    website: "https://example.com/llano-ridge",
    verified: true,
  },
  {
    id: "ranch-3",
    name: "Cedar Creek Cattle Co.",
    slug: "cedar-creek-cattle-co",
    location: "Lampasas, TX",
    owner_name: "Nora Bell",
    description:
      "Boutique herd preserving classic Texas genetics with detailed ownership records and show documentation.",
    phone: "(512) 555-0167",
    website: "https://example.com/cedar-creek",
    verified: false,
  },
];

export const longhorns: Longhorn[] = [
  {
    id: "lh-1",
    name: "Mesa Monarch",
    registration_number: "TLBAA-102984",
    dob: "2017-03-18",
    sex: "Bull",
    sire_id: "lh-5",
    dam_id: "lh-6",
    breeder: "Black Mesa Longhorns",
    current_owner: "Black Mesa Longhorns",
    ranch_id: "ranch-1",
    horn_measurement: "87.5 in TTT",
    color: "Dark brindle with white underline",
    description:
      "Flagship herd sire with balanced horn set, quiet handling, and multiple high-selling offspring.",
    photos: [
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["Registration certificate", "Horn measurement card"],
    verification_status: "verified",
  },
  {
    id: "lh-2",
    name: "Rio Pearl",
    registration_number: "TLBAA-118237",
    dob: "2020-05-09",
    sex: "Cow",
    sire_id: "lh-1",
    dam_id: "lh-3",
    breeder: "Black Mesa Longhorns",
    current_owner: "Llano Ridge Ranch",
    ranch_id: "ranch-2",
    horn_measurement: "63.25 in TTT",
    color: "Red roan with speckled face",
    description:
      "Young foundation cow with strong maternal line and clean production notes.",
    photos: [
      "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["Registration certificate", "Transfer receipt"],
    verification_status: "pending",
  },
  {
    id: "lh-3",
    name: "Cedar Star Lady",
    registration_number: "TLBAA-091772",
    dob: "2015-09-24",
    sex: "Cow",
    sire_id: "lh-7",
    dam_id: "lh-8",
    breeder: "Cedar Creek Cattle Co.",
    current_owner: "Black Mesa Longhorns",
    ranch_id: "ranch-1",
    horn_measurement: "82.0 in TTT",
    color: "White with red ears and spots",
    description:
      "Proven donor cow with documented offspring performance and elite maternal consistency.",
    photos: [
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["DNA parentage", "Embryo transfer record"],
    verification_status: "verified",
  },
  {
    id: "lh-4",
    name: "Llano Silverline",
    registration_number: "TLBAA-126410",
    dob: "2022-02-11",
    sex: "Heifer",
    sire_id: "lh-1",
    dam_id: "lh-2",
    breeder: "Llano Ridge Ranch",
    current_owner: "Llano Ridge Ranch",
    ranch_id: "ranch-2",
    horn_measurement: "34.0 in TTT",
    color: "Silver grulla",
    description:
      "Promising heifer with a stacked pedigree and early horn growth.",
    photos: [
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["Calf registration application"],
    verification_status: "unverified",
  },
  {
    id: "lh-5",
    name: "Copper Trail Boss",
    registration_number: "TLBAA-077312",
    dob: "2012-04-30",
    sex: "Bull",
    sire_id: null,
    dam_id: null,
    breeder: "Heritage Hill Longhorns",
    current_owner: "Black Mesa Longhorns",
    ranch_id: "ranch-1",
    horn_measurement: "91.0 in TTT",
    color: "Copper red",
    description: "Reference sire known for width, base, and marketable color.",
    photos: [
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["Archived registration"],
    verification_status: "verified",
  },
  {
    id: "lh-6",
    name: "Prairie Lace",
    registration_number: "TLBAA-080114",
    dob: "2013-06-12",
    sex: "Cow",
    sire_id: null,
    dam_id: null,
    breeder: "Prairie Stone Ranch",
    current_owner: "Black Mesa Longhorns",
    ranch_id: "ranch-1",
    horn_measurement: "79.75 in TTT",
    color: "White and parker brown",
    description: "Maternal anchor with gentle temperament and strong calves.",
    photos: [
      "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["Production record"],
    verification_status: "verified",
  },
  {
    id: "lh-7",
    name: "Red River Royal",
    registration_number: "TLBAA-069880",
    dob: "2010-01-28",
    sex: "Bull",
    sire_id: null,
    dam_id: null,
    breeder: "Red River Longhorns",
    current_owner: "Cedar Creek Cattle Co.",
    ranch_id: "ranch-3",
    horn_measurement: "88.25 in TTT",
    color: "Deep red",
    description: "Classic pedigree reference sire with verified parentage.",
    photos: [
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["DNA parentage"],
    verification_status: "verified",
  },
  {
    id: "lh-8",
    name: "Canyon Moon",
    registration_number: "TLBAA-071003",
    dob: "2011-10-05",
    sex: "Cow",
    sire_id: null,
    dam_id: null,
    breeder: "Canyon Moon Ranch",
    current_owner: "Cedar Creek Cattle Co.",
    ranch_id: "ranch-3",
    horn_measurement: "80.5 in TTT",
    color: "Black and white paint",
    description: "Dam of several replacement females with strong udder quality.",
    photos: [
      "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&w=1400&q=80",
    ],
    documents: ["Archived registration"],
    verification_status: "verified",
  },
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "list-1",
    longhorn_id: "lh-4",
    title: "Llano Silverline - show prospect heifer",
    price: "$6,500",
    location: "Llano, TX",
    seller: "Llano Ridge Ranch",
    status: "available",
  },
  {
    id: "list-2",
    longhorn_id: "lh-2",
    title: "Rio Pearl - bred cow inquiry",
    price: "Private treaty",
    location: "Fredericksburg, TX",
    seller: "Black Mesa Longhorns",
    status: "pending",
  },
];

export const events: Event[] = [
  {
    id: "event-1",
    title: "Hill Country Spring Select Sale",
    date: "2026-06-13",
    location: "Fredericksburg, TX",
    type: "Auction",
    description:
      "Cataloged longhorn sale with verified registration packets and online bidding.",
  },
  {
    id: "event-2",
    title: "Central Texas Breeder Clinic",
    date: "2026-07-18",
    location: "Lampasas, TX",
    type: "Clinic",
    description:
      "Hands-on records, DNA, and horn measurement workshop for small ranches.",
  },
  {
    id: "event-3",
    title: "Llano Summer Futurity",
    date: "2026-08-22",
    location: "Llano, TX",
    type: "Show",
    description:
      "Youth and open futurity classes with marketplace consignments onsite.",
  },
];

export const verificationRequests: VerificationRequest[] = [
  {
    id: "vr-1",
    target_type: "longhorn",
    target_name: "Rio Pearl",
    submitted_by: "Evan Whitaker",
    status: "pending",
    notes: "Transfer receipt uploaded. Awaiting registration cross-check.",
  },
  {
    id: "vr-2",
    target_type: "ranch",
    target_name: "Cedar Creek Cattle Co.",
    submitted_by: "Nora Bell",
    status: "pending",
    notes: "Ranch ownership documentation submitted for review.",
  },
];

export function getRanch(id: string) {
  return ranches.find((ranch) => ranch.id === id || ranch.slug === id);
}

export function getLonghorn(id: string) {
  return longhorns.find((longhorn) => longhorn.id === id);
}

export function getRanchLonghorns(ranchId: string) {
  return longhorns.filter((longhorn) => longhorn.ranch_id === ranchId);
}

export function getOffspring(parentId: string) {
  return longhorns.filter(
    (longhorn) => longhorn.sire_id === parentId || longhorn.dam_id === parentId,
  );
}

export function getPedigree(longhorn: Longhorn, depth = 3): unknown {
  if (depth === 0) {
    return null;
  }

  const sire = longhorn.sire_id ? getLonghorn(longhorn.sire_id) : undefined;
  const dam = longhorn.dam_id ? getLonghorn(longhorn.dam_id) : undefined;

  return {
    longhorn,
    sire: sire ? getPedigree(sire, depth - 1) : null,
    dam: dam ? getPedigree(dam, depth - 1) : null,
  };
}

export function searchLonghorns(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return longhorns;
  }

  return longhorns.filter((longhorn) => {
    const ranch = getRanch(longhorn.ranch_id);
    const sire = longhorn.sire_id ? getLonghorn(longhorn.sire_id) : undefined;
    const dam = longhorn.dam_id ? getLonghorn(longhorn.dam_id) : undefined;
    const haystack = [
      longhorn.name,
      longhorn.registration_number,
      longhorn.current_owner,
      longhorn.breeder,
      ranch?.name,
      sire?.name,
      dam?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}
