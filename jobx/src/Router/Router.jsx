import {createBrowserRouter,} from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import SalaryPage from "../Pages/SalaryPage";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
          {
              path: "/",
              element: <Home/>
          },
          {
            path: "/salary",
            element: <SalaryPage/>
        },
        {
          path: "/post-job",
          element: <CreateJob/>
        },
        {
          path: "/my-job",
          element: <MyJobs/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/sign-up",
          element: <Signup/>
        },
        ]
    }
  ]);

  export default router;