import { Route, Routes } from "react-router-dom";
import styles from "./styles/DashBoardRoutes.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  adminDashBoard,
  freelancerDashBoard,
  employerDashBoard,
} from "../routes/constRoutes";
import DashboardMenuSlide from "../components/DashboardMenuSlide";
import Footer from "../components/Footer";
import DashboardMenuFixed from "../components/DashboardMenuFixed";

const Dashboard = () => {
  const { isAuthenticated, userData } = useContext(UserContext);
  const [showdashmenu, setshowdashmenu] = useState(false);
  const isFreelancer =
    isAuthenticated && userData.roles && userData.roles.freelancer;
  const isEmployer =
    isAuthenticated && userData.roles && userData.roles.employer;
  const isAdmin = isAuthenticated && userData.roles && userData.roles.admin;

  useEffect(() => {
    const handleResize = () => {
      setshowdashmenu(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const FreelancerDashboard = () => (
    <Routes>
      {freelancerDashBoard.map(({ path, Component }) => (
        <Route key={path} path={`/${path}`} element={<Component />} />
      ))}
    </Routes>
  );

  const EmployerDashboard = () => (
    <Routes>
      {employerDashBoard.map(({ path, Component }) => (
        <Route key={path} path={`/${path}`} element={<Component />} />
      ))}
    </Routes>
  );

  const AdminDashboard = () => (
    <Routes>
      {adminDashBoard.map(({ path, Component }) => (
        <Route key={path} path={`/${path}`} element={<Component />} />
      ))}
    </Routes>
  );

  return (
    <section className={styles.cointainer}>
      {showdashmenu && <DashboardMenuSlide />}
      <div className={styles.left}>
        <DashboardMenuFixed />
      </div>
      <div className={styles.right}>
        {isFreelancer && <FreelancerDashboard />}
        {isEmployer && <EmployerDashboard />}
        {isAdmin && <AdminDashboard />}
        <footer>
          <Footer />
        </footer>
      </div>
    </section>
  );
};

export default Dashboard;
