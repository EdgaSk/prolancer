import { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import Home from "../pages/Home";
import DashBoard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";

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
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppRoutes;
