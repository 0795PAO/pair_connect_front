import ProtectedRoute from "@/layout/ProtectedRoute";
import PublicRoute from "@/layout/PublicRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
    /*{
  
      element: <PublicRoute />,
      children: [
        {
          path: '/',
          element: <Navigate to='/login' />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SignUp />
        },
      ],
    },*/
    /*{
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/destinations",
                element: <DestinationPage />
            },


        ],
    }*/


]);

export default router