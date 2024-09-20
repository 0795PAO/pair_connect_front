
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    // children: [
    //   {
    //     path: '/',
    //     element: <Navigate to='/login' />
    //   },
    //   {
    //     path: "/login",
    //     element: <Login />,
    //   },
    //   {
    //     path: "/register",
    //     element: <SignUp />
    //   },
    // ],
  },
  { 

      element: <ProtectedLayout />,
      // children: [
      //     {
      //         path: "/home",
      //         element: <HomePage />
      //     },
      //     {
      //         path: "/destinations",
      //         element: <DestinationPage />
      //     },


      // ],
  }


]);

export default router