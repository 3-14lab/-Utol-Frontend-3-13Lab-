import React from "react";

const exerciseRoutes = [
  {
    path: "/exercicio/adicionar/:id_class",
    exact: true,
    component: React.lazy(() => import("./exerciseStore"))
  },
  {
    path: "/exercicio/estudante/:id_exercise",
    exact: true,
    component: React.lazy(() => import("./exerciseStudent"))  
  }, 
  {
    path: "/exercicioAntigo/:id_class",
    exact: true,
    component: React.lazy(() => import("./exerciseStoreOld"))
  }, 
  {
    path: "/exercicio/balancoPatrimonial/:id_class/:id_exercise",
    exact: true,
    component: React.lazy(() => import("./balancoPatrimonial"))
  }, 
  {
    path: "/exercicio/balancete-financeiro/:id_class/:id_exercise",
    exact: true,
    component: React.lazy(() => import("./balanceteFinanceiro"))
  }, 
  {
    path: "/exercicio/balancete-quantitativo/:id_class/:id_exercise",
    exact: true,
    component: React.lazy(() => import("./balanceteQuantitativo"))
  }, 
  {
    path: "/exercicio/:id_exercise/:id_class",
    exact: true,
    component: React.lazy(() => import("./exerciseDetails"))
  },  

];

export default exerciseRoutes;
