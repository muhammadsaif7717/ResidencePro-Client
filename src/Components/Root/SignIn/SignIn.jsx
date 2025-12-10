import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';
import { FaEyeSlash, FaRegEye, FaLock, FaEnvelope } from 'react-icons/fa';
import { HiHome, HiShieldCheck } from 'react-icons/hi';

const SignIn = () => {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const captchaInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const onSubmit = async (data) => {
        // Verify captcha
        const isValidCaptcha = validateCaptcha(data.captcha);
        if (!isValidCaptcha) {
            Swal.fire({
                icon: "error",
                title: "Invalid Captcha",
                text: "Please enter the correct captcha code",
                confirmButtonColor: "#3B82F6"
            });
            return;
        }

        setIsLoading(true);

        // Login user
        const email = data.email;
        const password = data.password;
        
        try {
            const res = await loginUser(email, password);
            if (res.user) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Welcome Back!",
                    text: "You have successfully signed in",
                    showConfirmButton: false,
                    timer: 1500
                });

                reset();
                setTimeout(() => {
                    navigate(location?.state?.from || '/');
                }, 1700);
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Sign In Failed",
                text: "Invalid email or password",
                confirmButtonColor: "#3B82F6"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>ResidencePro | Sign In</title>
            </Helmet>
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center px-4 py-12 transition-colors duration-500">
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

                    {/* Sign In Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                            <p className="text-blue-100">Sign in to continue to your account</p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                                    message: "Password must be at least 6 characters"
                                                }
                                            })}
                                            placeholder="Enter your password"
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
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Captcha */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Security Verification
                                    </label>
                                    <div className="mb-3 flex justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border border-gray-300 dark:border-gray-600">
                                        <LoadCanvasTemplate />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <HiShieldCheck className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            ref={captchaInputRef}
                                            {...register("captcha", { required: "Captcha is required" })}
                                            placeholder="Type the captcha above"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500"
                                        />
                                    </div>
                                    {errors.captcha && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.captcha.message}
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
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        'Sign In'
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
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <SocialLogin />
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-600 dark:text-gray-400">
                                    New to ResidencePro?{' '}
                                    <Link 
                                        to="/sign-up" 
                                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Protected by reCAPTCHA and subject to the{' '}
                        <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignIn;