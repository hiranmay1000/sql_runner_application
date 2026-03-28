import Navbar from "./layout/Navbar";
import MainLayout from "./layout/MainLayout";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/Theme/ThemeProvider";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { theme } = useSelector((state: RootState) => state.theme);

  console.log("themme", theme);

  return (
    <ThemeContext value={theme}>
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path="/" element={<MainLayout sidebarOpen={sidebarOpen} />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </ThemeContext>
  );
}

export default App;
