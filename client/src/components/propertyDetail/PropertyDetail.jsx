import React from 'react'
import emailjs from '@emailjs/browser'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../util/fetchAPI'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { useRef } from 'react'

const PropertyDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const formRef = useRef();

  const serviceID = import.meta.env.vITE_APP_SERVICE_ID;
  const templateID = import.meta.env.vITE_APP_TEMPLATE_ID;
  const publicKey = import.meta.env.vITE_APP_PUBLIC_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, "GET");
        setPropertyDetail(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle("");
    setDesc("");
  };

  const handleContactOwner = async (e) => {
    e.preventDefault();

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey).then(
      (result) => {
        console.log(result.text);
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div className="h-[calc(100vh-60px)] w-full mt-20 px-4">
      <div className="max-w-6xl h-full my-0 mx-auto flex md:flex-row flex-col items-start gap-11">
        <div className="flex-1 h-full w-full">
          <img
            src={`https://mern-estate.onrender.com/images/${propertyDetail?.img}`}
            className="md:h-4/6 w-full object-cover"
          />
        </div>
        <div className="flex-1 w-full flex flex-col">
          <h3
            className="mb-10
           font-medium text-2xl text-[#222] text-center"
          >
            Title: {`${propertyDetail?.title}`}
          </h3>
          <div className="flex flex-col gap-4 py-0 px-2">
            <div className="flex justify-between items-center capitalize md:mb-8 mb-4 text-center md:text-lg text-base">
              <div>
                Type: <span>{`${propertyDetail?.type}`}</span>
              </div>
              <div>
                Continent: <span>{`${propertyDetail?.continent}`}</span>
              </div>
            </div>
            <div className="md:text-left text-center">
              <span className="font-bold text-base">
                <span className="text-base font-normal">Price: $ </span>
                {`${propertyDetail?.price}`}
              </span>
              {/* <span
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                Owner: <img src="" />
              </span> */}
            </div>
            <div className="w-full md:justify-start justify-center flex items-center md:mb-12 mb-4 gap-5">
              <span className="flex items-center gap-4 border-r-2 border-solid border-[#0707b5] text-[#2c2cdc] pr-5">
                {propertyDetail?.beds} <FaBed size={20} />
              </span>
              <span className="flex items-center gap-4 border-r-2 border-solid border-[#0707b5] text-[#2c2cdc] pr-5">
                {propertyDetail?.sqmeters} square meters{" "}
                <FaSquareFull size={20} />
              </span>
            </div>
          </div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap md:text-left text-center text-base my-8 mx-0">
            Desc:{" "}
            <span className="text-base text-[#444]">{`${propertyDetail?.desc}`}</span>
          </p>
          <div className="w-full flex md:justify-start justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="lg:w-1/4 md:w-1/2 w-36 text-center md:text-lg flex justify-center text-sm border-solid border border-transparent outline-none mt-6 py-2 px-3 whitespace-nowrap bg-[#2500ac] text-[#fff] cursor-pointer hover:bg-[#fff] hover:text-[#2500ac] hover:border-[#2500ac]"
            >
              Contact owner
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div
          className="absolute top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.45)] flex flex-col items-center justify-center z-50"
          onClick={handleCloseForm}
        >
          <div
            className="relative bg-white md:h-[65vh] py-2 lg:w-[25vw] md:w-[60%] w-4/5 rounded-3xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center my-10 mx-0 mb-14">
              Send Email To Owner
            </h2>
            <form
              onSubmit={handleContactOwner}
              ref={formRef}
              className="flex flex-col items-center gap-3 mr-4"
            >
              <input
                value={user?.email}
                type="text"
                placeholder="My email"
                name="from_email"
                className="md:w-1/2 md:text-base text-sm outline-none border-b border-solid border-[#333] my-4"
                required
              />
              <input
                value={user?.username}
                type="text"
                placeholder="My username"
                name="from_username"
                className="md:w-1/2 md:text-base text-sm outline-none border-b border-solid border-[#333] my-4"
                required
              />
              <input
                value={propertyDetail?.currentOwner?.email}
                type="email"
                placeholder="Owner email"
                name="to_email"
                className="md:w-1/2 md:text-base text-sm outline-none border-b border-solid border-[#333] my-4"
                required
              />
              <input
                value={title}
                type="text"
                placeholder="Title"
                name="from_title"
                onChange={(e) => setTitle(e.target.value)}
                className="md:w-1/2 md:text-base text-sm outline-none border-b border-solid border-[#333] my-4"
              />
              <input
                value={desc}
                type="text"
                placeholder="Desc"
                name="message"
                onChange={(e) => setDesc(e.target.value)}
                className="md:w-1/2 md:text-base text-sm outline-none border-b border-solid border-[#333] my-4"
              />
              <button className="mt-2 outline-none bg-blue-700 text-white md:text-base text-sm rounded-xl py-1 px-3 cursor-pointer border-solid border border-transparent hover:bg-white hover:text-blue-700 hover:border-blue-700 my-2">
                Send
              </button>
            </form>
            <AiOutlineClose
              onClick={handleCloseForm}
              className="absolute top-4 r-4 text-lg cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
