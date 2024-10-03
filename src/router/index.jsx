
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
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectFormPage from "@/pages/ProjectFormPage";
// import MyProfileFormPage from "@/pages/MyProfileFormPage";
import MyProfileInfo from "@/components/profile/MyProfileInfo";
import MyProfileSession from "@/components/profile/MyProfileSession";
import MyProfileBadges from "@/components/profile/MyProfileBadges";

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
      },
      {
        path: '/activate/:uid/:token',
        element: <ActivationPage/>
      }
    ],
  },
  { 
    element: <ProtectedLayout />,
    children: [
      {
        path: '/projects',
        element: <ProjectsPage/>
      }, 
      {
        path: '/my-profile',
        element: <MyProfilePage/>,
        children: [
          
        {
          path: '/my-profile',
          element: <MyProfileInfo />

        },
        {
          path: '/my-profile/sessions',
          element: <MyProfileSession />
        },
        {
          path: '/my-profile/badges',
          element: <MyProfileBadges />
        }
      
      
      ]

      },
      // {
      //   path: '/my-profile/edit',
      //   element: <MyProfileFormPage/>
      // },
      {
        path: '/projects/create',
        element: <ProjectFormPage />,
      },
      {
        path: '/projects/:id',
        element: <ProjectDetails />,
      },
    ]
  }
]);

export default router

