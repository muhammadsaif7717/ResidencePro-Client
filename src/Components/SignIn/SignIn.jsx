import {  useEffect, useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import './SignIn.css'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



const SignIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const captchaInputRef = useRef(null);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const onSubmit = (data) => {
        console.log(data);

        // veryfy captcha
        const isValidCaptcha = validateCaptcha(data.captcha);
        if (!isValidCaptcha) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invallid Captcha!",
            });
            return;
        }

     

    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 signIn-container">
                <div className="hero-content flex justify-center items-center w-full">
                    <div className="card p-5 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0 gap-0 w-full">
                        <h1 className="text-3xl lg:text-5xl font-bold text-center">Sign In now!</h1>
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
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", { required: "Password is required" })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    type="text"
                                    ref={captchaInputRef}
                                    {...register("captcha", { required: "Captcha is required" })}
                                    placeholder="Type the Captcha"
                                    className="input input-bordered"
                                />
                                {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha.message}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </form>
                        <div>
                            {/* <SocialLogin></SocialLogin> */}
                        </div>
                        <div className='flex justify-center  w-full mt-4'>
                            <span>New to Bistro Boss? Please <Link to={`/sign-up`} className='text-blue-600'>Sign Up</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;