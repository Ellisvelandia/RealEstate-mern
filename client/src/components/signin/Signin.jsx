import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { request } from "../../util/fetchAPI";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const options = {
        "Content-Type": "application/json",
      };

      const data = await request("/auth/login", "POST", options, {
        email,
        password,
      });

      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 min-h-screen w-screen bg-[url('../../assets/estate2.jpg')] bg-cover bg-blend-darken flex justify-center items-center">
      <div className="lg:h-[55.5vh] lg:w-[27.5vw] md:w-2/4 w-4/5 h-full py-8 rounded-2xl flex flex-col bg-white">
        <h2 className="text-[#171097] text-center mt-10 mx-0 lg:text-4xl text-xl my-4">
          Sign in
        </h2>
        <form
          onSubmit={handleLogin}
          className="w-full h-full flex flex-col my-4 items-center justify-center outline-none border-b border-solid border-[#333]"
        >
          <input
            className="md:w-1/2 outline-none text-base border-b border-solid border-[#333] flex items-center my-4"
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="md:w-1/2 text-base outline-none border-b border-solid border-[#333] my-4"
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="outline-none bg-blue-700 text-white lg:text-lg text-base rounded-xl py-2 px-5 cursor-pointer border-solid border border-transparent hover:bg-white hover:text-blue-700 hover:border-blue-700"
            type="submit"
          >
            Sign in
          </button>
          <p className="text-center md:text-base text-sm text-black flex flex-col justify-center tracking-widest mt-4">
            Already have an account? <Link to="/signup" className="md:text-base text-sm text-[#888] pt-1">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
