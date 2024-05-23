import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainContent from './MainContent';
import ManagePlayerModal from './ManagePlayerModal';
import { isAuthenticated } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState('players');
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f7fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#000000',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#242424',
      },
      text: {
        primary: '#ffffff',
      },
    },
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/login');
  };

  const getApiKey = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/get-api-key`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();
      if (response.ok) {
        setApiKey(data.apiKey);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="flex h-screen">
        <Sidebar onSelect={handleSelect} isSidebarOpen={isSidebarOpen} />
        <div className="flex-1 flex flex-col" style={{ marginTop: '64px' }}>
          <Navbar onLogout={handleLogout} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} theme={theme} isSidebarOpen={isSidebarOpen} />
          <MainContent section={selectedSection} getApiKey={getApiKey} apiKey={apiKey} />
        </div>
        <ManagePlayerModal />
      </div>
    </ThemeProvider>
  );
}

export default AdminPanel;
