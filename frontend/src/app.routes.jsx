import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Home from "./features/interview/pages/Home.jsx"
import Interview from "./features/interview/pages/Interview.jsx"
import Protected from "./features/auth/components/Protected.jsx"
import MainLayout from "./features/auth/components/MainLayout.jsx"

export const router= createBrowserRouter([
    {
        element:<MainLayout/>,
        children:[
          {
            path:"/",
            element: <Protected><Home/></Protected>
          },
          {
            path:"/interview/:interviewId",
            element:<Protected><Interview/></Protected>
          }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },

])