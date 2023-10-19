import { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import { logInRoutes, logOutRoutes } from "../routes/constRoutes";
import DashBoardRoutes from "./DashBoardRoutes";

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
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppRoutes;
