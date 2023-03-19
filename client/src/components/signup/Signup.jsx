import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";
import { request } from "../../util/fetchAPI";

const Signup = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let filename = null;
      if (photo) {
        const formData = new FormData();
        formData.append("filename", filename);
        formData.append("image", photo);
        await request("/upload/image", "POST", {}, formData, true);
      } else {
        return;
      }

      const headers = {
        "Content-type": "application/json",
      };
      const data = await request("/auth/register", "POST", headers, {
        ...state,
        profileImg: filename,
      })
      // dispatch(register(data))
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-[url('../../assets/estate3.jpg')] bg-cover bg-blend-darken flex justify-center items-center">
      <div className="lg:h-[67.5vh] md:w-1/2 w-4/5 h-auto py-4 lg:w-[27.5vw] rounded-2xl flex flex-col bg-white">
        <h2 className="text-[#171097] text-center my-10 mx-0 lg:text-4xl text-2xl">
          Sign up
        </h2>
        <form
          className="flex flex-col items-center gap-10"
          onSubmit={handleSubmit}
        >
          <input
            className="lg:w-1/2 outline-none border-b border-solid border-[#333]"
            type="text"
            name="username"
            placeholder="Username..."
            onChange={handleState}
          />
          <input
            className="lg:w-1/2 outline-none border-b border-solid border-[#333]"
            type="email"
            name="email"
            placeholder="Email..."
            onChange={handleState}
          />
          <label
            className="self-center lg:w-1/2 text-base cursor-pointer transition-all ease-in-out duration-150 flex items-center gap-3 hover:text-[#444]"
            htmlFor="photo"
          >
            Upload photo <AiOutlineFileImage />
          </label>
          <input
            className="w-1/2 outline-none border-b border-solid border-[#333]"
            type="file"
            id="photo"
            style={{ display: "none" }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <input
            className="lg:w-1/2 outline-none border-b border-solid border-[#333]"
            type="password"
            name="password"
            placeholder="Password..."
            onChange={handleState}
          />
          <button
            className="outline-none bg-blue-700 text-white rounded-xl py-2 px-3 cursor-pointer border-solid border border-transparent hover:bg-white hover:text-blue-700 hover:border-blue-700"
            type="submit"
          >
            Register
          </button>
          <p className="text-center md:text-base text-sm text-black flex flex-col justify-center">
            Already have an account?{" "}
            <Link to="/signin" className="md:text-base text-sm text-[#888] pt-1">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
