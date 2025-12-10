import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import useAdmin from "../../Hooks/useAdmin";
import useMember from "../../Hooks/useMember";
import { MdApartment, MdPayments, MdDashboard } from "react-icons/md";
import { FaInfoCircle, FaTasks, FaHistory } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiMenu, HiX, HiChevronRight } from "react-icons/hi";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isMember, isMemberLoading] = useMember();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    if (isMemberLoading || isAdminLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#0F172A]">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-[#E2E8F0] dark:border-[#334155] rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-[#3B82F6] dark:border-[#3B82F6] rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-[#475569] dark:text-[#CBD5E1] font-medium">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    const adminLinks = [
        { to: "admin-profile", icon: MdDashboard, label: "Admin Profile" },
        { to: "manage-members", icon: BsFillPeopleFill, label: "Manage Members" },
        { to: "manage-announcement", icon: GrAnnounce, label: "Announcements" },
        { to: "agreement-requests", icon: FaTasks, label: "Agreements" },
        { to: "manage-coupones", icon: RiCoupon2Fill, label: "Coupons" },
    ];

    const memberLinks = [
        { to: "my-profile", icon: IoHome, label: "My Profile" },
        { to: "make-payment", icon: MdPayments, label: "Make Payment" },
        { to: "payment-history", icon: FaHistory, label: "Payment History" },
        { to: "announcements", icon: GrAnnounce, label: "Announcements" },
    ];

    const userLinks = [
        { to: "my-profile", icon: IoHome, label: "My Profile" },
        { to: "announcements", icon: GrAnnounce, label: "Announcements" },
    ];

    const sharedLinks = [
        { to: "/", icon: IoHome, label: "Home" },
        { to: "/apartment", icon: MdApartment, label: "Apartment" },
        { to: "/about", icon: FaInfoCircle, label: "About" },
    ];

    const activeLinks = isAdmin ? adminLinks : isMember ? memberLinks : userLinks;

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 flex items-center justify-center bg-[#FFFFFF] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Toggle sidebar"
            >
                {isSidebarOpen ? (
                    <HiX className="w-6 h-6 text-[#475569] dark:text-[#CBD5E1]" />
                ) : (
                    <HiMenu className="w-6 h-6 text-[#475569] dark:text-[#CBD5E1]" />
                )}
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#FFFFFF] dark:bg-[#1E293B] border-r border-[#E2E8F0] dark:border-[#334155] z-40 transition-transform duration-300 ease-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-[#E2E8F0] dark:border-[#334155]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                                <MdDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">Dashboard</h2>
                                <p className="text-xs text-[#64748B] dark:text-[#64748B]">
                                    {isAdmin ? "Admin Panel" : isMember ? "Member Panel" : "User Panel"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-2">
                            {activeLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={closeSidebar}
                                        className={({ isActive }) =>
                                            `group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-lg shadow-[#3B82F6]/30"
                                                    : "text-[#475569] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:shadow-md"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div
                                                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                                                        isActive
                                                            ? "bg-white/20"
                                                            : "bg-[#F1F5F9] dark:bg-[#1E293B] group-hover:bg-[#E2E8F0] dark:group-hover:bg-[#334155]"
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`w-5 h-5 ${
                                                            isActive ? "text-white" : "text-[#3B82F6] dark:text-[#3B82F6]"
                                                        }`}
                                                    />
                                                </div>
                                                <span className="flex-1">{link.label}</span>
                                                <HiChevronRight
                                                    className={`w-5 h-5 transition-transform duration-300 ${
                                                        isActive ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                                                    }`}
                                                />
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </nav>

                        {/* Divider */}
                        <div className="my-6 border-t border-[#E2E8F0] dark:border-[#334155]"></div>

                        {/* Shared Links */}
                        <div className="space-y-1">
                            <p className="px-4 py-2 text-xs font-semibold text-[#64748B] dark:text-[#64748B] uppercase tracking-wider">
                                Quick Links
                            </p>
                            {sharedLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={closeSidebar}
                                        className="group flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[#475569] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B] group-hover:bg-[#E2E8F0] dark:group-hover:bg-[#334155] transition-all duration-300">
                                            <Icon className="w-5 h-5 text-[#64748B] dark:text-[#64748B]" />
                                        </div>
                                        <span className="flex-1">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-[#E2E8F0] dark:border-[#334155]">
                        <div className="px-4 py-3 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 dark:from-[#3B82F6]/20 dark:to-[#8B5CF6]/20 rounded-xl">
                            <p className="text-xs text-[#475569] dark:text-[#CBD5E1] font-medium">ResidencePro</p>
                            <p className="text-xs text-[#64748B] dark:text-[#64748B] mt-1">Property Management</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;