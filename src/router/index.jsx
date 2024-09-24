
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import AboutUsPage from "@/pages/AboutUsPage";
import PairProgrammingPage from "@/pages/PairProgrammingPage";
import ProjectsPage from "@/pages/ProjectsPage";
import HomePageWrapper from "@/wrappers/HomePageWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePageWrapper />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: '/about-us',
        element: <AboutUsPage />
      }, 
      {
        path: '/pair-programming',
        element: <PairProgrammingPage />
      }
    ],
  },
  { 
    element: <ProtectedLayout />,
    children: [
      {
        path: '/projects',
        element: <ProjectsPage/>
      }
    ]
  }
]);

export default router;

