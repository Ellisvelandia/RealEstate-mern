import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../util/fetchAPI";
import person from "/assets/person.jpg";
import { FaSquareFull, FaBed } from "react-icons/fa";

const FeatureProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fecthFeatured = async () => {
      try {
        const data = await request("/property/find/featured", "GET");
        setFeaturedProperties(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthFeatured();
  }, []);

  return (
    <div className="h-full w-full mt-28">
      <div className="max-w-7xl h-full my-0 mx-auto">
        <div className="flex items-center flex-col gap-2">
          <h5 className="text-[#777] text-lg font-medium">
            Properties you may like
          </h5>
          <h2 className="text-[#333] text-xl">Our featured properties</h2>
        </div>
        <div className="mt-12 grid px-4 md:grid-cols-3 grid-cols-1 place-content-center lg:gap-12 gap-10 font-bold">
          {featuredProperties?.map((property) => (
            <div
              className="relative lg:p-4 px-6 py-4 transform -rotate-1 rounded-md shadow-md transition-all duration-150 ease-in-out hover:transform hover:rotate-0"
              key={property._id}
            >
              <Link
                to={`/propertyDetail/${property._id}`}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              >
                <img
                  src={`http://localhost:4001/images/${property?.img}`}
                  alt="Property images"
                  className="relative lg:h-[400px] h-[200px] lg:w-[800px] w-full object-fill rounded-md transform rotate-1 transition-all duration-150 cursor-pointer hover:transform hover:rotate-0"
                />
              </Link>
              <div className="flex flex-col gap-4 py-0 px-2 mt-4">
                <div className="w-full flex justify-between items-end">
                  <span className="font-bold lg:text-lg text-base">$ {property?.price}</span>
                  <img
                    src={`http://localhost:4001/images/${property?.currentOwner?.profileImg}`}
                    alt="person image"
                    className="object-cover hover:scale-105 rounded-[50%] w-10 h-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 mb-2">
                <span className="flex items-center gap-4 text-[#2c2cdc] pr-5 border-none">
                  {property?.beds}
                  <FaBed className="w-7 h-7" />
                </span>
                <span className="flex items-center gap-4 text-[#2c2cdc] border-solid border border-[#07077b5] pr-5">
                  {property?.sqmeters}
                  <FaSquareFull className="w-7 h-7" />
                </span>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] md:text-base text-sm text-[#222]">
                {property?.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProperties;
