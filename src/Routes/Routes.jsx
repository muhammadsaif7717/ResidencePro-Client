
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Dashboard from "../Layouts/Dashboard";
import Home from "../Components/Root/Home/Home";
import About from "../Components/Root/About/About";
import SignIn from "../Components/Root/SignIn/SignIn";
import SignUp from "../Components/Root/SignUp/SignUp";
import ErrorPage from "../Components/Shared/ErrorPage/ErrorPage";
import Apartment from "../Components/Root/Apartment/Apartment";



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
                path: "/apartment",
                element: <Apartment></Apartment>,
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
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                
            }
        ]
    }
]);


export default router;