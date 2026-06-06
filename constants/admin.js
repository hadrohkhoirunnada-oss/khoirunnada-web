export const ALLOWED_ADMIN_EMAILS = [
  "hadrohkhoirunnada@gmail.com",
  "dzarinalkhairaat@gmail.com",
];

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function isAllowedAdminEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  return ALLOWED_ADMIN_EMAILS.map(normalizeEmail).includes(normalizedEmail);
}