import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth';
import useAdmin from '../../../../Hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const AdminProfile = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [stats, setStats] = useState({
        totalRooms: 0,
        availablePercentage: 0,
        unavailablePercentage: 0,
        totalUsers: 0,
        totalMembers: 0,
    });
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    const { data: users = [], isLoading: isUsersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    const adminInfo = users.find(userDb => userDb.email === user.email) || {};

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    roomsResponse,
                    availableResponse,
                    unavailableResponse,
                    usersResponse,
                    membersResponse
                ] = await Promise.all([
                    axiosPublic.get('/stats/rooms/count'),
                    axiosPublic.get('/stats/rooms/available-percentage'),
                    axiosPublic.get('/stats/rooms/unavailable-percentage'),
                    axiosPublic.get('/stats/users/count'),
                    axiosPublic.get('/stats/members/count')
                ]);

                setStats({
                    totalRooms: roomsResponse.data.totalRooms,
                    availablePercentage: availableResponse.data.availablePercentage,
                    unavailablePercentage: unavailableResponse.data.unavailablePercentage,
                    totalUsers: usersResponse.data.totalUsers,
                    totalMembers: membersResponse.data.totalMembers,
                });
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchStats();
    }, [axiosPublic]);

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-200 dark:border-red-700 p-8 text-center max-w-md">
                    <div className="bg-red-100 dark:bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Access Denied</h2>
                    <p className="text-slate-600 dark:text-slate-400">You are not authorized to view this page.</p>
                </div>
            </div>
        );
    }

    if (isUsersLoading || isLoadingStats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const availableRooms = Math.round((stats.availablePercentage / 100) * stats.totalRooms);
    const unavailableRooms = stats.totalRooms - availableRooms;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Admin Home</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Welcome back! Here's an overview of your property management system.
                    </p>
                </div>

                {/* Admin Profile Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img 
                                src={adminInfo.profileImage || user.photoURL} 
                                alt="Admin Profile" 
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
                            />
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                    {adminInfo.name || user.displayName}
                                </h2>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 rounded-full text-xs font-semibold flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Administrator
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-3">
                                {adminInfo.email || user.email}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">Online - Active Session</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Total Rooms */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                            Total Rooms
                        </h3>
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            {stats.totalRooms}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">
                            Available: {availableRooms} • Occupied: {unavailableRooms}
                        </p>
                    </div>

                    {/* Available Rooms */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                            Available Rooms
                        </h3>
                        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">
                            {stats.availablePercentage.toFixed(1)}%
                        </p>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${stats.availablePercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Unavailable Rooms */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-amber-100 dark:bg-amber-500/10 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                            Occupied Rooms
                        </h3>
                        <p className="text-3xl font-bold text-amber-600 dark:text-amber-500 mb-2">
                            {stats.unavailablePercentage.toFixed(1)}%
                        </p>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div 
                                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${stats.unavailablePercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Total Users */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                            Total Users
                        </h3>
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            {stats.totalUsers}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">
                            All registered users in the system
                        </p>
                    </div>

                    {/* Total Members */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-cyan-100 dark:bg-cyan-500/10 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                            Active Members
                        </h3>
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            {stats.totalMembers}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">
                            Users with active agreements
                        </p>
                    </div>

                    {/* Occupancy Rate */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-blue-900 dark:text-blue-100 text-sm font-medium mb-1">
                            Occupancy Rate
                        </h3>
                        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                            {stats.unavailablePercentage.toFixed(1)}%
                        </p>
                        <p className="text-blue-700 dark:text-blue-400 text-xs">
                            {unavailableRooms} out of {stats.totalRooms} rooms occupied
                        </p>
                    </div>
                </div>

                {/* Quick Stats Summary */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                        System Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Member Conversion</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                        {((stats.totalMembers / stats.totalUsers) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Revenue Units</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                        {unavailableRooms} Rooms
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">System Health</p>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Excellent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;