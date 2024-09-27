import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import AboutUsPage from "@/pages/AboutUsPage";
import PairProgrammingPage from "@/pages/PairProgrammingPage";
import ProjectsPage from "@/pages/ProjectsPage";
import HomePageWrapper from "@/wrappers/HomePageWrapper";
import ActivationPage from "@/pages/ActivationPage";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePageWrapper />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/pair-programming",
        element: <PairProgrammingPage />,
      },
      {
        path: "/activate/:uid/:token",
        element: <ActivationPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/my-project",
        element: <ProjectDetailsPage />,
      },
    ],
  },
]);

export default router;
