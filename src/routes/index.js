// All components mapping with path for internal routes

import { lazy } from "solid-js";

const ManageConsultationsHistory = lazy(() =>
  import("../pages/protected/ConsultationsHistory")
);
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Beneficiary = lazy(() => import("../pages/protected/Beneficiary"));
const Constants = lazy(() => import("../pages/protected/Constants"));
const Exams = lazy(() => import("../pages/protected/Exams"));
const Consultations = lazy(() => import("../pages/protected/Consultations"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/beneficiary", // the url
    component: Beneficiary, // view rendered
  },
  {
    path: "/constants", // the url
    component: Constants, // view rendered
  },
  {
    path: "/exams", // the url
    component: Exams, // view rendered
  },
  {
    path: "/consultations/waiting",
    component: Consultations,
  },
  {
    path: "/consultations/done",
    component: ManageConsultationsHistory,
  },
  // {
  //   path: "/command-orders-history",
  //   component: HistoryCommandOrders,
  // },
  // {
  //   path: "/settings-profile",
  //   component: ProfileSettings,
  // },
  // {
  //   path: "/settings-profile",
  //   component: ProfileSettings,
  // },
  // {
  //   path: "/settings-billing",
  //   component: Bills,
  // },
  // {
  //   path: "/getting-started",
  //   component: GettingStarted,
  // },
  // {
  //   path: "/features",
  //   component: DocFeatures,
  // },
  // {
  //   path: "/components",
  //   component: DocComponents,
  // },
  // {
  //   path: "/integration",
  //   component: Integration,
  // },
  // {
  //   path: "/charts",
  //   component: Charts,
  // },
  // {
  //   path: "/404",
  //   component: Page404,
  // },
  // {
  //   path: "/blank",
  //   component: Blank,
  // },
];

export default routes;
