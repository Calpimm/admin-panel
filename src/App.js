import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS dosyasını import edin
import './index.css'; // Import the CSS file
import ApiDocumentation from './components/Docs/Docs';
import ModeratorPanel from './components/ModeratorPanel';

const PrivateRoute = ({ children, role }) => {
  const isAuthenticated = !!sessionStorage.getItem('adminToken');
  const userRole = sessionStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute role="admin">
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route 
            path="/ApiDocumentation"
            element={
              <PrivateRoute>
                <ApiDocumentation />
              </PrivateRoute>
            }
          />
          <Route 
            path="/moderator"
            element={
              <PrivateRoute role="moderator">
                <ModeratorPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}

export default App;
