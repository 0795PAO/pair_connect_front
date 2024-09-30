import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import AboutUsPage from "@/pages/AboutUsPage";
import PairProgrammingPage from "@/pages/PairProgrammingPage";
import ProjectsPage from "@/pages/ProjectsPage";
import HomePageWrapper from "@/wrappers/HomePageWrapper";
import ActivationPage from "@/pages/ActivationPage";
import MyProfilePage from "@/pages/MyProfilePage";
import SesionsDetailsPage from "@/pages/SesionsDetailsPage";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectFormPage from "@/pages/ProjectFormPage";

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
        path: "/my-profile",
        element: <MyProfilePage />,
      },
      {
        path: "/projects/create",
        element: <ProjectFormPage />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/sessions/:projectId",
        element: <SesionsDetailsPage />,
      },
    ],
  },
]);

export default router;
