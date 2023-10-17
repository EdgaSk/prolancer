import { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import Home from "../pages/Home";
import DashBoard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {isAuthenticated ? (
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </main>
    </>
  );
};

export default AppRoutes;
