import { useState } from 'react';

const usePharmacy = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return {
    collapsed,
    setCollapsed,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    selectedPharmacy,
    setSelectedPharmacy
  };
};

export default usePharmacy;
