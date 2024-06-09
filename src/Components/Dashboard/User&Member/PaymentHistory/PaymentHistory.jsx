import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from '../../../../Hooks/useAuth';

const PaymentHistory = () => {
    const {user}=useAuth();
    const axiosPublic = useAxiosPublic();
    const [searchQuery, setSearchQuery] = useState('');

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    });

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPayments = payments.filter(payment => 
        payment.month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">{user.displayName}{`'`}s Payment History</h2>
            <input
                type="text"
                placeholder="Search by month"
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Amount</th>
                            <th className="border border-gray-300 p-2">Payment Id</th>
                            <th className="border border-gray-300 p-2">Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">${payment.amount}</td>
                                <td className="border border-gray-300 p-2">{payment.paymentMethodId}</td>
                                <td className="border border-gray-300 p-2">{payment.month}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
