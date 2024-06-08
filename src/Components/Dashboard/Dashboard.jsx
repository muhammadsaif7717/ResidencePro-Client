import { Link, NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import useAdmin from "../../Hooks/useAdmin";
import useMember from "../../Hooks/useMember";



const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isMember] = useMember();

    return (
        <div className="flex md:gap-5">
            {/*dshboard sidebar */}
            <div className="w-5/12 md:w-64 min-h-screen bg-blue-400">
                {
                    isAdmin ?
                        <div>
                            <ul className="menu  flex flex-col md:gap-5 ">
                                <li><NavLink to={`admin-profile`}> <IoHome />Admin Profile</NavLink></li>
                                <li><NavLink to={`manage-members`}> <IoHome />Manage Members</NavLink></li>
                                <li><NavLink to={`manage-announcement`}> <IoHome />Make Announcement</NavLink></li>
                                <li><NavLink to={`agreement-requests`}> <IoHome /> Agreement Requests
                                </NavLink></li>
                                <li><NavLink to={`manage-coupones`}> <IoHome />Manage Coupons
                                </NavLink></li>

                            </ul>
                            <hr className="w-3/4 mx-auto md:my-5" />
                        </div>
                        :
                        <>
                            {
                                isMember ?
                                    <div>
                                        <ul className="menu  flex flex-col md:gap-5 ">
                                            <li><NavLink to={`my-profile`}> <IoHome />My Profile</NavLink></li>
                                            <li><NavLink to={`make-payment`}> <IoHome />Make payment</NavLink></li>
                                            <li><NavLink to={`payment-history`}> <IoHome />Payment History
                                            </NavLink></li>
                                            <li><NavLink to={`announcements`}> <IoHome />Announcements</NavLink></li>
                                        </ul>
                                        <hr className="w-3/4 mx-auto md:my-5" />
                                    </div>
                                    :
                                    <div>
                                        <ul className="menu  flex flex-col md:gap-5 ">
                                            <li><NavLink to={`my-profile`}> <IoHome />My Profile</NavLink></li>
                                            <li><NavLink to={`announcements`}> <IoHome />Announcements</NavLink></li>
                                        </ul>
                                        <hr className="w-3/4 mx-auto md:my-5" />
                                    </div>
                            }
                        </>
                }

                {/* shared navlink */}
                <ul className="menu pb-0  flex flex-col md:gap-2">
                    <li><Link to={`/`}> <IoHome /> HOME</Link></li>
                    <li><Link to={`/apartment`}> <IoHome /> Apartment</Link></li>
                    <li><Link to={`/about`}> <IoMdMail /> About</Link></li>
                </ul>
            </div>
            {/* dshboard content */}
            <div className="flex-1 p-2 md:p-5">
                <Outlet></Outlet>
            </div>










        </div>

    );
};

export default Dashboard;