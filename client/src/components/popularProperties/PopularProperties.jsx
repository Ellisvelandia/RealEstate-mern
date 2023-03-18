import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../util/fetchAPI";
import img1 from "/assets/realestatebeach.jpg";
import img2 from "/assets/realestatecountryside.jpg";
import img3 from "/assets/realestatemountain.jpg";

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({});

  useEffect(() => {
    const fetchNumberProperties = async () => {
      try {
        const data = await request("/property/find/types", "GET");
        setNumProperties(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNumberProperties();
  }, []);

  return (
    <div className="min-h-screen max-h-full w-full mt-40">
      <div className="lg:max-w-7xl max-w-full h-full my-0 mx-auto">
        <div className="flex justify-center items-center gap-2">
          <h5 className="text-lg text-[#777] font-medium">Different types of properties</h5>
          <h2 className="text-2xl text-[#333]">Best type of properties for you</h2>
        </div>
        <div className="mt-12 flex flex-wrap lg:gap-12 gap-10">
          <Link to={`/properties?type=beach&continent?1&priceRange=2`} className="w-[30%] relative p-4 transform -rotate-1 rounded-md shadow-md transition-all duration-150 ease-in-out hover:transform hover:rotate-0">
            <img src={img1} alt="beach picture"  className="relative h-[400px] w-full object-cover rounded-md transform rotate-1 transition-all duration-150 cursor-pointer hover:transform hover:rotate-0"/>
            <div className="absolute bottom-20 left-8 text-white text-sm bg-[#0303ce] py-1 px-5 rounded-2xl"> {numProperties?.beach} properties</div>
            <h5  className="ml-4 mt-4 text-2xl text-center text-[#333]">Beach properties</h5>
          </Link>
          <Link to={`/properties?type=mountain&continent?1&priceRange=2`} className="w-[30%] relative p-4 transform -rotate-1 rounded-md shadow-md transition-all duration-150 ease-in-out hover:transform hover:rotate-0">
            <img src={img2} alt="mountain picture" className="relative h-[400px] w-full object-cover rounded-md transform rotate-1 transition-all duration-150 cursor-pointer hover:transform hover:rotate-0" />
            <div className="absolute bottom-20 left-8 text-white text-sm bg-[#0303ce] py-1 px-5 rounded-2xl"> {numProperties?.mountain} properties</div>
            <h5 className="ml-4 mt-4 text-2xl text-center text-[#333]">Mountain properties</h5>
          </Link>
          <Link to={`/properties?type=village&continent?1&priceRange=2`} className="w-[30%] relative p-4 transform -rotate-1 rounded-md shadow-md transition-all duration-150 ease-in-out hover:transform hover:rotate-0">
            <img src={img3} alt="village picture" className="relative h-[400px] w-full object-cover rounded-md transform rotate-1 transition-all duration-150 cursor-pointer hover:transform hover:rotate-0" />
            <div className="absolute bottom-20 left-8 text-white text-sm bg-[#0303ce] py-1 px-5 rounded-2xl"> {numProperties?.village} properties</div>
            <h5  className="ml-4 mt-4 text-2xl text-center text-[#333]">Village properties</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularProperties;
