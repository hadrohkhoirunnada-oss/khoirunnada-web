import { SITE_CONFIG } from "@/constants/site";

export function createMetadata({ title, description } = {}) {
  return {
    title: title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
    description: description || SITE_CONFIG.description,
  };
}
