import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet, useLocation } from 'react-router-dom'

const Root = () => {
    const location = useLocation();
    const ifLoginPage = location.pathname.includes('sign-in')
    const ifSignUpPage = location.pathname.includes('sign-up')
    return (
        <div>
             {(ifLoginPage || ifSignUpPage) || <NavBar></NavBar>}
            <Outlet></Outlet>
            {(ifLoginPage || ifSignUpPage) || <Footer></Footer>}
        </div>
    );
};

export default Root;