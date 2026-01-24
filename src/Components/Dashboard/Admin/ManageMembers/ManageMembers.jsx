import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageMembers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    const handleDemote = (user) => {
        Swal.fire({
            title: "Remove Member Status?",
            html: `
                <div class="text-left mt-4">
                    <p class="mb-2"><strong>User:</strong> ${user.name}</p>
                    <p class="mb-2"><strong>Email:</strong> ${user.email}</p>
                    <p class="text-red-600 mt-4">This will revoke their member privileges and apartment access.</p>
                </div>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, Remove",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${user.email}/demote`)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire({
                                title: "Member Status Removed!",
                                text: "User has been demoted successfully.",
                                icon: "success",
                                confirmButtonColor: "#10B981"
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to remove member status. Please try again.",
                            icon: "error",
                            confirmButtonColor: "#EF4444"
                        });
                    });
            }
        });
    };

    const filteredUsers = users
        .filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = filterRole === "all" || user.role === filterRole;
            return matchesSearch && matchesRole;
        });

    const roleStats = {
        admin: users.filter(u => u.role === 'admin').length,
        member: users.filter(u => u.role === 'member').length,
        user: users.filter(u => u.role === 'user').length,
    };

    const getRoleBadge = (role) => {
        const badges = {
            admin: {
                bg: 'bg-purple-100 dark:bg-purple-500/10',
                text: 'text-purple-700 dark:text-purple-400',
                icon: (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                )
            },
            member: {
                bg: 'bg-emerald-100 dark:bg-emerald-500/10',
                text: 'text-emerald-700 dark:text-emerald-400',
                icon: (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                )
            },
            user: {
                bg: 'bg-blue-100 dark:bg-blue-500/10',
                text: 'text-blue-700 dark:text-blue-400',
                icon: (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                )
            }
        };
        return badges[role] || badges.user;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Manage Members</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                        Manage Members
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        View and manage all registered users and their roles
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Total Users</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{users.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Admins</p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{roleStats.admin}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Members</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{roleStats.member}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Regular Users</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{roleStats.user}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 pl-10 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="relative">
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="w-full md:w-48 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 pr-10 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="user">User</option>
                            </select>
                            <svg className="w-5 h-5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {searchQuery && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} matching "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {filteredUsers.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="bg-slate-100 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">No Users Found</h3>
                            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider w-20">
                                            #
                                        </th>
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="text-center p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="text-center p-4 text-slate-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {filteredUsers.map((user, index) => {
                                        const badge = getRoleBadge(user.role);
                                        return (
                                            <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={user.profileImage}
                                                            alt={user.name}
                                                            className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                                                        />
                                                        <div>
                                                            <p className="text-slate-900 dark:text-slate-100 font-semibold">
                                                                {user.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-slate-700 dark:text-slate-300">
                                                        {user.email}
                                                    </p>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                                            {badge.icon}
                                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center">
                                                        {user.role === 'admin' ? (
                                                            <button
                                                                disabled
                                                                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg font-medium text-sm cursor-not-allowed flex items-center gap-2"
                                                                title="Cannot remove admin users"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                </svg>
                                                                Protected
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleDemote(user)}
                                                                className="px-4 py-2 bg-red-100 hover:bg-red-500 dark:bg-red-500/10 dark:hover:bg-red-600 text-red-700 hover:text-white dark:text-red-400 dark:hover:text-white rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                {filteredUsers.length > 0 && (
                    <div className="mt-6 text-center text-slate-600 dark:text-slate-400 text-sm">
                        Showing {filteredUsers.length} of {users.length} total user{users.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageMembers;