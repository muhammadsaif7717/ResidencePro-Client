
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Root/Home/Home";
import About from "../Components/Root/About/About";
import SignIn from "../Components/Root/SignIn/SignIn";
import SignUp from "../Components/Root/SignUp/SignUp";
import ErrorPage from "../Components/Shared/ErrorPage/ErrorPage";
import Apartment from "../Components/Root/Apartment/Apartment";
import Dashboard from "../Components/Dashboard/Dashboard";
import AdminProfile from "../Components/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageMembers from "../Components/Dashboard/Admin/ManageMembers/ManageMembers";
import AgreementRequest from "../Components/Dashboard/Admin/AgreementRequest/AgreementRequest";
import ManageCoupons from "../Components/Dashboard/Admin/ManageCoupons/ManageCoupons";
import MakeAnnouncement from "../Components/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import MyProfile from "../Components/Dashboard/User&Member/MyProfile/MyProfile";
import Announcements from "../Components/Dashboard/User&Member/Announcements/Announcements";
import AdminRoute from "./AdminRoute";
import MakePayment from "../Components/Dashboard/User&Member/MakePayment/MakePayment";
import PaymentHistory from "../Components/Dashboard/User&Member/PaymentHistory/PaymentHistory";
import PrivateRoute from "./PrivateRoute";



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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // routes for Admin
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'manage-members',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            {
                path: 'manage-announcement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },
            {
                path: 'agreement-requests',
                element: <AdminRoute><AgreementRequest></AgreementRequest></AdminRoute>
            },
            {
                path: 'manage-coupones',
                element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
            },
            // routes for user & member
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'make-payment',
                element: <MakePayment></MakePayment>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'announcements',
                element: <Announcements></Announcements>
            },
        ]
    }
]);


export default router;