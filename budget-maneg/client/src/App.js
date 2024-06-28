import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'; // Kendi stil dosyanızı içe aktarın
import HomePage from './pages/homePage/HomePage';
import CalendarPage from './pages/calendar/CalendarPage';
import ComesGoesPage from './pages/comesGoesPage/ComesGoesPage';
import ReportPage from './pages/reportPage/ReportPage';
import TimePage from './pages/timePage/TimePage';
import ProfilePage from './pages/profilePage/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './pages/auth/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/addPage"
          element={
            <PrivateRoute>
              <ComesGoesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <ReportPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/time"
          element={
            <PrivateRoute>
              <TimePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
