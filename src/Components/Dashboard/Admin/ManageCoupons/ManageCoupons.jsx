import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageCoupons = () => {
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const code = form.code.value.toUpperCase();
        const discount = form.discount.value;
        const description = form.description.value;

        const coupon = {
            code: code,
            discount: parseFloat(discount),
            description: description,
            availability: "available",
        };

        try {
            const res = await axiosPublic.post('/coupons', coupon);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coupon Created!",
                    text: "The coupon has been added successfully.",
                    showConfirmButton: true,
                    confirmButtonColor: "#10B981"
                });
                form.reset();
                setIsModalOpen(false);
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Create Coupon",
                text: "An error occurred. Please try again.",
                confirmButtonColor: "#EF4444"
            });
        }
    };

    const handleChange = (coupon) => {
        const newStatus = coupon.availability === "available" ? "unavailable" : "available";
        
        Swal.fire({
            title: `${newStatus === "available" ? "Enable" : "Disable"} Coupon?`,
            html: `
                <div class="text-left mt-4">
                    <p class="mb-2"><strong>Code:</strong> ${coupon.code}</p>
                    <p class="mb-2"><strong>Discount:</strong> ${coupon.discount}%</p>
                    <p class="text-slate-600 mt-4">This will ${newStatus === "available" ? "activate" : "deactivate"} the coupon.</p>
                </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: newStatus === "available" ? "#10B981" : "#F59E0B",
            cancelButtonColor: "#64748B",
            confirmButtonText: `Yes, ${newStatus === "available" ? "Enable" : "Disable"}`,
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.put(`/coupons/${coupon._id}`)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Coupon Updated!',
                                text: `Coupon is now ${newStatus}.`,
                                confirmButtonColor: "#10B981"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.error('Error updating availability:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Update Failed',
                            text: 'Something went wrong. Please try again.',
                            confirmButtonColor: "#EF4444"
                        });
                    });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading coupons...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Manage Coupons</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            Manage Coupons
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Create and manage discount coupons for residents
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Coupon
                    </button>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Total Coupons</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{coupons.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Active</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
                                    {coupons.filter(c => c.availability === "available").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-amber-100 dark:bg-amber-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Inactive</p>
                                <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                                    {coupons.filter(c => c.availability === "unavailable").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coupons Table/Cards */}
                {coupons.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
                        <div className="bg-slate-100 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">No Coupons Yet</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Create your first discount coupon to get started.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Add Your First Coupon
                        </button>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Coupon Code
                                        </th>
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Discount
                                        </th>
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="text-center p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="text-center p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {coupons.map(coupon => (
                                        <tr key={coupon._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg">
                                                        <span className="text-blue-700 dark:text-blue-400 font-bold font-mono text-sm">
                                                            {coupon.code}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                                                    {coupon.discount}%
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-slate-700 dark:text-slate-300 text-sm max-w-md">
                                                    {coupon.description}
                                                </p>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <span className={`
                                                        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                                        ${coupon.availability === "available" 
                                                            ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
                                                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400"
                                                        }
                                                    `}>
                                                        <div className={`w-2 h-2 rounded-full ${coupon.availability === "available" ? "bg-emerald-500" : "bg-slate-400"}`}></div>
                                                        {coupon.availability === "available" ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handleChange(coupon)}
                                                        className={`
                                                            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                                                            ${coupon.availability === "available"
                                                                ? "bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                                                                : "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                                                            }
                                                        `}
                                                    >
                                                        {coupon.availability === "available" ? "Disable" : "Enable"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                        Create New Coupon
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Coupon Code
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    maxLength={20}
                                    placeholder="e.g., SUMMER25"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase font-mono"
                                    required
                                />
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 ml-1">
                                    Will be converted to uppercase automatically
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Discount Percentage
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="discount"
                                        min="1"
                                        max="100"
                                        placeholder="10"
                                        className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 pr-12 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold">
                                        %
                                    </span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 ml-1">
                                    Enter a value between 1 and 100
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    maxLength={200}
                                    placeholder="Describe when and how this coupon can be used..."
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    required
                                />
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 ml-1">
                                    Provide details about the coupon terms and conditions
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-[2] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Create Coupon
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;