import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("@/HomePage"));

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/*" element={<Navigate to={"/home"} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
