export type VerificationStatus = "verified" | "pending" | "unverified";

export type Profile = {
  id: string;
  full_name: string;
  role: "owner" | "breeder" | "ranch_admin" | "platform_admin";
  email: string;
};

export type Ranch = {
  id: string;
  name: string;
  slug: string;
  location: string;
  owner_name: string;
  description: string;
  phone: string;
  website: string;
  verified: boolean;
};

export type Longhorn = {
  id: string;
  name: string;
  registration_number: string;
  dob: string;
  sex: "Bull" | "Cow" | "Steer" | "Heifer";
  sire_id: string | null;
  dam_id: string | null;
  breeder: string;
  current_owner: string;
  ranch_id: string;
  horn_measurement: string;
  color: string;
  description: string;
  photos: string[];
  documents: string[];
  verification_status: VerificationStatus;
};

export type MarketplaceListing = {
  id: string;
  longhorn_id: string;
  title: string;
  price: string;
  location: string;
  seller: string;
  status: "available" | "pending" | "sold";
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "Auction" | "Show" | "Sale" | "Clinic";
  description: string;
};

export type VerificationRequest = {
  id: string;
  target_type: "longhorn" | "ranch";
  target_name: string;
  submitted_by: string;
  status: VerificationStatus;
  notes: string;
};
