import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import BookListing from './components/BookListing';
import DarkLightToggle from './components/DarkLightToggle';
import BookCard from './components/BookCard';
import NotesDashboard from './components/NotesDashboard';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import AddBookForm from './components/AddBookForm';
import Dashboard from './components/Dashboard';

function App() {
  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login?sessionExpired=true" />;
    }
    return children;
  };

  const [isNotesDashboardOpen, setNotesDashboardOpen] = useState(false);

  const openNotesDashboard = () => setNotesDashboardOpen(true);
  const closeNotesDashboard = () => setNotesDashboardOpen(false);

  return (
    <ThemeProvider>
      <div className="App">
      <DarkLightToggle />
      <NotesDashboard isOpen={isNotesDashboardOpen} onClose={closeNotesDashboard} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <div>
                <h2>Admin Dashboard</h2>
                <Link to="/add-book">
                  <button style={{ padding: '10px 20px', margin: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Add New Book
                  </button>
                </Link>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <div>
              <Dashboard />
                <BookListing />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/book/:title" element={<div>Book Detail Page (Placeholder)</div>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
