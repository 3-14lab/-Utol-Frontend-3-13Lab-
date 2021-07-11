import React from "react";

const tablesRoutes = [
  {
    path: "/tabelas/professor",
    component: React.lazy(() => import("./Professor"))
  },
  {
    path: "/tabelas/aluno",
    component: React.lazy(() => import("./Aluno"))
  }
];

export default tablesRoutes;
