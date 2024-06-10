import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AgreementRequest = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: agreements = [], refetch } = useQuery({
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept"
        }).then((result) => {
            if (result.isConfirmed) {
                // accept , update status & delete
                axiosSecure.put(`agreements/${agreement._id}/accept`, userAgreement)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            Swal.fire({
                                title: "Accepted!",
                                text: "Request Accepted",
                                icon: "success"
                            });

                            //refetch to refresh
                            refetch();
                        }
                    })
            }
        });
    };

    const handleReject = async (id) => {
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
                // reject , update status & delete
                axiosSecure.put(`agreements/${id}/reject`)
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

    };

    refetch();

    return (
        <div>
            <h1 className="text-3xl font-semibold">Agreement Requests: {agreements.length}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {agreements.map(agreement => (
                    <div key={agreement._id} className="card bg-base-100 shadow-xl border">
                        <div className="card-body p-5">
                            <p><strong>User Name:</strong> {agreement.userName}</p>
                            <p><strong>Email:</strong> {agreement.userEmail}</p>
                            <p><strong>Floor No:</strong> {agreement.floorNo}</p>
                            <p><strong>Block Name:</strong> {agreement.blockName}</p>
                            <p><strong>Room No:</strong> {agreement.apartmentNo}</p>
                            <p><strong>Rent:</strong> {agreement.rent}</p>
                            <p><strong>Request Date:</strong> {new Date(agreement.date).toLocaleDateString()}</p>
                            <div className="card-actions justify-start">
                                <button onClick={() => handleAccept(agreement)} className="btn btn-success">Accept</button>
                                <button onClick={() => handleReject(agreement._id)} className="btn btn-error">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgreementRequest;
