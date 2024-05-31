import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const links = (
    <>
      <NavLink className="px-5" to="/">
        Home
      </NavLink>
      <NavLink className="px-5" to="/about">
        About
      </NavLink>
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100 p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <nav
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </nav>
          </div>
          <Link to={`/`} className="btn btn-ghost text-xl font-bold p-0">ResidencePro</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <nav className="menu menu-horizontal px-1">{links}</nav>
        </div>
        <div className="navbar-end">
          <Link
            to={`/sign-in`}
            className="btn btn-primary border-none bg-orange-500 text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
