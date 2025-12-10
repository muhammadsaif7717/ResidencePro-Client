import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { FaEyeSlash, FaRegEye, FaUser, FaEnvelope, FaLock, FaImage, FaCheck, FaTimes } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import Swal from "sweetalert2";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch, trigger, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const { createNewUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const password = watch("password");
    const imageFile = watch("image");

    useEffect(() => {
        if (password) {
            trigger("password");
        }
    }, [password, trigger]);

    useEffect(() => {
        if (imageFile && imageFile[0]) {
            setImagePreview(URL.createObjectURL(imageFile[0]));
        }
    }, [imageFile]);

    const passwordRequirements = [
        { label: "At least 6 characters", test: (val) => val?.length >= 6 },
        { label: "One uppercase letter", test: (val) => /[A-Z]/.test(val) },
        { label: "One lowercase letter", test: (val) => /[a-z]/.test(val) },
        { label: "One number", test: (val) => /\d/.test(val) },
        { label: "One special character", test: (val) => /[@$!%*?&]/.test(val) },
    ];

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // Upload image to imgbb
            const imageFile = { image: data.image[0] };
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const name = data.name;
            const email = data.email;
            const password = data.password;
            const profileImage = res.data.data.display_url;

            // Create user
            const userRes = await createNewUser(email, password);
            
            if (userRes.user) {
                // Update profile
                await updateUserProfile(name, profileImage);

                // Save to database
                const newUser = {
                    name: name,
                    email: email,
                    profileImage: profileImage,
                    role: 'user',
                };
                await axiosPublic.post('/users', newUser);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Account Created!",
                    text: "Welcome to ResidencePro",
                    showConfirmButton: false,
                    timer: 1500
                });

                reset();
                setTimeout(() => {
                    navigate(location?.state?.from || '/');
                }, 1700);
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Sign Up Failed",
                text: err.message || "Something went wrong. Please try again.",
                confirmButtonColor: "#3B82F6"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>ResidencePro | Sign Up</title>
            </Helmet>
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center px-4 py-12 transition-colors duration-500">
                <div className="w-full max-w-md">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <HiHome className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            ResidencePro
                        </span>
                    </Link>

                    {/* Sign Up Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
                            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-blue-100">Join ResidencePro today</p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register("name", { required: "Name is required" })}
                                            placeholder="Enter your full name"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            {...register("email", { 
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            placeholder="Enter your email"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
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
                                            placeholder="Create a strong password"
                                            className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        >
                                            {showPassword ? <FaRegEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    
                                    {/* Password Requirements */}
                                    {password && (
                                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-1">
                                            {passwordRequirements.map((req, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm">
                                                    {req.test(password) ? (
                                                        <FaCheck className="w-3 h-3 text-green-500" />
                                                    ) : (
                                                        <FaTimes className="w-3 h-3 text-red-500" />
                                                    )}
                                                    <span className={req.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                                                        {req.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Profile Image Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Profile Image
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register("image", { required: "Profile image is required" })}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                        >
                                            <FaImage className="text-gray-400" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {imageFile?.[0] ? imageFile[0].name : "Choose profile image"}
                                            </span>
                                        </label>
                                    </div>
                                    
                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="mt-3 flex justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                                            />
                                        </div>
                                    )}
                                    
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.image.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            {/* Social Login */}
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                            Or sign up with
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <SocialLogin />
                                </div>
                            </div>

                            {/* Sign In Link */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link 
                                        to="/sign-in" 
                                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        By signing up, you agree to our{' '}
                        <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;