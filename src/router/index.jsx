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
import MyProfileInfo from "@/components/profile/MyProfileInfo";
import MyProfileBadges from "@/components/profile/MyProfileBadges";
import MyProfileSession from "@/components/profile/MyProfileSession";
import PublicSessionDetailPage from "@/pages/PublicSessionDetailPage";
import PublicProfile from "@/pages/PublicProfile";
import OwnerSessionDetailsPage from "@/pages/OwnerSessionDetailsPage";

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
      {
        path: "/public-sessions/:sessionId",
        element: <PublicSessionDetailPage />,
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
        children: [
          {
            path: "",
            element: <MyProfileInfo />,
          },
          {
            path: "badges",
            element: <MyProfileBadges />
          },
          {
            path: "sessions",
            element: <MyProfileSession />
          }
        ]
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
        path: "/sessions/:sessionId",
        element: <SesionsDetailsPage />,
      },
      {
        path: "/projects/:id/sessions/:sessionId",
        element: <OwnerSessionDetailsPage />,
      },
      {
        path: "/profile/:id",
        element: <PublicProfile />,
      },
      {
        path: "/profile/:id/session/:sessionId", 
        element: <PublicProfile />,
      },
    ],
  },
]);

export default router;
