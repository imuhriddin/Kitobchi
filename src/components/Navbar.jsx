import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Kitoblar", path: "/books" },
    { name: "E'lon berish", path: "/announcement" },
    { name: "Savatcha", path: "/cart" },
  ];

  return (
    <header className="bg-white/30 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1250px] mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-indigo-700">Kitobchi</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative transition-colors duration-200 hover:text-indigo-600 ${isActive ? "text-indigo-600 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/profile"
            className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Profil
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-indigo-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white/50 backdrop-blur-sm border-t border-transparent transition-all overflow-hidden ${open ? "max-h-96 py-4" : "max-h-0"
          }`}
      >
        <nav className="flex flex-col gap-4 px-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center font-semibold hover:scale-105 transform transition-all duration-300"
          >
            Profil
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
