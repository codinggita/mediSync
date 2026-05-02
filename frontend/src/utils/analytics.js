import ReactGA from 'react-ga4';


export const trackEvent = (category, action, label = null, value = null) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};


export const trackClinicalAction = (action, metadata = {}) => {
  ReactGA.event('Clinical Coordination', {
    action,
    ...metadata,
  });
};


export const trackPharmacyAction = (action, pharmacyName) => {
  ReactGA.event('Pharmacy Operations', {
    action,
    pharmacy_name: pharmacyName,
  });
};
