import React from "react";
import { FiSend } from "react-icons/fi";

const NewsLetter = () => {
  return (
    <div className="h-full w-full mt-32">
      <div className="max-w-7xl h-full my-0 mx-auto flex flex-col items-center">
        <div className="flex items-center flex-col gap-2">
          <h5 className="text-[#777] text-lg font-medium">
            Want to get the latest offers?
          </h5>
          <h2 className="text-xl text-[#333]">
            Send is your email and we will do the rest
          </h2>
        </div>
        <div className="mt-10 border-solid border border-[#333] rounded-2xl h-[50px] w-[360px] py-1 px-2 flex justify-between items-center">
          <input type="email" placeholder="Type email..." className="outline-none border-none pl-2 focus-within:border focus-within:border-solid focus-within:border-[#777]" />
          <FiSend className="text-lg mr-2" />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
