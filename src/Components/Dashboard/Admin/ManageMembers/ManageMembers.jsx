import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const ManageMembers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })
    console.log(users);

    const handleDemote = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // demote user
                axiosSecure.put(`/users/${email}/demote`)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            //refetch to refresh
                            refetch();
                        }
                    })
            }
        });
    }
    refetch();

    return (
        <div>
            <div className="flex justify-evenly">
                <h1 className="text-4xl font-semibold">All Users</h1>
                <h1 className="text-4xl font-semibold">Total Users: {users.length}</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) =>
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.profileImage} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span>{user.name}</span>
                                    </td>

                                    <td>
                                        <span>{user.email}</span>
                                    </td>
                                    <td>
                                        <span>{user.role}</span>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDemote(user.email)} className="btn btn-ghost text-red-500"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageMembers;