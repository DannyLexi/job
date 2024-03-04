import React,  {  useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
      };
      const navItems = [
        { path: "/", title: "Search Jobs" },
        { path: "/my-job", title: "My Jobs" },
        { path: "/salary", title: "Salary Estimates" },
        { path: "/post-job", title: "Post Jobs" },
    ];
  return (
    <header className="max-w-screen-2x1 container mx-auto xl:px-24 px-4">
    <nav className="flex items-center justify-between p-4">
        <a href="/" className="flex items-center gap-2 text-2xl text-black" onClick={handleMenuToggler} aria-label="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
                <line x1="5" y1="5" x2="23" y2="23" stroke="#3575E2" stroke-width="2" />
                <line x1="5" y1="23" x2="23" y2="5" stroke="#3575E2" stroke-width="2" />
            </svg>
            <span>jobx</span>
        </a>
        <ul className="hidden md:flex gap-12">
            {navItems.map(({ path, title }) => (
                <li key={path} className="text-base text-primary">
                    <NavLink
                        to={path}
                        className="text-black hover:text-gray-300 px-4 py-2"
                        activeClassName="active"
                        onClick={handleMenuToggler}
                    >
                        {title}
                    </NavLink>
                </li>
            ))}
        </ul>
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">
                Log In
            </Link>
            <Link to="/sign-up" className="py-2 px-5 border rounded  bg-blue-600 ">
                Sign Up
            </Link>
        </div>

        <div className="md:hidden block">
            <button onClick={handleMenuToggler}>
                {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
            </button>
        </div>
    </nav>
    
    {/* Mobile Menu */}
    <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
            {navItems.map(({ path, title }) => (
                <li key={path} className="text-base text-white first:text-white py-1">
                    <NavLink
                        to={path}
                        className="text-white hover:text-gray-300 px-4 py-2"
                        activeClassName="active"
                        onClick={handleMenuToggler}
                    >
                        {title}
                    </NavLink>
                </li>
            ))}
            <li className="text-white py-1">
                <Link to="/login">Log In</Link>
            </li>
        </ul>
    </div>
</header>
  )
}

export default Navbar
