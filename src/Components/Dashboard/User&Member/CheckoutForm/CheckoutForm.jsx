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
    const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !selectedMonth) {
            toast.error("Please select a month!")
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: currentUser.email,
            },
        });

        if (error) {
            console.error(error);
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
            }
            const response = await axiosPublic.post('/payments', paymentData);

            if (response.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setPaymentSuccessfull(true)
                setTimeout(() => {
                    navigate(`/dashboard/payment-history`)
                }, 2000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Payment failed!",
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
        }

        setIsProcessing(false);
    };

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-success text-white mt-5 font-semibold" type="submit" disabled={!stripe || paymentSuccessfull}>
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
