import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import { useAuthStore } from './store';
import ProtectedRoutes from './protectedRoutes';
import Spinner from './components/spinner.js'
// Lazy load components
const SignUpForm = lazy(() => import('./components/SignUpForm'));
const LoginForm = lazy(() => import('./components/LoginForm'));
const Create = lazy(() => import('./components/Create'));
const Profile = lazy(() => import('./components/profile'));
const Home = lazy(() => import('./components/Home'));

function App() {
  const { user } = useAuthStore();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!user ? <SignUpForm /> : <Navigate to="/home" />} />
            {user && <Route path="/create/:id" element={<Create />} />}
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={user ? <ProtectedRoutes><Profile /></ProtectedRoutes> : <Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
