import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import tablesRoutes from "./views/tables/TabelasRoutes";
import courseRoutes from "./views/course/CourseRoutes";
import classRoutes from "./views/classes/ClassRoutes";
import exerciseRoutes from "./views/exercises/ExerciseRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard/home" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...courseRoutes,
  ...classRoutes,
  ...exerciseRoutes,
  ...dashboardRoutes,
  ...tablesRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
