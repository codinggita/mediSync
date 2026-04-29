import ReactGA from 'react-ga4';

/**
 * Tracks a custom tactical event in the MediSync ecosystem.
 * @param {string} category - The high-level category (e.g., 'Authentication')
 * @param {string} action - The specific action taken (e.g., 'Login Success')
 * @param {string} label - Optional label for further granularity
 * @param {number} value - Optional numerical value associated with the event
 */
export const trackEvent = (category, action, label = null, value = null) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

/**
 * Tracks clinical coordination events.
 */
export const trackClinicalAction = (action, metadata = {}) => {
  ReactGA.event('Clinical Coordination', {
    action,
    ...metadata,
  });
};

/**
 * Tracks pharmaceutical routing events.
 */
export const trackPharmacyAction = (action, pharmacyName) => {
  ReactGA.event('Pharmacy Operations', {
    action,
    pharmacy_name: pharmacyName,
  });
};
