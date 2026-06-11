import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export const SUPABASE_GALLERY_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_GALLERY_BUCKET || "gallery-images";

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Konfigurasi Supabase public belum lengkap. Cek NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createClient(supabaseUrl, supabasePublishableKey);
}

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "Konfigurasi Supabase server belum lengkap. Cek NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SECRET_KEY."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabasePublicUrl(path, bucket = SUPABASE_GALLERY_BUCKET) {
  const supabase = getSupabaseBrowserClient();

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data?.publicUrl || "";
}