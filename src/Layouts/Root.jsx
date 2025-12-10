import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Components/Root/NavBar/NavBar';
import Footer from '../Components/Root/Footer/Footer';

const Root = () => {
    const location = useLocation();
    const ifLoginPage = location.pathname.includes('sign-in')
    const ifSignUpPage = location.pathname.includes('sign-up')
    return (
        <div className='flex flex-col'>
            {(ifLoginPage || ifSignUpPage) || <NavBar></NavBar>}
            <Outlet></Outlet>
            {(ifLoginPage || ifSignUpPage) || <Footer></Footer>}
        </div>
    );
};

export default Root;