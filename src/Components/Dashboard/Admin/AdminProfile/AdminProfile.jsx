import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth';
import useAdmin from '../../../../Hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';

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

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    // Find the admin info
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
            }
        };

        fetchStats();
    }, [axiosPublic]);

    if (!isAdmin) {
        return <div>You are not authorized to view this page</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-semibold mb-5">Admin Profile</h1>
            <div className="flex items-center mb-5">
                <img src={adminInfo.profileImage} alt="Admin" className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-semibold">{adminInfo.name}</h2>
                    <p>{adminInfo.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-semibold mb-2">Total Rooms</h3>
                    <p>{stats.totalRooms}</p>
                </div>
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-semibold mb-2">Available Rooms Percentage</h3>
                    <p>{stats.availablePercentage.toFixed(2)}%</p>
                </div>
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-semibold mb-2">Unavailable Rooms Percentage</h3>
                    <p>{stats.unavailablePercentage.toFixed(2)}%</p>
                </div>
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="card bg-base-100 shadow-xl p-5">
                    <h3 className="text-lg font-semibold mb-2">Total Members</h3>
                    <p>{stats.totalMembers}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
