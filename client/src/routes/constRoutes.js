import Home from "../pages/Home";
import DashBoard from "../pages/Dashboard";
import Error404 from "../pages/Error404";
import Contacts from "../pages/Contacts";
import Profile from "../pages/Profile";
import SubmissionJob from "../pages/SubmissionJob";
import SubmissionServices from "../pages/SubmissionServices";
import BrowserServices from "../pages/BrowserServices";
import Service from "../pages/Service";

export const HOME_PATH = "/";
export const ERROR404_PATH = "*";
export const CONTACTS_PATH = "/contacts";
export const DASHBOARD_PATH = "/";
export const PROFILE_PATH = "/profile";
export const SUBMISSION_JOB_PATH = "/submissionjob";
export const SUBMISSION_SERVICES_PATH = "/submissionservices";
export const BROWSER_SERVICES_PATH = "/browserservices";
export const SERVICE_PATH = "/service/:id";

export const logInRoutes = [
  { path: HOME_PATH, Component: Home },
  { path: CONTACTS_PATH, Component: Contacts },
  { path: BROWSER_SERVICES_PATH, Component: BrowserServices },
  { path: SERVICE_PATH, Component: Service },
  { path: ERROR404_PATH, Component: Error404 },
];

export const logOutRoutes = [
  { path: HOME_PATH, Component: Home },
  { path: CONTACTS_PATH, Component: Contacts },
  { path: BROWSER_SERVICES_PATH, Component: BrowserServices },
  { path: SERVICE_PATH, Component: Service },
  { path: ERROR404_PATH, Component: Error404 },
];

export const adminDashBoard = [
  { path: DASHBOARD_PATH, Component: DashBoard },
  { path: PROFILE_PATH, Component: Profile },
  { path: SUBMISSION_JOB_PATH, Component: SubmissionJob },
  { path: SUBMISSION_SERVICES_PATH, Component: SubmissionServices },
  { path: ERROR404_PATH, Component: Error404 },
];

export const freelancerDashBoard = [
  { path: DASHBOARD_PATH, Component: DashBoard },
  { path: PROFILE_PATH, Component: Profile },
  { path: SUBMISSION_SERVICES_PATH, Component: SubmissionServices },
  { path: ERROR404_PATH, Component: Error404 },
];

export const employerDashBoard = [
  { path: DASHBOARD_PATH, Component: DashBoard },
  { path: PROFILE_PATH, Component: Profile },
  { path: SUBMISSION_JOB_PATH, Component: SubmissionJob },
  { path: ERROR404_PATH, Component: Error404 },
];

export const navLinks = [
  { path: HOME_PATH, nameKey: "homePage" },
  { path: CONTACTS_PATH, nameKey: "contactsPage" },
  { path: BROWSER_SERVICES_PATH, nameKey: "browserServices" },
];

export const dashBoardAdminLinks = [
  { path: DASHBOARD_PATH, nameKey: "dashboardPage" },
  { path: SUBMISSION_JOB_PATH, nameKey: "submissionJobPage" },
  { path: SUBMISSION_SERVICES_PATH, nameKey: "submissionServicesPage" },
  { path: PROFILE_PATH, nameKey: "profilePage" },
];

export const dashBoardFreelancerLinks = [
  { path: DASHBOARD_PATH, nameKey: "dashboardPage" },
  { path: SUBMISSION_SERVICES_PATH, nameKey: "submissionServicesPage" },
  { path: PROFILE_PATH, nameKey: "profilePage" },
];

export const dashBoardEmployerLinks = [
  { path: DASHBOARD_PATH, nameKey: "dashboardPage" },
  { path: SUBMISSION_JOB_PATH, nameKey: "submissionJobPage" },
  { path: PROFILE_PATH, nameKey: "profilePage" },
];
