import * as Yup from 'yup';

export const SignupSchema = Yup.object({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  role: Yup.string().oneOf(['Patient', 'Doctor', 'Admin']).required('Role is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Mobile number is required'),
  agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
  
  // Patient Specific
  bloodGroup: Yup.string().when('role', {
    is: 'Patient',
    then: (schema) => schema.required('Blood group is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  gender: Yup.string().when('role', {
    is: 'Patient',
    then: (schema) => schema.required('Gender is required'),
    otherwise: (schema) => schema.notRequired()
  }),

  // Doctor Specific
  specialty: Yup.string().when('role', {
    is: 'Doctor',
    then: (schema) => schema.required('Specialty is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  hospital: Yup.string().when('role', {
    is: 'Doctor',
    then: (schema) => schema.required('Hospital is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  medicalLicenseId: Yup.string().when('role', {
    is: 'Doctor',
    then: (schema) => schema.required('License ID is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  orgEmail: Yup.string().email('Invalid email').when('role', {
    is: 'Doctor',
    then: (schema) => schema.required('Org email is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  licenseCertificateUrl: Yup.string().when('role', {
    is: 'Doctor',
    then: (schema) => schema.required('Certificate is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  profilePic: Yup.string().when('role', {
    is: 'Doctor',
    then: (schema) => schema.required('Profile image is required'),
    otherwise: (schema) => schema.notRequired()
  })
});
