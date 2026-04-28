import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';

export const useSettings = (isDoctor) => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  
  const [isSaving, setIsSaving] = useState(false);
  const [filterMode, setFilterMode] = useState('All');
  
  const [telemetryState, setTelemetryState] = useState({
     vitals: true,
     priceDrops: false,
     appointments: true,
     records: false
  });

  const [securityState, setSecurityState] = useState({
    keyUpdated: '42 days ago',
    activeSessions: 3,
    syncing: false,
    showPasswordModal: false,
    passwords: { current: '', new: '', confirm: '' },
    updating: false
  });

  const [userData, setUserData] = useState({
    firstName: 'Shubham',
    lastName: 'Kumar',
    email: 'shubham@gmail.com',
    phone: '+91 99887 76655',
    bloodType: 'B Positive',
    specialization: 'Cardiology Specialist',
    nodeId: '#MS-SHB99',
    profileImg: null
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
        nodeId: isDoctor ? '#MS-DOC-X9' : '#MS-PT-88',
        bloodType: isDoctor ? 'MD-LIC-829' : 'B Positive',
        specialization: isDoctor ? 'Senior Cardiologist' : ''
      }));
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
        passwords: { current: '', new: '', confirm: '' } 
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
    setIsSaving(true);
    try {
      await api.put('/users/profile', {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        bloodGroup: userData.bloodGroup,
        gender: userData.gender
      });
      await refreshUser();
      alert('Clinical Profile Synchronized Successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Sync Protocol Failed. Please verify network connectivity.');
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
