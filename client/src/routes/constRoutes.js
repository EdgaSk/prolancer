import Home from "../pages/Home";
import DashBoard from "../pages/Dashboard";
import Error404 from "../pages/Error404";
import Contacts from "../pages/Contacts";

export const HOME_PATH = "/";
export const CONTACTS_PATH = "/contacts";
export const DASHBOARD_PATH = "/dashboard";
export const ERROR404_PATH = "*";

export const logInRoutes = [
  { path: HOME_PATH, Component: Home },
  { path: CONTACTS_PATH, Component: Contacts },
  { path: ERROR404_PATH, Component: Error404 },
];

export const logOutRoutes = [
  { path: HOME_PATH, Component: Home },
  { path: CONTACTS_PATH, Component: Contacts },
  { path: ERROR404_PATH, Component: Error404 },
];

export const freelancerDashBoard = [
  { path: DASHBOARD_PATH, Component: DashBoard },
];

export const employerDashBoard = [
  { path: DASHBOARD_PATH, Component: DashBoard },
];

export const navLinks = [
  { path: HOME_PATH, nameKey: "homePage" },
  { path: CONTACTS_PATH, nameKey: "contactsPage" },
];
