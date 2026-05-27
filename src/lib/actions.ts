"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "./supabase-admin";
import { createClient } from "./supabase-server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  if (!supabase) {
    redirect("/auth?message=Add Supabase env vars before signing in");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/auth?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "");
  const supabase = await createClient();

  if (!supabase) {
    redirect("/auth?message=Add Supabase env vars before creating accounts");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect(`/auth?message=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth?message=Check your email to confirm your account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function createLonghorn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) {
    redirect("/longhorns/new?message=Connect Supabase to save records");
  }

  const payload = {
    name: String(formData.get("name") ?? ""),
    registration_number: String(formData.get("registration_number") ?? ""),
    dob: String(formData.get("dob") ?? ""),
    sex: String(formData.get("sex") ?? "Cow"),
    sire_id: String(formData.get("sire_id") || "") || null,
    dam_id: String(formData.get("dam_id") || "") || null,
    breeder: String(formData.get("breeder") ?? ""),
    current_owner: String(formData.get("current_owner") ?? ""),
    ranch_id: String(formData.get("ranch_id") || "") || null,
    horn_measurement: String(formData.get("horn_measurement") ?? ""),
    color: String(formData.get("color") ?? ""),
    description: String(formData.get("description") ?? ""),
    verification_status: "pending",
  };

  const { data, error } = await supabase
    .from("longhorns")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    redirect(`/longhorns/new?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/longhorns");
  redirect(`/longhorns/${data.id}`);
}

export async function markVerified(formData: FormData) {
  const targetType = String(formData.get("target_type") ?? "");
  const targetId = String(formData.get("target_id") ?? "");
  const requestId = String(formData.get("request_id") ?? "");
  const supabase = createAdminClient();

  if (!supabase) {
    redirect("/admin?message=Add SUPABASE_SERVICE_ROLE_KEY to enable admin updates");
  }

  if (targetType === "longhorn") {
    await supabase
      .from("longhorns")
      .update({ verification_status: "verified" })
      .eq("id", targetId);
  }

  if (targetType === "ranch") {
    await supabase.from("ranches").update({ verified: true }).eq("id", targetId);
  }

  if (requestId) {
    await supabase
      .from("verification_requests")
      .update({
        status: "verified",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", requestId);
  }

  revalidatePath("/admin");
  revalidatePath("/longhorns");
  revalidatePath("/dashboard");
  redirect("/admin?message=Record marked verified");
}
