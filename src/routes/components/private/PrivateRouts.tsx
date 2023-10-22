import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Spinner } from "components/common";
import { ErrorBoundary } from "services/error";

const Layout = lazy(() => import("layout/Layout"));
const NotFound = lazy(() => import("pages/404/NotFound"));
const Books = lazy(() => import("pages/books/Books"));
// const Tasks = lazy(() => import("pages/tasks/Tasks"));
// const UserInfo = lazy(() => import("pages/userInfo/UserInfo"));
// const UserKpi = lazy(() => import("pages/userKpi/UserKpi"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Books />,
      },
      // {
      //   path: "invoice",
      //   element: <Employees />,
      // },
      // {
      //   path: "employees",
      //   element: <Employees />,
      // },
      // {
      //   path: "tasks",
      //   element: <Tasks />,
      // },
      // {
      //   path: "user-info",
      //   element: <UserInfo />,
      // },
      // {
      //   path: "user-kpi",
      //   element: <UserKpi />,
      // },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

const PrivateRouts = () => {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};

export default PrivateRouts;
