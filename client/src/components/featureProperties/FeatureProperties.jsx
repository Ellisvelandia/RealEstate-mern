import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../util/fetchAPI";
import img from "/assets/estate3.jpg";
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
        <div className="w-full mt-12 flex flex-wrap gap-8">
          {featuredProperties?.map((property) => (
            <div
              className="w-4/5 h-[350px] mb-2 overflow-hidden cursor-pointer inline-block"
              key={property._id}
            >
              <Link
                to={`/propertyDetail/${property._id}`}
                className="w-full h-full object-cover transition-all duration-150 ease-out"
              >
                <img
                  src={img}
                  alt="Property images"
                  className="object-cover hover:scale-105 rounded w-9 h-9"
                />
              </Link>
              <div className="flex flex-col gap-4 py-0 px-2">
                <div className="w-4/5 flex justify-between items-center">
                  <span className="font-bold text-lg">$ {property?.price}</span>
                  <img
                    src={person}
                    alt="person image"
                    className="object-cover hover:scale-105 rounded w-9 h-9"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 mb-2">
                <span className="flex items-center gap-4 text-[#2c2cdc] pr-5 border-none">
                  {property?.beds}
                  <FaBed className="w-8 h-8" />
                </span>
                <span className="flex items-center gap-4 text-[#2c2cdc] border-solid border border-[#07077b5] pr-5">
                  {property?.sqmeters}
                  <FaSquareFull className="w-8 h-8" />
                </span>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] text-lg text-[#222]">
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
