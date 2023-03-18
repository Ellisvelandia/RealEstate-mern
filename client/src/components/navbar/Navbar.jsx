import React from "react";
import { Link } from "react-router-dom";
import { BsHouseDoor } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 h-16 w-full z-50 bg-[#fff] border-b-2 border-solid border-[#888]">
      <div
        className="max-w-7xl h-full flex justify-between items-center py-1 px-5"
        style={{ margin: "0 auto" }}
      >
        <Link
          to="/"
          className="text-lg flex items-center gap-2 font-bold decoration-transparent text-[#3512d1]"
        >
          Real Estate <BsHouseDoor size={20} />
        </Link>
        <ul className="flex justify-center items-center gap-5 list-none cursor-pointer text-lg">
          <li className="text-[#222] transition-all ease-in-out duration-150">
            Home
          </li>
          <li className="text-[#222] transition-all ease-in-out duration-150">
            About
          </li>
          <li className="text-[#222] transition-all ease-in-out duration-150">
            Featured
          </li>
          <li className="text-[#222] transition-all ease-in-out duration-150">
            Contact
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <Link
            to="/signup"
            className="decoration-transparent py-2 px-4 bg-[#2500ac] border-solid border rounded text-white text-base cursor-pointer transition-all duration-150 hover:bg-[#fff] hover:text-[#2500ac] hover:border-[#2500ac]"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            className="text-[#2500ac] text-base cursor-pointer font-bold"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
