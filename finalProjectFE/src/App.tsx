import { lazy, Suspense, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "../src/components/dashboard/authContext";
import SignIn from "./scenes/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./scenes/Register";
import Navbar from "./scenes/navbar";
import Footer from "./scenes/Footer";
import { SelectedPage } from "./components/enum/selectedPage";
import useTopPage from "./hooks/useTopPage";
const HomePage = lazy(() => import("@/HomePage"));

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
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </Suspense>
        {showNavbarAndFooter && <Footer />}
      </AuthProvider>
    </>
  );
};

export default App;
