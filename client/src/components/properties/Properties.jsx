import { FaBed, FaSquareFull } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import { properties } from "../../util/dummyData";
import { arrPriceRanges } from "../../util/idxToPriceRange";
import { continentToIdx } from "../../util/idxToContinent";
import { request } from "../../util/fetchAPI";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [state, setState] = useState(null);
  const query = useLocation().search.slice(1);
  const arrQuery = query.split("&");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, "GET");
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);

  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {};
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0];
        const value = option.split("=")[1];

        formattedQuery = { ...formattedQuery, [key]: value };

        if (idx === arrQuery.length - 1) {
          setState((prev) => formattedQuery);
          handleSearch(formattedQuery);
        }
      });
    }
  }, [allProperties, arrQuery]);

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSearch = (param = state) => {
    let options;
    if (param?.nativeEvent) {
      options = state;
    } else {
      options = param;
    }
    const filteredProperties = allProperties.filter((property) => {
      const priceRange = arrPriceRanges[options.priceRange];
      const minPrice = Number(priceRange.split("-")[0]);
      const maxPrice = Number(priceRange.split("-")[1]);
      const continent = continentToIdx(property.continent);

      if (
        property.type === options.type &&
        continent === Number(options.continent) &&
        property.price >= minPrice &&
        property.price <= maxPrice
      ) {
        return property;
      }
    });

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`;

    navigate(`/properties?${queryStr}`, { replace: true });
    setFilteredProperties((prev) => filteredProperties);
  };

  return (
    <div className="h-full w-full mt-10 px-8">
      <div className="max-w-6xl h-full my-0 mx-auto">
        <div className="w-full bg-[rgba(255,255,255,0.2)] backdrop-blur-lg border-solid border border-[rgba(255,255,255,0.18)] shadow-lg md:gap-1 gap-0 bg-white rounded-3xl flex md:flex-row flex-col justify-around items-center py-5 px-6">
          <select
            value={state?.type}
            name="type"
            onChange={handleState}
            className="md:h-10 h-8 min-w-[160px] md:max-w-[200px] max-w-[80px] my-1 w-auto border-none outline-none font-bold py-1 px-3 bg-[#143ef7] text-white rounded-xl md:text-base text-[11px] cursor-pointer"
          >
            <option disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select
            className="md:h-10 h-8 min-w-[160px] md:max-w-[200px] max-w-[80px] my-1 w-auto border-none outline-none font-bold py-1 px-3 bg-[#143ef7] text-white rounded-xl md:text-base text-[11px] cursor-pointer"
            value={state?.priceRange}
            name="priceRange"
            onChange={handleState}
          >
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select
            value={state?.continent}
            name="continent"
            onChange={handleState}
          >
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <button className="outline-none border-none w-10 h-10 cursor-pointer bg-transparent">
            <AiOutlineSearch
              className="lg:w-9 lg:h-9 w-8 h-8 rounded-full p-2 lgradient fill-white cursor-pointer"
              onClick={handleSearch}
            />
          </button>
        </div>
        {filteredProperties?.length > 0 ? (
          <>
            <div className="mt-20 flex items-center flex-col gap-2">
              <h5 className="text-[#777] text-base font-medium">
                Selected properties
              </h5>
              <h2 className="text-xl text-[#333]">Property you may like</h2>
            </div>
            <div className="mt-12 grid px-4 md:grid-cols-3 grid-cols-1 place-content-center lg:gap-12 gap-10 font-bold">
              {filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className="relative lg:p-4 px-6 py-4 transform -rotate-1 rounded-md shadow-md transition-all duration-150 ease-in-out hover:transform hover:rotate-0"
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
                  <div className="flex flex-col gap-4 object-cover">
                    <div className="w-4/5 flex justify-between items-center">
                      <span className="font-bold lg:text-lg text-base">
                        $ {property.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 mb-2">
                      <span className="flex items-center gap-4 text-[#2c2cdc] pr-5 border-none">
                        {property.beds} <FaBed className="w-7 h-7" />
                      </span>
                      <span className="flex items-center gap-4 text-[#2c2cdc] border-solid border border-[#07077b5] pr-5">
                        {property.sqmeters} square meters
                        <FaSquareFull className="w-7 h-7" />
                      </span>
                    </div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] md:text-base text-sm text-[#222]">
                      {property.decs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-center mt-20 lg:text-3xl md:text-2xl text-xl text-[#222]">
            We have no properties with the specified options.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Properties;
