import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ currentUser, discountedRent, selectedMonth }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedMonth) {
            toast.error("Please select a payment month!");
            return;
        }

        if (!stripe || !elements) {
            toast.error("Payment system is loading, please wait...");
            return;
        }

        if (!cardComplete) {
            toast.error("Please complete your card information!");
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: currentUser.email,
                name: currentUser.name,
            },
        });

        if (error) {
            console.error(error);
            toast.error(error.message || "Card validation failed!");
            setIsProcessing(false);
            return;
        }

        try {
            const paymentData = {
                amount: discountedRent,
                paymentMethodId: paymentMethod.id,
                email: currentUser.email,
                name: currentUser.name,
                floor: currentUser.agreement.floorNo,
                block: currentUser.agreement.blockName,
                apartmentNo: currentUser.agreement.apartmentNo,
                month: selectedMonth
            };

            const response = await axiosPublic.post('/payments', paymentData);

            if (response.data.insertedId) {
                setPaymentSuccessful(true);
                
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment Successful!",
                    html: `
                        <p class="text-slate-600 dark:text-slate-400 mt-2">
                            Your payment of <strong>$${discountedRent.toFixed(2)}</strong> for ${selectedMonth} has been processed.
                        </p>
                    `,
                    showConfirmButton: true,
                    confirmButtonText: "View History",
                    confirmButtonColor: "#10B981",
                    timer: 3000
                });

                setTimeout(() => {
                    navigate(`/dashboard/payment-history`);
                }, 3000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Payment Failed",
                    text: "Unable to process your payment. Please try again.",
                    confirmButtonColor: "#EF4444"
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error("Payment processing failed. Please try again.");
            
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error.response?.data?.message || "An unexpected error occurred. Please try again.",
                confirmButtonColor: "#EF4444"
            });
        }

        setIsProcessing(false);
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#0F172A',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: '#94A3B8',
                },
                iconColor: '#3B82F6',
            },
            invalid: {
                color: '#EF4444',
                iconColor: '#EF4444',
            },
            complete: {
                color: '#10B981',
                iconColor: '#10B981',
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        Payment Details
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Enter your card information securely
                    </p>
                </div>
            </div>

            <div onSubmit={handleSubmit}>
                {/* Card Element Container */}
                <div className="mb-6">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-3 text-sm">
                        Card Information
                    </label>
                    <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg p-4 transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                        <CardElement
                            options={cardElementOptions}
                            onChange={(e) => setCardComplete(e.complete)}
                        />
                    </div>
                    
                    {/* Card Info Helper */}
                    <div className="mt-3 flex items-start gap-2 text-slate-500 dark:text-slate-400 text-xs">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            Your card information is encrypted and secure. We use Stripe for payment processing.
                        </span>
                    </div>
                </div>

                {/* Payment Summary Alert */}
                {selectedMonth && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-blue-900 dark:text-blue-100 font-semibold text-sm mb-1">
                                    Payment for {selectedMonth}
                                </p>
                                <p className="text-blue-700 dark:text-blue-400 text-sm">
                                    Amount: <strong>${discountedRent.toFixed(2)}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {!selectedMonth && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6 border border-amber-200 dark:border-amber-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-amber-800 dark:text-amber-200 text-sm">
                                Please select a payment month before proceeding.
                            </p>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!stripe || !selectedMonth || isProcessing || paymentSuccessful || !cardComplete}
                    className={`
                        w-full py-4 px-6 rounded-lg font-semibold text-white text-lg
                        transition-all duration-200 shadow-lg
                        flex items-center justify-center gap-3
                        ${(!stripe || !selectedMonth || isProcessing || paymentSuccessful || !cardComplete)
                            ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/50'
                        }
                    `}
                >
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Processing Payment...</span>
                        </>
                    ) : paymentSuccessful ? (
                        <>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Payment Successful!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Complete Payment - ${discountedRent.toFixed(2)}</span>
                        </>
                    )}
                </button>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="font-medium">256-bit SSL Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="font-medium">PCI Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Powered by Stripe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;