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
      <div className="h-[55.5vh] w-[27.5vw] rounded-2xl flex flex-col bg-white">
        <h2 className="text-[#171097] text-center mt-10 mx-0 text-4xl">
          Sign in
        </h2>
        <form
          onSubmit={handleLogin}
          className="w-full h-full flex flex-col items-center justify-center outline-none border-b border-solid border-[#333]"
        >
          <input
            className="w-1/2 outline-none border-b border-solid border-[#333] flex items-center mb-4"
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-1/2 outline-none border-b border-solid border-[#333] my-4"
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="outline-none bg-blue-700 text-white rounded-xl py-2 px-5 cursor-pointer border-solid border border-transparent hover:bg-white hover:text-blue-700 hover:border-blue-700"
            type="submit"
          >
            Sign in
          </button>
          <p className="text-center text-base text-black flex flex-col justify-center tracking-widest mt-4">
            Already have an account? <Link to="/signup" className="text-base text-[#888] pt-1">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
