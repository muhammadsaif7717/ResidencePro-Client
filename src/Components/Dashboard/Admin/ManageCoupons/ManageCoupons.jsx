import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const ManageCoupons = () => {
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        }
    });





    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const code = form.code.value;
        const discount = form.discount.value;
        const description = form.description.value;

        const coupon = {
            code: code,
            discount: discount,
            description: description,
        }

        console.log(coupon)
        //post to DB
        axiosPublic.post('/coupons', coupon)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Cupon Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }

    refetch();

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-4xl font-semibold">Manage Coupons</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Add Coupon</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Code</th>
                            <th className="border border-gray-300 p-2">Discount</th>
                            <th className="border border-gray-300 p-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(coupon => (
                            <tr key={coupon._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{coupon.code}</td>
                                <td className="border border-gray-300 p-2">{coupon.discount}%</td>
                                <td className="border border-gray-300 p-2">{coupon.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Add New Coupon</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="code">Coupon Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="discount">Discount Percentage</label>
                                <input
                                    type="number"
                                    name="discount"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="description">Coupon Description</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    className="textarea textarea-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary mr-2">Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
