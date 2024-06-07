import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch, trigger, reset } = useForm();
    // const [imageURL, setImageURL] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { createNewUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();



    const password = watch("password");

    useEffect(() => {
        if (password) {
            trigger("password");
        }
    }, [password, trigger]);

    const onSubmit = async (data) => {
        // console.log(data);
        //upload image to imbb and get aurl
        const imageFile = { image: data.image[0] };
        // console.log(imageFile)

        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // user info
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const profileImage = res.data.data.display_url;

        createNewUser(email, password)
            .then(res => {
                // console.log('New User', res.user)
                if (res.user) {

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // if not existing user post to database
                    const newUser = {
                        name: name,
                        email: email,
                        profileImage: profileImage,
                        role: 'member',
                    }
                    axiosPublic.post('/users', newUser)

                    // then reset form
                    reset();
                    setTimeout(() => {
                        navigate(location?.state?.from || '/');
                    }, 1700);
                }
                //then update profile
                updateUserProfile(name, profileImage)
                    .then(() => {
                        // console.log('User Profile Updated')
                    })
            })
    };

    // const handleImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const img = e.target.files[0];
    //         setImageURL(URL.createObjectURL(img));
    //     }
    // };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 sign-up-container">
                <div className="hero-content flex justify-center items-center w-full">
                    <div className="card p-5 w-full max-w-sm shadow-2xl bg-base-100">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body p-0 gap-0 w-full"
                        >
                            <h1 className="text-3xl lg:text-5xl font-bold text-center">
                                Sign Up now!
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex items-center justify-end">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters long",
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "Password must not exceed 20 characters",
                                            },
                                            validate: {
                                                hasUpperCase: (value) =>
                                                    /[A-Z]/.test(value) ||
                                                    "Password must include at least one uppercase letter",
                                                hasLowerCase: (value) =>
                                                    /[a-z]/.test(value) ||
                                                    "Password must include at least one lowercase letter",
                                                hasNumber: (value) =>
                                                    /\d/.test(value) ||
                                                    "Password must include at least one number",
                                                hasSpecialChar: (value) =>
                                                    /[@$!%*?&]/.test(value) ||
                                                    "Password must include at least one special character",
                                            },
                                        })}
                                        placeholder="Password"
                                        className="input input-bordered w-full"
                                    />
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute mr-5"
                                    >
                                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                                    </div>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                <input
                                    type="file"
                                    {...register("image", { required: "Image is required" })}
                                    // onChange={handleImageChange}
                                    className="file-input file-input-bordered w-full "
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                {/* {
                                    imageURL &&
                                    <div className="mt-4"><img src={imageURL} alt="Selected" className="max-w-full h-auto" />
                                    </div>
                                } */}
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    type="submit"
                                    value="Sign Up"
                                    className="btn btn-primary"
                                />
                            </div>
                        </form>
                        <div>
                            <SocialLogin></SocialLogin>
                        </div>
                        <div className="flex justify-center w-full mt-4">
                            <span>
                                Already have an account?{" "}
                                <Link to="/sign-in" className="text-blue-600">
                                    Sign In
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
