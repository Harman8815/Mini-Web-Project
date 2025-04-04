import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section
      id="navbar"
      className=" relative bg-primary text-white px-12 py-4 flex flex-row justify-between items-center"
    >
      <div className="uppercase text-md md:text-2xl font-bold tracking-widest">
        <h1>ⓒ CoreScheduler</h1>
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="flex items-center md:hidden">
        <button onClick={handleMenuToggle} className="text-white">
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Navbar Links */}
      <ul
        className={`${
          menuOpen ? "flex absolute top-10 left-0 z-10 bg-primary w-full h-[100vh] justify-center items-center gap-15 " : "hidden"
        } md:flex flex-col md:flex-row justify-center gap-10 items-baseline md:space-x-10  md:mt-0`}
      >
        <li>
          <Link
            to="#home"
            className="hover:text-amber-300 transition-all duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="#about"
            className="hover:text-amber-300 transition-all duration-300"
          >
            About Me
          </Link>
        </li>
        <li>
          <Link
            to="#visualizer"
            className="hover:text-amber-300 transition-all duration-300"
          >
            Visualizer
          </Link>
        </li>
        <li>
          <Link
            to="#whyus"
            className="hover:text-amber-300 transition-all duration-300"
          >
            Why Us
          </Link>
        </li>
        <li>
          <Link
            to="#contact"
            className="hover:text-amber-300 transition-all duration-300"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
