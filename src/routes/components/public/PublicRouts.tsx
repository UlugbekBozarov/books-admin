import { lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import { Spinner } from "components/common";
import { ErrorBoundary } from "services/error";

const SignIn = lazy(() => import("pages/auth/signIn/SignIn"));
const NotFound = lazy(() => import("pages/404/NotFound"));
// const SignUp = lazy(() => import("pages/auth/signUp/SignUp"));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      //   {
      //     path: "sign-up",
      //     element: <SignUp />,
      //   },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const PublicRouts = () => {
  redirect("/");

  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};

export default PublicRouts;
