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
    const [searched, setSearched] = useState(false);

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    });

    const currentUserPayments = payments.filter(payment => payment.email === user.email);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setSearched(false);
            return;
        }
        const filteredPayments = currentUserPayments.filter(payment =>
            payment.month.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredPayments);
        setSearched(true);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearched(false);
        setSearchResults([]);
    };

    const displayedPayments = searched ? searchResults : currentUserPayments;
    const totalAmount = displayedPayments.reduce((sum, payment) => sum + payment.amount, 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
            <Helmet>
                <title>ResidencePro | Payment History</title>
            </Helmet>
            
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                        Payment History
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Welcome back, <span className="text-blue-600 dark:text-blue-400 font-medium">{user.displayName}</span>
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Total Payments</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{displayedPayments.length}</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Total Amount</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">${totalAmount.toFixed(2)}</p>
                            </div>
                            <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Latest Payment</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                    {currentUserPayments.length > 0 ? currentUserPayments[0].month : 'N/A'}
                                </p>
                            </div>
                            <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 mb-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search by month (e.g., January, February...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 pl-10 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                        {searched && (
                            <button
                                onClick={handleClearSearch}
                                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear
                            </button>
                        )}
                    </div>
                    {searched && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                            Found {searchResults.length} payment{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Table Section */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    {displayedPayments.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-slate-700 dark:text-slate-400 text-lg mb-2">No payments found</p>
                            <p className="text-slate-500 dark:text-slate-500 text-sm">
                                {searched ? 'Try adjusting your search criteria' : 'Your payment history will appear here'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Month
                                        </th>
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Payment ID
                                        </th>
                                        <th className="text-center p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {displayedPayments.map((payment, index) => (
                                        <tr key={payment._id} className="hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-150">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg">
                                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-slate-900 dark:text-slate-100 font-medium">{payment.month}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-emerald-600 dark:text-emerald-500 font-semibold text-lg">
                                                    ${payment.amount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                                                    {payment.paymentMethodId}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 rounded-full text-xs font-medium">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Completed
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                {displayedPayments.length > 0 && (
                    <div className="mt-6 text-center text-slate-600 dark:text-slate-400 text-sm">
                        Showing {displayedPayments.length} of {currentUserPayments.length} total payment{currentUserPayments.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;