export const INITIAL_SIGNUP_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Patient',
  bloodGroup: '',
  gender: '',
  specialty: '',
  hospital: '',
  medicalLicenseId: '',
  orgEmail: '',
  licenseCertificateUrl: '',
  profilePic: '',
  phone: '',
  agreeTerms: false
};

export const SIGNUP_PLANS = [
  { id: 'Free', label: 'Clinical Tier-1', price: '₹0', features: ['Core Vitals Tracking', 'Secure Vault'] },
  { id: 'Pro', label: 'Clinical Elite', price: '₹499/mo', features: ['Advanced Telemetry', 'Priority Access'] }
];
