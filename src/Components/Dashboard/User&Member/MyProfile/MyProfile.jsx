import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useMember from "../../../../Hooks/useMember";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";


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
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-center">Welcome <span className="text-green-600">{currentUser?.name || user.displayName}!</span></h1>

            <div className="card w-2/3 bg-base-200 shadow-xl mt-10 border">
                <figure className="px-10 pt-10">
                    <img src={currentUser?.profileImage || user.photoURL} className="rounded-full w-[200px]" />
                </figure>
                <div className="card-body ">
                    <h2 className="card-title text-2xl">{currentUser?.name || user.displayName}</h2>
                    <p><strong>Email:</strong> {currentUser?.email || user.email}</p>
                    <div>
                        {
                            isMember && currentUser?.acceptDate ? (
                                <div>
                                    <p><strong>Accept Date:</strong> {new Date(currentUser?.acceptDate).toLocaleDateString()}</p>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
