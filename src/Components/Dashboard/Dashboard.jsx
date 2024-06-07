import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";


const Dashboard = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: usersInDb = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    const currentUser = usersInDb.find(userInDb => userInDb.email === user.email);
    console.log(currentUser)
    return (
        <div>

        </div>
    );
};

export default Dashboard;