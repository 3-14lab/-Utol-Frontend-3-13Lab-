import React from "react";

const courseRoutes = [
  {
    path: "/curso/adicionar",
    exact: true,
    component: React.lazy(() => import("./courseStore"))
  },
  {
    path: "/curso/:id_course/",
    exact: true,
    component: React.lazy(() => import("./courseDetails"))
  },
  
];

export default courseRoutes;
