import { Link, NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import useAdmin from "../../Hooks/useAdmin";
import useMember from "../../Hooks/useMember";
import { MdApartment } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaHistory } from "react-icons/fa";









const Dashboard = () => {

    const [isAdmin, isAdminLoading] = useAdmin();
    const [isMember, isMemberLoading] = useMember();

    if (isMemberLoading || isAdminLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row md:gap-5">
            {/*dshboard sidebar */}
            <div className="flex flex-row md:flex-col justify-between md:justify-start md:w-64 md:min-h-screen bg-blue-400">
                {
                    isAdmin ?
                        <div>
                            <ul className="menu  flex flex-col md:gap-5 ">
                                <li><NavLink to={`admin-profile`}> <IoHome />Admin Profile</NavLink></li>
                                <li><NavLink to={`manage-members`}> <BsFillPeopleFill />Manage Members</NavLink></li>
                                <li><NavLink to={`manage-announcement`}> <GrAnnounce />Make Announcement</NavLink></li>
                                <li><NavLink to={`agreement-requests`}> <FaTasks /> Agreement Requests
                                </NavLink></li>
                                <li><NavLink to={`manage-coupones`}> <RiCoupon2Fill />Manage Coupons
                                </NavLink></li>

                            </ul>
                            <hr className="w-full mx-auto md:my-5 hidden md:block" />
                        </div>
                        :
                        <>
                            {
                                isMember ?
                                    <div>
                                        <ul className="menu  flex flex-col md:gap-5 ">
                                            <li><NavLink to={`my-profile`}> <IoHome />My Profile</NavLink></li>
                                            <li><NavLink to={`make-payment`}> <MdPayments />Make payment</NavLink></li>
                                            <li><NavLink to={`payment-history`}> <FaHistory />Payment History
                                            </NavLink></li>
                                            <li><NavLink to={`announcements`}> <GrAnnounce />Announcements</NavLink></li>
                                        </ul>
                                        <hr className="w-full mx-auto md:my-5 hidden md:block" />
                                    </div>
                                    :
                                    <div>
                                        <ul className="menu  flex flex-col md:gap-5 ">
                                            <li><NavLink to={`my-profile`}> <IoHome />My Profile</NavLink></li>
                                            <li><NavLink to={`announcements`}> <IoHome />Announcements</NavLink></li>
                                        </ul>
                                        <hr className="w-full mx-auto md:my-5 hidden md:block" />
                                    </div>
                            }
                        </>
                }

                {/* shared navlink */}
                <div>
                    <ul className="menu pb-0  flex flex-col md:gap-2">
                        <li><Link to={`/`}> <IoHome /> HOME</Link></li>
                        <li><Link to={`/apartment`}> <MdApartment /> Apartment</Link></li>
                        <li><Link to={`/about`}> <FaInfoCircle /> About</Link></li>
                    </ul>
                </div>
            </div>

            {/* dshboard content */}
            <div className="flex-1 p-2 md:p-5">
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;