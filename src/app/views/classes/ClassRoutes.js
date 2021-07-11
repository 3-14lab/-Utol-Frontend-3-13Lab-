import React from "react";

const classRoutes = [
  {
    path: "/aula/adicionar/:id_course",
    exact: true,
    component: React.lazy(() => import("./classStore"))
  },
  {
    path: "/aula/:id_class",
    exact: true,
    component: React.lazy(() => import("./classDetails"))
  },  
];

export default classRoutes;
