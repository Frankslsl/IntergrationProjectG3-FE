import { lazy, Suspense, useState, ReactElement } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../src/components/dashboard/authContext";
import SignIn from "./scenes/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./scenes/Register";
import Navbar from "./scenes/navbar";
import Footer from "./scenes/Footer";
import { SelectedPage } from "./components/enum/selectedPage";
import useTopPage from "./hooks/useTopPage";
const HomePage = lazy(() => import("@/HomePage"));

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

const App = () => {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.home,
  );
  const isTopOfPage = useTopPage();

  const location = useLocation();
  const showNavbarAndFooter = location.pathname !== "/dashboard";
  return (
    <>
      <AuthProvider>
        {showNavbarAndFooter && (
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isTopOfPage={isTopOfPage}
          />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/home"
              element={<HomePage setSelectedPage={setSelectedPage} />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </Suspense>
      </AuthProvider>
      {showNavbarAndFooter && <Footer />}
    </>
  );
};

export default App;
