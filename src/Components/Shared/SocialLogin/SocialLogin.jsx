import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";



const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Sign In Successfull with Google",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // if not existing user post to database
                    const newUser = {
                        name: res.user.displayName,
                        email: res.user.email,
                        profileImage: res.user.photoURL,
                        role: 'user',
                    }
                    axiosPublic.post('/users', newUser)

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