// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Import your page components
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/Dashboard';
// import NotFoundPage from './pages/NotFoundPage'; // Optional: for 404
// import ProtectedRoute from './components/ProtectedRoute'; // Optional: for authenticated routes

function App() {
  // Basic example - you might add logic here later for protected routes
  const isAuthenticated = false; // Replace with actual auth check state later

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Route Example (Basic Redirect) */}
      {/* You'll likely want a more robust <ProtectedRoute> component later */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />}
      />

      {/* Redirect root path - e.g., redirect to login or dashboard */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />

      {/* Optional: Catch-all 404 Route */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
       <Route path="*" element={<div>404 Not Found</div>} /> {/* Simple 404 */}

    </Routes>
  );
}

export default App;