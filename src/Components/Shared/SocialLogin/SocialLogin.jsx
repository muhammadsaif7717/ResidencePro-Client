import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";



const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Sign In Successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // navigate
                    setTimeout(() => {
                        navigate(location?.state?.from || '/');
                    }, 1700);
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.log(err.message)
            })

    }
    return (
        <div>
            <div className="divider py-0 my-0 mt-4">OR</div>
            <div className='mt-4 '>
                <button onClick={handleGoogleLogin} className="btn w-full border-blue-500 text-xl text-blue-500">
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;