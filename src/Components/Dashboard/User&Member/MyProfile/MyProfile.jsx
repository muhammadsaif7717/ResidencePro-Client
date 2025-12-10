import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useMember from "../../../../Hooks/useMember";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
    const { user } = useAuth();
    const [isMember, isMemberLoading] = useMember();
    const axiosPublic = useAxiosPublic();

    const { data: users = [], isUsersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    const currentUser = users.find(userDb => userDb.email === user.email);

    if (isMemberLoading || isUsersLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
            case 'member':
                return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
            default:
                return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | My Profile</title>
            </Helmet>
            
            <div className="max-w-5xl mx-auto">
                {/* Welcome Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                        Welcome back, 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
                            {' '}{currentUser?.name || user.displayName}
                        </span>!
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage your profile and view your residence information
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
                            <div className="relative inline-block mb-6">
                                <img 
                                    src={currentUser?.profileImage || user.photoURL} 
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-xl"
                                />
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"></div>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                                {currentUser?.name || user.displayName}
                            </h2>
                            
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 break-all">
                                {currentUser?.email || user.email}
                            </p>

                            <div className="flex justify-center mb-6">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getRoleBadgeColor(currentUser?.role)}`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
                                </span>
                            </div>

                            {isMember && (
                                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Active Member
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Information Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                    Contact Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Full Name</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                                        {currentUser?.name || user.displayName}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Email Address</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium break-all">
                                        {currentUser?.email || user.email}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Account Type</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                                        {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Residence Information - Only for Members */}
                        {isMember && currentUser?.agreement && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                        Residence Details
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Floor Number</p>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-slate-900 dark:text-slate-100 font-semibold text-lg">
                                                {currentUser.agreement.floorNo}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Block Name</p>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <p className="text-slate-900 dark:text-slate-100 font-semibold text-lg">
                                                {currentUser.agreement.blockName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Apartment Number</p>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <p className="text-slate-900 dark:text-slate-100 font-semibold text-lg">
                                                {currentUser.agreement.apartmentNo}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-4 border-2 border-emerald-200 dark:border-emerald-700">
                                        <p className="text-emerald-700 dark:text-emerald-400 text-sm mb-1">Monthly Rent</p>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-emerald-900 dark:text-emerald-100 font-bold text-2xl">
                                                ${currentUser.agreement.rent}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center gap-3">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">Agreement Start Date</p>
                                            <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                {new Date(currentUser.agreement.acceptDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Non-Member Message */}
                        {!isMember && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-8 text-center">
                                <div className="bg-blue-100 dark:bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                                    No Active Residence
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    You don't have an active residence agreement yet. Browse available apartments to get started!
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/20">
                                    Browse Apartments
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;