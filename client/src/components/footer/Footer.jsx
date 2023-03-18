import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[400px] mt-20">
      <div className="max-w-7xl h-full my-0 mx-auto flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="mb-4 justify-self-start -ml-1">About the App</h2>
          <p className="max-w-[425px] text-[#555] text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem,
            dignissimos?
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-4 justify-self-start -ml-1">Contact</h2>
          <span>Phone: +123 456 789</span>
          <span>GitHub: </span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-4 justify-self-start -ml-1">Location</h2>
          <span>continent : South America</span>
          <span>Country : Colombia</span>
          <span>Current Location : Colombia - Tolima</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
