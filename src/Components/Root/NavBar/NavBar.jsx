import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { IoIosLogIn } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import logo from '../../../assets/images/icons8-jira-256.png';
import useAdmin from "../../../Hooks/useAdmin";
import ThemeToggler from '../../Shared/ThemeToggler/ThemeToggler'

const NavBar = () => {
  const { user, logOutUser } = useAuth();
  const [isAdmin] = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Optimized scroll effect with debounce
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        console.log('User Logged Out');
        setIsProfileDropdownOpen(false);
      })
      .catch(err => console.error('Logout error:', err));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/apartment", label: "Apartment" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-[#FFFFFF]/98 dark:bg-[#0F172A]/98 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-black/20 border-b border-[#E2E8F0] dark:border-[#334155]' 
          : 'bg-transparent backdrop-blur-md'
      }`}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced animation */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group relative z-10"
            aria-label="ResidencePro Home"
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 group-hover:from-[#3B82F6]/30 group-hover:to-[#8B5CF6]/30' 
                  : 'bg-white/10 group-hover:bg-white/20'
              } blur-xl scale-110 group-hover:scale-125`} />
              <img 
                src={logo} 
                alt="" 
                className="w-12 h-12 relative transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
              />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-all duration-500 bg-gradient-to-r ${
              isScrolled 
                ? 'from-[#2563EB] via-[#7C3AED] to-[#2563EB] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#3B82F6] bg-clip-text text-transparent' 
                : 'from-white to-white bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
            } bg-[length:200%_auto] group-hover:bg-right`}>
              ResidencePro
            </span>
          </Link>

          {/* Desktop Navigation with enhanced hover effects */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? "text-white dark:text-white"
                      : isScrolled
                      ? "text-[#475569] dark:text-[#CBD5E1] hover:text-[#2563EB] dark:hover:text-[#3B82F6]"
                      : "text-white/95 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <span className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#3B82F6] rounded-xl" />
                    ) : (
                      <>
                        <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                          isScrolled
                            ? 'bg-[#F1F5F9] dark:bg-[#1E293B] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'
                            : 'bg-white/10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                        }`} />
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                      </>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle - Hidden on mobile */}
            <div className={`hidden lg:block transition-all duration-500 ${
              isScrolled ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
            }`}>
              <ThemeToggler />
            </div>

            {/* User Profile or Sign In */}
            {user ? (
              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`relative flex items-center gap-3 pl-1 pr-4 py-1 rounded-full transition-all duration-300 group ${
                    isScrolled 
                      ? 'hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]' 
                      : 'hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isProfileDropdownOpen 
                        ? 'ring-4 ring-[#3B82F6]/50 scale-110' 
                        : 'ring-2 ring-transparent group-hover:ring-[#3B82F6]/30 group-hover:scale-105'
                    }`} />
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-11 h-11 rounded-full object-cover relative shadow-lg"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] dark:bg-[#10B981] border-2 border-white dark:border-[#0F172A] rounded-full"></span>
                  </div>
                  <span className={`hidden sm:block text-sm font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-[#475569] dark:text-[#CBD5E1]' 
                      : 'text-white'
                  }`}>
                    {user.displayName?.split(' ')[0]}
                  </span>
                </button>

                {/* Enhanced Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-80 bg-[#FFFFFF] dark:bg-[#0F172A] backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/30 border border-[#E2E8F0] dark:border-[#334155] overflow-hidden z-50 animate-[slideDown_0.3s_ease-out]"
                    role="menu"
                  >
                    {/* User Info Card */}
                    <div className="relative p-6 bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#2563EB] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#3B82F6] overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="relative">
                          <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="w-16 h-16 rounded-2xl border-3 border-white/50 shadow-2xl"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] border-2 border-white rounded-full shadow-lg"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-lg truncate drop-shadow-lg">
                            {user.displayName}
                          </p>
                          <p className="text-blue-100 text-sm truncate drop-shadow">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-3 space-y-1">
                      <Link
                        to={isAdmin ? "/dashboard/admin-profile" : "/dashboard/my-profile"}
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-4 w-full px-5 py-4 text-left rounded-2xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-[#1E293B] dark:hover:to-[#1E293B] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                        role="menuitem"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-[#3B82F6]/20 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-[#3B82F6]/30 transition-colors duration-300">
                          <MdDashboard className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-[#475569] dark:text-[#CBD5E1] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors duration-300">
                            Dashboard
                          </span>
                          <p className="text-xs text-[#94A3B8] dark:text-[#64748B]">
                            Manage your properties
                          </p>
                        </div>
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-4 w-full px-5 py-4 text-left rounded-2xl transition-all duration-300 group hover:bg-red-50 dark:hover:bg-[#EF4444]/10 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                        role="menuitem"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-[#EF4444]/20 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-[#EF4444]/30 transition-colors duration-300">
                          <FiLogOut className="w-5 h-5 text-[#DC2626] dark:text-[#EF4444]" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-[#DC2626] dark:text-[#EF4444] transition-colors duration-300">
                            Sign Out
                          </span>
                          <p className="text-xs text-[#94A3B8] dark:text-[#64748B]">
                            Come back soon!
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/sign-in"
                className={`relative flex items-center gap-2.5 px-6 py-3 font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 ${
                  isScrolled
                    ? 'text-white'
                    : 'text-white border-2 border-white/30 hover:border-white/50'
                }`}
              >
                {isScrolled ? (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#3B82F6]" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                  </>
                ) : (
                  <span className="absolute inset-0 bg-white/10 backdrop-blur-xl group-hover:bg-white/20 transition-all duration-300" />
                )}
                <IoIosLogIn className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 group ${
                isScrolled 
                  ? 'hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]' 
                  : 'hover:bg-white/10 backdrop-blur-sm'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-7 h-7">
                <HiMenu className={`absolute inset-0 w-7 h-7 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
                } ${isScrolled ? 'text-[#475569] dark:text-[#CBD5E1]' : 'text-white'}`} />
                <HiX className={`absolute inset-0 w-7 h-7 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
                } ${isScrolled ? 'text-[#475569] dark:text-[#CBD5E1]' : 'text-white'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div className={`lg:hidden  fixed inset-0 top-20 z-40 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
        />
        
        <div className={`relative max-w-md mx-auto bg-[#FFFFFF] dark:bg-[#0F172A] backdrop-blur-2xl  shadow-2xl  overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'
        }`}>
          <div className="p-6 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#3B82F6] text-white shadow-xl"
                      : "text-[#475569] dark:text-[#CBD5E1] hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-[#1E293B] dark:hover:to-[#1E293B] hover:shadow-lg"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Theme Toggler in Mobile Menu */}
            <div className="pt-4 mt-4 border-t border-[#E2E8F0] dark:border-[#334155]">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#475569] dark:text-[#CBD5E1]">
                    Theme
                  </span>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;