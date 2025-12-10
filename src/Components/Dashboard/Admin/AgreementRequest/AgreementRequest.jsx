import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AgreementRequest = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: agreements = [], refetch, isLoading } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/agreements');
            return res.data;
        }
    });

    const handleAccept = async (agreement) => {
        const userAgreement = {
            floorNo: agreement.floorNo,
            blockName: agreement.blockName,
            apartmentNo: agreement.apartmentNo,
            rent: agreement.rent,
            acceptDate: new Date(),
        };

        Swal.fire({
            title: "Accept Agreement Request?",
            html: `
                <div class="text-left mt-4">
                    <p class="mb-2"><strong>User:</strong> ${agreement.userName}</p>
                    <p class="mb-2"><strong>Apartment:</strong> ${agreement.blockName}-${agreement.apartmentNo}</p>
                    <p><strong>Rent:</strong> $${agreement.rent}/month</p>
                </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10B981",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, Accept",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`agreements/${agreement._id}/accept`, userAgreement)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire({
                                title: "Request Accepted!",
                                text: "The agreement has been approved successfully.",
                                icon: "success",
                                confirmButtonColor: "#10B981"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to accept the request. Please try again.",
                            icon: "error",
                            confirmButtonColor: "#EF4444"
                        });
                    });
            }
        });
    };

    const handleReject = async (agreement) => {
        Swal.fire({
            title: "Reject Agreement Request?",
            html: `
                <div class="text-left mt-4">
                    <p class="mb-2"><strong>User:</strong> ${agreement.userName}</p>
                    <p class="mb-2"><strong>Apartment:</strong> ${agreement.blockName}-${agreement.apartmentNo}</p>
                    <p class="text-red-600 mt-4">This action cannot be undone.</p>
                </div>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, Reject",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`agreements/${agreement._id}/reject`)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire({
                                title: "Request Rejected",
                                text: "The agreement request has been declined.",
                                icon: "success",
                                confirmButtonColor: "#10B981"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to reject the request. Please try again.",
                            icon: "error",
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
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Agreement Requests</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                                Agreement Requests
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Review and manage pending apartment rental agreements
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 px-6 py-3">
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Pending Requests</p>
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {agreements.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {agreements.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
                        <div className="bg-slate-100 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            No Pending Requests
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            All agreement requests have been processed. New requests will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {agreements.map(agreement => (
                            <div
                                key={agreement._id}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                                                {agreement.userName}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                {agreement.userEmail}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold">
                                            Pending
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Floor</p>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    {agreement.floorNo}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Block</p>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    {agreement.blockName}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Apartment</p>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    {agreement.apartmentNo}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-700">
                                            <p className="text-emerald-700 dark:text-emerald-400 text-xs mb-1">Monthly Rent</p>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-emerald-900 dark:text-emerald-100 font-bold text-lg">
                                                    ${agreement.rent}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Request Date */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-6 border border-blue-200 dark:border-blue-700">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="text-blue-600 dark:text-blue-400 text-xs">Request Date</p>
                                                <p className="text-blue-900 dark:text-blue-100 font-semibold text-sm">
                                                    {new Date(agreement.date).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleAccept(agreement)}
                                            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(agreement)}
                                            className="flex-1 bg-slate-200 hover:bg-red-500 dark:bg-slate-700 dark:hover:bg-red-600 text-slate-700 hover:text-white dark:text-slate-300 dark:hover:text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgreementRequest;