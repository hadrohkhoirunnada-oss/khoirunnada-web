export function buildWhatsAppUrl({ phone, message }) {
  const cleanedPhone = String(phone || "").replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message || "");
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}
