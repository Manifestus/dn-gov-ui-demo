import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";
import Error401Page from "src/pages/401";
import Error404Page from "src/pages/404";
import Error500Page from "src/pages/500";
import HomePage from 'src/pages';
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";

export const routes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "401",
    element: <Error401Page />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "500",
    element: <Error500Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
];
