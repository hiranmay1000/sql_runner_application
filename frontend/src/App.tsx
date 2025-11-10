import Navbar from "./layout/Navbar";
import MainLayout from "./layout/MainLayout";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <>
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path="/" element={<MainLayout sidebarOpen={sidebarOpen} />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </>
  );
}

export default App;
