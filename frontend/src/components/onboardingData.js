import {
  LayoutDashboard,
  FileText,
  Calendar,
  ShoppingBag,
  Share2,
  AlertTriangle,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const steps = [
  {
    icon: Sparkles,
    color: '#2A7FFF',
    bg: 'from-[#2A7FFF]/20 to-[#8B5CF6]/20',
    title: 'Welcome to MediSync! 👋',
    subtitle: 'Your Personal Health Hub',
    description:
      "MediSync keeps your entire health life in one secure, beautiful place. Let's take a quick 30-second tour so you know exactly where everything is.",
    cta: 'Start Tour',
  },
  {
    icon: LayoutDashboard,
    color: '#2A7FFF',
    bg: 'from-[#2A7FFF]/20 to-[#2A7FFF]/5',
    title: 'Your Dashboard',
    subtitle: 'Health at a Glance',
    description:
      'The Dashboard is your home base. See your Health Score, upcoming appointments, saved medicines, clinical reports, and active alerts — all updated live from your data.',
    cta: 'Next',
  },
  {
    icon: FileText,
    color: '#F59E0B',
    bg: 'from-[#F59E0B]/20 to-[#F59E0B]/5',
    title: 'Medical Records',
    subtitle: 'Your Health History',
    description:
      'Upload and view all your health documents — Lab Reports, X-Rays, Prescriptions, and Scans. Click any record to see full clinical details and download files.',
    cta: 'Next',
  },
  {
    icon: Calendar,
    color: '#8B5CF6',
    bg: 'from-[#8B5CF6]/20 to-[#8B5CF6]/5',
    title: 'Appointments',
    subtitle: 'Book & Manage Visits',
    description:
      'Schedule video consultations or in-person visits with your doctors. Video appointments include a "Join Call" link so you never miss a consultation.',
    cta: 'Next',
  },
  {
    icon: ShoppingBag,
    color: '#2ECC71',
    bg: 'from-[#2ECC71]/20 to-[#2ECC71]/5',
    title: 'Pharmacy Hub',
    subtitle: 'Save on Medicines',
    description:
      'Search for any medicine and instantly compare prices across multiple pharmacies like Apollo and MedPlus. Find the best deal and locate the nearest pharmacy.',
    cta: 'Next',
  },
  {
    icon: Share2,
    color: '#EC4899',
    bg: 'from-[#EC4899]/20 to-[#EC4899]/5',
    title: 'Record Sharing',
    subtitle: 'Share Securely with Doctors',
    description:
      'Generate encrypted, time-limited links to share your medical records with any doctor — even outside MediSync. You control access, and links auto-expire.',
    cta: 'Next',
  },
  {
    icon: AlertTriangle,
    color: '#EF4444',
    bg: 'from-[#EF4444]/20 to-[#EF4444]/5',
    title: 'Emergency Mode',
    subtitle: 'One-Tap Critical Info',
    description:
      'In an emergency, tap "Emergency Mode" in the sidebar. It instantly shows your blood group, allergies, emergency contacts, and nearest hospitals to first responders.',
    cta: 'Next',
  },
  {
    icon: CheckCircle,
    color: '#2ECC71',
    bg: 'from-[#2ECC71]/20 to-[#2A7FFF]/20',
    title: "You're all set, Jivan! 🎉",
    subtitle: 'Start Your Health Journey',
    description:
      'Your MediSync account is ready. Add your first medical record, book an appointment, or explore the pharmacy hub. Your health data is always safe and private.',
    cta: 'Go to Dashboard',
  },
];
