import React from "react";
import { authRoles } from "../../auth/authRoles";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const dashboardRoutes = [
  {
    path: "/dashboard/home",
    component: React.lazy(() => import("./home")),
    auth: authRoles.admin
  },
  // {
  //   path: "/dashboard/criarCurso/:id",
  //   component: React.lazy(() => import("../course/courseStore")),
  //   auth: authRoles.admin
  // },
  // {
  //   path: "/dashboard/detalhesCurso",
  //   component: React.lazy(() => import("../course/courseDetails")),
  //   auth: authRoles.admin
  // },
  // {
  //   path: "/dashboard/criarAula",
  //   component: React.lazy(() => import("./criarAula")),
  //   auth: authRoles.admin
  // },
  // {
  //   path: "/dashboard/detalhesAula",
  //   component: React.lazy(() => import("./detalhesAula")),
  //   auth: authRoles.admin
  // },
  // {
  //   path: "/dashboard/criarExercicio",
  //   component: React.lazy(() => import("./criarExercicio")),
  //   auth: authRoles.admin
  // },
  // {
  //   path: "/dashboard/detalhesExercicio",
  //   component: React.lazy(() => import("./detalhesExercicio")),
  //   auth: authRoles.admin
  // },
  // {
  //   path: "/dashboard/exercicio",
  //   component: React.lazy(() => import("./exercicio")),
  //   auth: authRoles.admin
  // },
  {
    path: "/dashboard/pdf",
    component: React.lazy(() => import("./pdf")),
    settings,
    auth: authRoles.admin
  },
];

export default dashboardRoutes;
