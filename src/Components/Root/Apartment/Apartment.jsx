import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MdApartment, MdLocationOn } from "react-icons/md";
import { FaBuilding, FaDollarSign, FaCheck } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Apartment = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rooms');
            return res.data;
        }
    });

    const { data: agreements = [], isLoadingAgreements, refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/agreements');
            return res.data;
        }
    });

    const isUserAgreements = agreements.find(agreement => agreement?.userEmail === user?.email);

    if (isLoading || isLoadingAgreements) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                    <MdApartment className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading apartments...</p>
            </div>
        );
    }

    // Calculate pagination
    const pageCount = Math.ceil(rooms.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentRooms = rooms.slice(offset, offset + itemsPerPage);

    const handlePageClick = (pageIndex) => {
        setCurrentPage(pageIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleButtonClick = async (room) => {
        if (user) {
            const agreement = {
                userName: user.displayName,
                userEmail: user.email,
                floorNo: room.floorNo,
                blockName: room.blockName,
                apartmentNo: room.apartmentNo,
                rent: room.rent,
                date: new Date(),
                status: 'pending'
            };

            Swal.fire({
                title: "Confirm Agreement Request",
                html: `
                    <div class="text-left space-y-2">
                        <p><strong>Apartment:</strong> #${room.apartmentNo}</p>
                        <p><strong>Block:</strong> ${room.blockName}</p>
                        <p><strong>Floor:</strong> ${room.floorNo}</p>
                        <p><strong>Rent:</strong> $${room.rent}/month</p>
                    </div>
                `,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3B82F6",
                cancelButtonColor: "#EF4444",
                confirmButtonText: "Yes, Submit Request",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.post('/agreements', agreement)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Agreement Request Submitted!",
                                    text: "Your request is pending approval",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                refetch();
                            }
                        });
                }
            });
        } else {
            Swal.fire({
                title: "Sign In Required",
                text: "Please sign in to request an apartment agreement",
                icon: "warning",
                confirmButtonColor: "#3B82F6",
                confirmButtonText: "Go to Sign In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/sign-in');
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-500">
            <Helmet>
                <title>ResidencePro | Apartments</title>
            </Helmet>

            {/* Header Section */}
            <div className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                            <MdApartment className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Available Apartments
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse our collection of premium apartments. Find your perfect home today.
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-center gap-8 mt-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{rooms.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Units</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{pageCount}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pages</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apartments Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentRooms?.map((room, index) => (
                        <div
                            key={room._id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                            }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-56">
                                <img
                                    src={room.image}
                                    alt={`Apartment ${room.apartmentNo}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                    #{room.apartmentNo}
                                </div>
                                {isUserAgreements && (
                                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                                        <FaCheck className="w-3 h-3" />
                                        Agreed
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    Apartment #{room.apartmentNo}
                                </h3>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <MdLocationOn className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Floor</p>
                                            <p className="font-semibold">{room.floorNo}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                            <FaBuilding className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Block</p>
                                            <p className="font-semibold">{room.blockName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <FaDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Rent</p>
                                            <p className="font-bold text-xl text-green-600 dark:text-green-400">${room.rent}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    disabled={isUserAgreements}
                                    onClick={() => handleButtonClick(room)}
                                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                                        isUserAgreements
                                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                                    }`}
                                >
                                    {isUserAgreements ? 'Already Requested' : 'Request Agreement'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                currentPage === 0
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md'
                            }`}
                        >
                            <HiChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-2">
                            {Array.from({ length: pageCount }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageClick(index)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                                        currentPage === index
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageClick(currentPage + 1)}
                            disabled={currentPage === pageCount - 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                currentPage === pageCount - 1
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md'
                            }`}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <HiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Apartment;