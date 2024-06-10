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
            toast.success("Coupone Added Successfully!");
        } else {
            toast.error("Invallid Coupone!");
        }
    };

    if (isUsersLoading || isCouponsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className='mt-7'>
             <Helmet>
                <title>ResidencePro | Make Payment</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-4">Make Your Payment</h2>
            <div className='card-body border shadow-lg rounded-lg'>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Floor:</strong> {currentUser.agreement.floorNo}</p>
                <p><strong>Block:</strong> {currentUser.agreement.blockName}</p>
                <p><strong>Apartment:</strong> {currentUser.agreement.apartmentNo}</p>
                <p><strong>Rent:</strong> ${discountedRent !== null ? discountedRent : initialRent}</p>
                <p>
                    <strong>Month:</strong>
                    <select className='border ml-2 p-1 rounded-lg outline-none' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="" disabled>Select Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </p>
                <p>
                    <strong>Coupon:</strong> <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} className='border rounded-lg p-1' />
                </p>
                <button className='bg-blue-400 rounded-lg text-white p-1 font-semibold w-36' onClick={applyCoupon}>Apply Coupon</button>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm currentUser={currentUser} discountedRent={discountedRent !== null ? discountedRent : initialRent} selectedMonth={selectedMonth}></CheckoutForm>
            </Elements>

            <ToastContainer />
        </div>
    );
};

export default MakePayment;
