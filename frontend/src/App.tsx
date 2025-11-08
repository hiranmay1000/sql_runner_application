import Navbar from "./layout/Navbar";
import MainLayout from "./layout/MainLayout";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/signup" ? null : (
        <Navbar setSidebarOpen={setSidebarOpen} />
      )}
      <Routes>
        <Route path="/" element={<MainLayout sidebarOpen={sidebarOpen} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
