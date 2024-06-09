import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Apartment = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const { data: rooms = [] ,isLoading} = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rooms');
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

    // Calculate the number of pages
    const pageCount = Math.ceil(rooms.length / itemsPerPage);

    // Get the rooms for the current page
    const offset = currentPage * itemsPerPage;
    const currentRooms = rooms.slice(offset, offset + itemsPerPage);

    // Handle page change
    const handlePageClick = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleButtonClick = async (room) => {    
        const agreement = {
            userName: user.displayName,
            userEmail: user.email,
            floorNo: room.floorNo,
            blockName: room.blockName,
            apartmentNo: room.apartmentNo,
            rent: room.rent,
            date: new Date(),
            status: 'pending'
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.post('/agreements', agreement)
                .then(res => {
                    if (res.data.insertedId){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Agreement is pending",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                     
                })
            }
          });


       
    }

    return (
        <div className="pt-24 min-h-screen mb-14">
            <h2 className="text-3xl font-bold text-center mb-8">Apartments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {
                    currentRooms?.map(room => (
                        <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={room.image} alt={`Apartment ${room.apartmentNo}`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Apartment No: {room.apartmentNo}</h3>
                                <p className="text-gray-700">Floor: {room.floorNo}</p>
                                <p className="text-gray-700">Block: {room.blockName}</p>
                                <p className="text-gray-700">Rent: ${room.rent}</p>
                                <button onClick={() => handleButtonClick(room)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Agreement</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex  items-center justify-center mt-8">
                <div className="flex items-center gap-5 justify-center">
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        className={`page-link p-2 border border-gray-300 rounded cursor-pointer  ${currentPage === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
                            }`}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index)}
                            className={`page-link p-2 border border-gray-300 rounded cursor-pointer  ${currentPage === index ? 'bg-red-500 text-white' : 'bg-white text-black'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        className={`page-link p-2 border border-gray-300 rounded cursor-pointer  ${currentPage === pageCount - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
                            }`}
                        disabled={currentPage === pageCount - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Apartment;