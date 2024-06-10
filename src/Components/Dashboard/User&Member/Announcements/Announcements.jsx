import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Announcements = () => {
    const axiosPublic = useAxiosPublic();
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }
    return (
        <div className="p-5 mt-2">
             <Helmet>
                <title>ResidencePro | Announcements</title>
            </Helmet>
            <h1 className="text-4xl font-semibold text-center mb-5">Announcements</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Title</th>
                            <th className="border border-gray-300 p-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement) => (
                            <tr key={announcement._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{announcement.title}</td>
                                <td className="border border-gray-300 p-2">{announcement.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Announcements;
