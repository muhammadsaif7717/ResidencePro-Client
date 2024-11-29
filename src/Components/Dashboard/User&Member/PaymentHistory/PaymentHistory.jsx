import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from '../../../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false); // State to track if search has been performed

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    });

    const currentUserPayments = payments.filter(payment => payment.email === user.email);

    const handleSearch = () => {
        const filteredPayments = currentUserPayments.filter(payment =>
            payment.month.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredPayments);
        setSearched(true); // Set searched to true after performing search
    };

    return (
        <div className="container mx-auto p-4 mt-4">
            <Helmet>
                <title>ResidencePro | Payment History</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-4">{user.displayName}{`'`}s Payment History</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search by Month Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>
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
                        {(searched ? searchResults : currentUserPayments).map(payment => ( // Display searchResults if search has been performed
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
