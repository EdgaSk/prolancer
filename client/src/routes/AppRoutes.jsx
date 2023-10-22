import { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { logInRoutes, logOutRoutes } from "../routes/constRoutes";
import DashBoardRoutes from "./DashBoardRoutes";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(UserContext);
  const location = useLocation(); // Initialize the location object
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <header
        style={{ position: "sticky", top: 0, right: 0, left: 0, zIndex: 10 }}
      >
        <NavBar />
      </header>
      <main>
        {isAuthenticated ? (
          <Routes>
            <Route path="/dashboard/*" element={<DashBoardRoutes />} />
            {logInRoutes.map(({ path, Component }) => (
              <Route key={path} path={`/${path}`} element={<Component />} />
            ))}
          </Routes>
        ) : (
          <Routes>
            {logOutRoutes.map(({ path, Component }) => (
              <Route key={path} path={`/${path}`} element={<Component />} />
            ))}
          </Routes>
        )}
      </main>
      {isDashboardRoute ? null : (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
};

export default AppRoutes;
