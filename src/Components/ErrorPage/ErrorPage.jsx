import { Link } from "react-router-dom";
import errorImg from '../../assets/images/404.jpg'

const ErrorPage = () => {
    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="text-center space-y-3">
                <img src={errorImg} className="w-1/2 mx-auto" />
                <Link to="/">
                    <button className="btn btn-ghost scale-125 text-white bg-orange-500">Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;