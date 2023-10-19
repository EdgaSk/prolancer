import { Route, Routes } from "react-router-dom";
import styles from "./styles/DashBoardRoutes.module.scss";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  adminDashBoard,
  freelancerDashBoard,
  employerDashBoard,
} from "../routes/constRoutes";
import DashboardMenuSlide from "../components/DashboardMenuSlide";

const Dashboard = () => {
  const { isAuthenticated, userData } = useContext(UserContext);
  const isFreelancer =
    isAuthenticated && userData.roles && userData.roles.freelancer;
  const isEmployer =
    isAuthenticated && userData.roles && userData.roles.employer;
  const isAdmin = isAuthenticated && userData.roles && userData.roles.admin;

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
      <div>
        <DashboardMenuSlide />
      </div>
      <div>
        {isFreelancer && <FreelancerDashboard />}
        {isEmployer && <EmployerDashboard />}
        {isAdmin && <AdminDashboard />}
      </div>
    </section>
  );
};

export default Dashboard;
