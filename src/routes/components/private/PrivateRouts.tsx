import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Spinner } from "components/common";
import { ErrorBoundary } from "services/error";

const Layout = lazy(() => import("layout/Layout"));
const NotFound = lazy(() => import("pages/404/NotFound"));

// Books
const BooksList = lazy(() => import("pages/books/list/BooksList"));
const BooksAddOrEdit = lazy(
  () => import("pages/books/addOrEdit/BooksAddOrEdit")
);

// Topics
const TopicList = lazy(() => import("pages/topic/list/TopicList"));
const TopicAddOrEdit = lazy(
  () => import("pages/topic/addOrEdit/TopicAddOrEdit")
);

// Test
const TestList = lazy(() => import("pages/test/list/TestList"));
const TestAddOrEdit = lazy(() => import("pages/test/addOrEdit/TestAddOrEdit"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <BooksList />,
      },
      {
        path: "/add",
        element: <BooksAddOrEdit />,
      },
      // {
      //   path: "/info/:bookId",
      //   element: <BooksAddOrEdit />,
      // },
      {
        path: "/edit/:bookId",
        element: <BooksAddOrEdit />,
      },
      {
        path: "/:bookId/topic",
        element: <TopicList />,
      },
      {
        path: "/:bookId/topic/add",
        element: <TopicAddOrEdit />,
      },
      // {
      //   path: "/:bookId/topic/info/:topicId",
      //   element: <TopicInfo />,
      // },
      {
        path: "/:bookId/topic/edit/:topicId",
        element: <TopicAddOrEdit />,
      },
      {
        path: "/test",
        element: <TestList />,
      },
      // {
      //   path: "/test/info/:testId",
      //   element: <TestInfo />,
      // },
      {
        path: "/test/add",
        element: <TestAddOrEdit />,
      },
      {
        path: "/test/edit/:testId",
        element: <TestAddOrEdit />,
      },
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
