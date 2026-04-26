/**
 * MediSync Frontend Helpers
 * Utility functions used across the application.
 */

/** Format a date string into "DD MMM YYYY" */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

/** Format a date into relative time (e.g. "2 hours ago") */
export const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60)   return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400)return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

/** Capitalize first letter of each word */
export const titleCase = (str) =>
  str?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) ?? '';

/** Truncate a string to maxLength chars */
export const truncate = (str, maxLength = 60) =>
  str && str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/** Get user initials (e.g. "Jivan Sharma" → "JS") */
export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/** Format a price in Indian Rupees */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

/** Calculate age from dateOfBirth string */
export const calcAge = (dob) => {
  if (!dob) return null;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
};

/** Generate a random hex color (useful for avatar placeholders) */
export const randomColor = (seed = '') => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 65%, 50%)`;
};

/** Debounce — returns a debounced version of fn */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/** Download a JSON object as a .json file */
export const downloadJSON = (data, filename = 'export.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/** Check if a value is a non-empty string */
export const isNonEmpty = (val) => typeof val === 'string' && val.trim().length > 0;
