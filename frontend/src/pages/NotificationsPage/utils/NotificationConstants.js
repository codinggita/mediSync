import { AlertTriangle, TrendingDown, FileText } from 'lucide-react';

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'critical',
    title: 'Critical Health Alert',
    message:
      'Abnormal glucose levels detected in your recent Blood Test. Please consult Dr. Arpit Khanna immediately.',
    time: '10 mins ago',
    read: false,
    icon: AlertTriangle,
    color: '#EF4444',
  },
  {
    id: 2,
    type: 'price_drop',
    title: 'Medicine Price Drop 📉',
    message:
      'Price for "Metformin 500mg" dropped by 25% at Apollo Pharmacy. You can save ₹120 on your next strip.',
    time: '2 hours ago',
    read: false,
    icon: TrendingDown,
    color: '#2A7FFF',
  },
  {
    id: 3,
    type: 'report',
    title: 'New Diagnostic Report',
    message: 'Your "Chest X-Ray" from City Scan Center is now available in your Medical Vault.',
    time: '5 hours ago',
    read: true,
    icon: FileText,
    color: '#2ECC71',
  },
];
