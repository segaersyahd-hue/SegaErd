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
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem("umkm_boost_auth");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  });

  const handleLogin = (user: User, token: string) => {
    const userWithTier: User = {
      ...user,
      tier: user.tier || "Pro",
      businessName: user.businessName || "Kedai Kopi Modern"
    };
    const newAuth = { user: userWithTier, token, isAuthenticated: true };
    setAuth(newAuth);
    localStorage.setItem("umkm_boost_auth", JSON.stringify(newAuth));
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("umkm_boost_auth");
  };

  const handleUpdateUser = (updatedUser: User) => {
    setAuth(prev => {
      const newAuth = { ...prev, user: updatedUser };
      localStorage.setItem("umkm_boost_auth", JSON.stringify(newAuth));
      return newAuth;
    });
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
            <DashboardLayout 
              user={auth.user!} 
              onLogout={handleLogout} 
              onUpdateUser={handleUpdateUser} 
            />
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
