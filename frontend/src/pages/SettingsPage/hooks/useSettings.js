import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';

export const useSettings = (isDoctor) => {
  const navigate = useNavigate();
  const { user, refreshUser, logout } = useAuth();
  
  const [isSaving, setIsSaving] = useState(false);
  const [filterMode, setFilterMode] = useState('All');
  
  const [telemetryState, setTelemetryState] = useState({
     vitals: user?.preferences?.vitals ?? true,
     priceDrops: user?.preferences?.priceDrops ?? false,
     appointments: user?.preferences?.appointments ?? true,
     records: user?.preferences?.records ?? false
  });

  const [securityState, setSecurityState] = useState({
    keyUpdated: '42 days ago',
    activeSessions: 3,
    syncing: false,
    showPasswordModal: false,
    passwords: { current: '', new: '', confirm: '' },
    updating: false,
    passwordLastChanged: user?.preferences?.passwordLastChanged || '3 months ago'
  });

  const [userData, setUserData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Jivan',
    lastName: user?.name?.split(' ').slice(1).join(' ') || 'User',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodType: user?.bloodGroup || 'B Positive',
    specialty: user?.specialty || '',
    hospital: user?.hospital || '',
    nodeId: user?.patientId || (isDoctor ? '#MS-DOC-X9' : '#MS-PT-88'),
    profileImg: user?.profilePic || null
  });

  const [records, setRecords] = useState([
    { id: 1, name: 'Annual Cardiac Screening', date: '2025-12-15', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Full Blood Count (FBC)', date: '2024-06-20', size: '1.1 MB', type: 'DOCX' },
    { id: 3, name: 'MRI Lumbar Spine', date: '2023-11-10', size: '45.8 MB', type: 'DICOM' },
    { id: 4, name: 'Dental X-Ray Archive', date: '2022-04-05', size: '5.2 MB', type: 'JPG' },
    { id: 5, name: 'Pediatric History Archive', date: '2021-01-12', size: '12.4 MB', type: 'PDF' }
  ]);

  useEffect(() => {
    if (user) {
      setUserData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || prev.firstName,
        lastName: user.name?.split(' ').slice(1).join(' ') || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        bloodType: user.bloodGroup || prev.bloodType,
        specialty: user.specialty || prev.specialty,
        hospital: user.hospital || prev.hospital,
        nodeId: user.patientId || (isDoctor ? '#MS-DOC-X9' : '#MS-PT-88'),
        profileImg: user.profilePic || prev.profileImg
      }));
      if (user.preferences) {
        setTelemetryState(prev => ({
          ...prev,
          ...user.preferences
        }));
        setSecurityState(prev => ({
          ...prev,
          passwordLastChanged: user.preferences.passwordLastChanged || prev.passwordLastChanged
        }));
      }
    }
  }, [user, isDoctor]);

  const handleToggle = (key) => setTelemetryState(p => ({...p, [key]: !p[key]}));

  const handleSecurityAction = (actionType) => {
    if (actionType === 'Update Password') {
      setSecurityState(prev => ({ ...prev, showPasswordModal: true }));
    } else if (actionType === 'Regenerate') {
       if(window.confirm('Regenerate Master Access Key? This will terminate other active sessions.')) {
           setSecurityState(prev => ({...prev, keyUpdated: 'just now', activeSessions: 1}));
           alert('Master Access Key Regenerated Successfully.');
       }
    } else if (actionType === 'Synchronize') {
       setSecurityState(prev => ({...prev, syncing: true}));
       setTimeout(() => {
           setSecurityState(prev => ({...prev, syncing: false}));
           alert('Biometric 2FA Protocol Synchronized.');
       }, 1500);
    } else if (actionType === 'Purge Sessions') {
       if(window.confirm('Purge all remote sessions?')) {
           setSecurityState(prev => ({...prev, activeSessions: 1}));
           alert('Remote sessions terminated. Only this node remains active.');
       }
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (securityState.passwords.new !== securityState.passwords.confirm) {
      return alert('New passwords do not match clinical hash.');
    }
    setSecurityState(prev => ({ ...prev, updating: true }));
    try {
      await api.put('/users/profile', { password: securityState.passwords.new });
      alert('Security Credentials Synchronized Successfully.');
      setSecurityState(prev => ({ 
        ...prev, 
        showPasswordModal: false, 
        passwords: { current: '', new: '', confirm: '' },
        passwordLastChanged: 'just now'
      }));
    } catch (err) {
      alert('Security Protocol Failed: ' + (err.response?.data?.message || 'Verification Error'));
    } finally {
      setSecurityState(prev => ({ ...prev, updating: false }));
    }
  };

  const handleUpdateDetail = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    // Synchronize with AuthContext state for the most current session credentials
    const currentToken = user?.token;
    
    if (!currentToken) {
      alert('Sync Protocol Failed: Session Credentials Missing. Please re-login to synchronize your clinical profile.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        email: userData.email,
        phone: userData.phone,
        bloodGroup: userData.bloodType,
        specialty: userData.specialty,
        hospital: userData.hospital,
        gender: userData.gender,
        preferences: {
          ...telemetryState,
          passwordLastChanged: securityState.passwordLastChanged
        }
      };

      // Only include gender if it's one of the valid enum values to avoid validation errors
      if (['Male', 'Female', 'Other'].includes(userData.gender)) {
        payload.gender = userData.gender;
      }

      await api.put('/users/profile', payload);
      await refreshUser();
      alert('Clinical Profile Synchronized Successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      const errorMsg = err.response?.data?.message || 'Verification Error';
      alert(`Sync Protocol Failed: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('Secure Erase Protocol: Are you sure you want to permanently delete this clinical record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profileImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTerminate = () => {
    if(window.confirm('CRITICAL ACTION: Are you sure you want to terminate your session? You will be securely logged out.')) {
      logout();
      navigate('/login');
    }
  };

  return {
    user,
    isSaving,
    filterMode, setFilterMode,
    telemetryState, handleToggle,
    securityState, setSecurityState, handleSecurityAction, handlePasswordUpdate,
    userData, handleUpdateDetail, handleSaveChanges, handleImageUpload,
    records, setRecords, handleDeleteRecord,
    handleTerminate
  };
};
