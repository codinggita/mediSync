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
  { 
    id: 'Free', 
    label: 'Biological Starter', 
    price: '₹0', 
    features: ['50MB Clinical Storage', 'Basic Vital Tracking', 'Emergency Contact Link', 'Standard Encrypted Vault'] 
  },
  { 
    id: 'Pro', 
    label: 'Advanced Portal', 
    price: '₹199/mo', 
    features: ['Unlimited Health Records', 'Real-time AI Biometrics', 'Priority Market Alerts', 'Multi-Family Access Sync'] 
  }
];
