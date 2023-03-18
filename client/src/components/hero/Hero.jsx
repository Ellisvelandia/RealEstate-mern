import React, { useState } from "react";
import {AiOutlineSearch} from "react-icons/ai"

const Hero = () => {
  const [type, setType] = useState("beach");
  const [continent, setContinent] = useState("0");
  const [priceRange, setPriceRange] = useState("0");

  const handleSearch = () => {};

  return (
    <div className="w-full h-[calc(100vh-60px)] bg-[url('../../assets/estate.jpg')]  bg-cover bg-[rgba(0,0,0,0.4)] bg-blend-darken">
      <div className="max-w-7xl h-full flex flex-col justify-center items-center my-0 mx-auto">
        <h2 className="text-5xl font-bold text-white whitespace-nowrap mb-10">Let me find your dream place right now</h2>
        <h5 className="text-white text-3xl mb-12">Search the best selection of luxury real estate</h5>
        <div className="w-[70%] bg-white rounded-3xl flex justify-around items-center py-5 px-6">
          <select className="h-10 min-w-[160px] max-w-[200px] border-none outline-none font-bold py-1 px-3 bg-[#143ef7] text-white rounded-xl text-lg cursor-pointer " onChange={(e) => setType(e.target.value)}>
            <option  disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select  className="h-10 min-w-[160px] max-w-[200px] border-none outline-none font-bold py-1 px-3 bg-[#143ef7] text-white rounded-xl text-lg cursor-pointer " onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select  className="h-10 min-w-[160px] max-w-[200px] border-none outline-none font-bold py-1 px-3 bg-[#143ef7] text-white rounded-xl text-lg cursor-pointer " onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <AiOutlineSearch className="w-10 h-10 rounded-full p-2 lgradient fill-white cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
