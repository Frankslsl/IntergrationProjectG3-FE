import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from '../src/components/dashboard/authContext';
import SignIn from './scenes/SignIn'; 
import Dashboard from './components/dashboard/Dashboard';
import Register from './scenes/Register';
const HomePage = lazy(() => import("@/HomePage"));

const App = () => {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to={"/home"} />} />          
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
};

export default App;
