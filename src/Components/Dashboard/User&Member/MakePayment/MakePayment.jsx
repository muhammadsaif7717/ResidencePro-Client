import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);

const MakePayment = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [coupon, setCoupon] = useState('');
    const [discountedRent, setDiscountedRent] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const { data: users = [], isLoading: isUsersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    const { data: coupons = [], isLoading: isCouponsLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        }
    });

    const currentUser = users.find(userDb => userDb.email === user.email);
    const initialRent = currentUser ? currentUser.agreement.rent : 0;

    const applyCoupon = () => {
        const couponData = coupons.find(c => c.code === coupon);
        if (couponData) {
            const discount = (initialRent * couponData.discount) / 100;
            setDiscountedRent(initialRent - discount);
            setAppliedCoupon(couponData);
            toast.success(`Coupon applied! ${couponData.discount}% discount`);
        } else {
            toast.error("Invalid coupon code!");
        }
    };

    const removeCoupon = () => {
        setCoupon('');
        setDiscountedRent(null);
        setAppliedCoupon(null);
        toast.info("Coupon removed");
    };

    if (isUsersLoading || isCouponsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading payment details...</p>
                </div>
            </div>
        );
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const finalAmount = discountedRent !== null ? discountedRent : initialRent;
    const savings = discountedRent !== null ? initialRent - discountedRent : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Make Payment</title>
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                        Make Payment
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Complete your monthly rent payment securely with Stripe
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Payment Summary - Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Residence Details */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                    Residence Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Email</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium break-all">
                                        {currentUser.email}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Floor</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                                        {currentUser.agreement.floorNo}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Block</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                                        {currentUser.agreement.blockName}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Apartment</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                                        {currentUser.agreement.apartmentNo}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Month Selection */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                    Payment Period
                                </h2>
                            </div>

                            <div className="relative">
                                <select 
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 pr-10 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    value={selectedMonth} 
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="" disabled>Select payment month</option>
                                    {months.map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                                <svg className="w-5 h-5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                    Apply Discount Coupon
                                </h2>
                            </div>

                            {appliedCoupon ? (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border-2 border-emerald-200 dark:border-emerald-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-emerald-900 dark:text-emerald-100 font-bold">
                                                    {appliedCoupon.code}
                                                </p>
                                                <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                                                    {appliedCoupon.discount}% discount applied
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={removeCoupon}
                                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/10 transition-all"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                                        placeholder="Enter coupon code"
                                        className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        onClick={applyCoupon}
                                        disabled={!coupon.trim()}
                                        className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-emerald-500/20"
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Payment Form */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm 
                                currentUser={currentUser} 
                                discountedRent={finalAmount} 
                                selectedMonth={selectedMonth}
                            />
                        </Elements>
                    </div>

                    {/* Payment Summary Sidebar - Right Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sticky top-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                                Payment Summary
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-slate-600 dark:text-slate-400">Original Rent</span>
                                    <span className="text-slate-900 dark:text-slate-100 font-semibold">
                                        ${initialRent.toFixed(2)}
                                    </span>
                                </div>

                                {appliedCoupon && (
                                    <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                                        <span className="text-emerald-600 dark:text-emerald-400">
                                            Discount ({appliedCoupon.discount}%)
                                        </span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                            -${savings.toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold text-slate-900 dark:text-slate-50">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ${finalAmount.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {savings > 0 && (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 mb-6 border border-emerald-200 dark:border-emerald-700">
                                    <div className="flex items-center gap-2 mb-1">
                                        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-emerald-900 dark:text-emerald-100 font-semibold">
                                            You're saving ${savings.toFixed(2)}!
                                        </span>
                                    </div>
                                    <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                                        Coupon discount applied successfully
                                    </p>
                                </div>
                            )}

                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <div>
                                        <p className="text-blue-900 dark:text-blue-100 font-semibold text-sm mb-1">
                                            Secure Payment
                                        </p>
                                        <p className="text-blue-700 dark:text-blue-400 text-xs">
                                            Your payment is processed securely through Stripe
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default MakePayment;