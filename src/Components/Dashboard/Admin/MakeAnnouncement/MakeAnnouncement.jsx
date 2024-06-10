import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const MakeAnnouncement = () => {
    const axiosPublic = useAxiosPublic();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const announcement = {
            title: title,
            description: description,
        }

        //post to DB
        axiosPublic.post('/announcements', announcement)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Announcement Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-screen">
             <Helmet>
                <title>ResidencePro | Make Announcements</title>
            </Helmet>
            <div className="w-2/3 bg-base-200 shadow-xl p-10 border">
                <h1 className="text-4xl font-semibold text-center mb-5">Make an Announcement</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium">Title</label>
                        <input
                            type="text"
                            name='title'
                            className="w-full p-2 border rounded"
                            placeholder="title..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">Description</label>
                        <textarea
                            name='description'
                            className="w-full p-2 border rounded"
                            rows="5"
                            placeholder="description..."
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
