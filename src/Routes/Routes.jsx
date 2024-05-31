
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Dashboard from "../Layouts/Dashboard";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/sign-in",
                element: <SignIn></SignIn>,
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                
            }
        ]
    }
]);


export default router;