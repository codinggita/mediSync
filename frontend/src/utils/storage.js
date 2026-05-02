

const storage = {
  
  
  
  setLocal: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  },

  
  getLocal: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  },

  
  removeLocal: (key) => {
    localStorage.removeItem(key);
  },

  
  
  
  setSession: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to sessionStorage', e);
    }
  },

  
  getSession: (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from sessionStorage', e);
      return null;
    }
  },

  
  removeSession: (key) => {
    sessionStorage.removeItem(key);
  },

  
  clearSession: () => {
    sessionStorage.clear();
  },

  
  clearAll: () => {
    localStorage.clear();
    sessionStorage.clear();
  }
};

export default storage;
