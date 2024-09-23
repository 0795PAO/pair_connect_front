
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import App  from '../App'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <App />
      },
    ],
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