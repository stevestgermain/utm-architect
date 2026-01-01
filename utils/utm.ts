export interface UTMParams {
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

const normalize = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^a-z0-9_\-\.]/g, ''); // Strip special chars except simple separators
};

export const buildUtmUrl = (params: UTMParams): string => {
  const { baseUrl, source, medium, campaign, term, content } = params;

  if (!baseUrl) return '';

  let finalUrl = baseUrl.trim();
  
  // Basic validation to ensure protocol exists if missing
  if (!/^https?:\/\//i.test(finalUrl) && finalUrl.length > 0) {
    finalUrl = 'https://' + finalUrl;
  }

  try {
    const url = new URL(finalUrl);
    
    // Helper to append param if value exists
    const appendParam = (key: string, value: string) => {
      const normalizedValue = normalize(value);
      if (normalizedValue) {
        url.searchParams.set(key, normalizedValue);
      } else {
        url.searchParams.delete(key); 
      }
    };

    appendParam('utm_source', source);
    appendParam('utm_medium', medium);
    appendParam('utm_campaign', campaign);
    appendParam('utm_term', term);
    appendParam('utm_content', content);

    return url.toString();
  } catch (e) {
    // Return partial URL if invalid, or just the base string if it can't be parsed yet
    return finalUrl;
  }
};