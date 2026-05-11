import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import ContentGenerator from "./pages/dashboard/ContentGenerator";
import Scheduler from "./pages/dashboard/Scheduler";
import WAMarketing from "./pages/dashboard/WAMarketing";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import { AuthState, User } from "./types";

export default function App() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const handleLogin = (user: User, token: string) => {
    setAuth({ user, token, isAuthenticated: true });
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          auth.isAuthenticated ? (
            <DashboardLayout user={auth.user!} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="ai-generator" element={<ContentGenerator />} />
        <Route path="scheduler" element={<Scheduler />} />
        <Route path="whatsapp" element={<WAMarketing />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
