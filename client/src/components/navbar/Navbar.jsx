import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { logout } from "../../redux/authSlice";
import { request } from "../../util/fetchAPI";

const Navbar = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMobileNav, setShowMobileNav] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append("filename", filename);
      formData.append("image", photo);

      const options = {
        Authorization: `Bearer ${token}`,
      };

      await request("/upload/image", "POST", options, formData, true);
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const data = await request("/property", "POST", options, {
        ...state,
        img: filename,
      });
      console.log(data);

      setShowForm(false);
      // dispatch(updateUser(data))
      // window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`sticky top-0 left-0 h-16 w-full bg-transparent z-50  ${
        isScrolled && "w-full bg-transparent shadow-lg drop-shadow-lg text-blue-800 font-bold"
      }`}
    >
      <div className="md:max-w-7xl w-full h-full my-0 mx-auto justify-between items-center py-1 px-5 text-blue-800 font-bold md:flex hidden">
        <Link
          to="/"
          onClick={scrollToTop}
          className="text-2xl font-bold flex items-center gap-2 text-[#3512d1]"
        >
          Real Estate <BsHouseDoor />
        </Link>
        <ul className="flex justify-center items-center gap-5 cursor-pointer text-lg">
          <li
            onClick={scrollToTop}
            className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] "
          >
            Home
          </li>
          <li className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] ">
            About
          </li>
          <li className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] ">
            Featured
          </li>
          <li className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] ">
            Contacts
          </li>
        </ul>
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/signup">Sign up</Link>
              <Link to="/signin">Sign in</Link>
            </>
          ) : (
            <>
              <span>{user.username}!</span>
              <span className="cursor-pointer text-[#222] transition-all ease-in-out duration-150" onClick={handleLogout}>
                Logout
              </span>
              <Link
                onClick={() => setShowForm(true)}
                className="py-1 px-3 bg-[#2500ac] text-white rounded-xl cursor-pointer transition-all ease-linear duration-150 hover:text-[#efefef] hover:bg-[#340cb8]"
              >
                List your property
              </Link>
            </>
          )}
        </div>
      </div>
      {!showMobileNav && showForm && (
        <div
          className="absolute top-0 right-0 h-screen w-full bg-[rgba(0,0,0,0.45)] flex items-center justify-center z-50"
          onClick={handleCloseForm}
        >
          <div
            className="relative bg-white h-[87.5] w-[35vw] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center my-9 mx-0">List Property</h2>
            <form onSubmit={handleListProperty}>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleState}
              />
              <input
                type="text"
                placeholder="Type"
                name="type"
                onChange={handleState}
              />
              <input
                type="text"
                placeholder="Desc"
                name="desc"
                onChange={handleState}
              />
              <input
                type="text"
                placeholder="Continent"
                name="continent"
                onChange={handleState}
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleState}
              />
              <input
                type="number"
                placeholder="Sq. meters"
                name="sqmeters"
                onChange={handleState}
              />
              <input
                type="number"
                placeholder="Beds"
                name="beds"
                step={1}
                min={1}
                onChange={handleState}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "50%",
                }}
              >
                <label
                  htmlFor="photo"
                  className="flex items-center gap-3 text-lg mr-4"
                >
                  Property picture <AiOutlineFileImage />
                </label>
                <input
                  type="file"
                  id="photo"
                  style={{ display: "none" }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              <button>List property</button>
            </form>
            <AiOutlineClose
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-xl cursor-pointer"
            />
          </div>
        </div>
      )}
      {
        <div className="flex w-full h-full items-center md:hidden text-[#3512d1] font-bold text-lg">
          {showMobileNav && (
            <div className="w-screen h-full fixed top-0 left-0 z-50 flex bg-[#efefef] justify-around items-center flex-col gap-10">
              <Link
                to="/"
                onClick={scrollToTop}
                className="text-2xl font-bold flex items-center gap-2 text-[#3512d1]"
              >
                Real Estate <BsHouseDoor />
              </Link>
              <AiOutlineClose
                className="absolute top-6 right-4 text-2xl"
                onClick={() => setShowMobileNav(false)}
              />
              <ul className="flex justify-center items-center gap-3 cursor-pointer text-lg">
                <li
                  onClick={scrollToTop}
                  className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] "
                >
                  Home
                </li>
                <li className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] ">
                  About
                </li>
                <li className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] ">
                  Featured
                </li>
                <li className="text-[#222] transition-all duration-150 ease-in-out hover:text-[#555] ">
                  Contacts
                </li>
              </ul>
              <div className="flex items-center gap-3">
                {!user ? (
                  <>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/signin">Sign in</Link>
                  </>
                ) : (
                  <>
                    <span>Hello {user.username}!</span>
                    <span
                      className="w-8 h-8 object-cover rounded-[50%] mr-4"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                    <Link
                      onClick={() => setShowForm(true)}
                      className="py-1 px-3 bg-[#2500ac] text-white rounded-xl cursor-pointer transition-all ease-linear duration-150 hover:text-[#efefef] hover:bg-[#340cb8]"
                    >
                      List your property
                    </Link>
                  </>
                )}
              </div>
              {showForm && (
                <div
                  className="absolute top-0 right-0 h-screen w-full bg-[rgba(0,0,0,0.45)] flex items-center justify-center z-50"
                  onClick={handleCloseForm}
                >
                  <div
                    className="relative bg-white h-[87.5] w-[35vw] rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-center my-9 mx-0">List Property</h2>
                    <form onSubmit={handleListProperty}>
                      <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleState}
                      />
                      <input
                        type="text"
                        placeholder="Type"
                        name="type"
                        onChange={handleState}
                      />
                      <input
                        type="text"
                        placeholder="Desc"
                        name="desc"
                        onChange={handleState}
                      />
                      <input
                        type="text"
                        placeholder="Continent"
                        name="continent"
                        onChange={handleState}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={handleState}
                      />
                      <input
                        type="number"
                        placeholder="Sq. meters"
                        name="sqmeters"
                        onChange={handleState}
                      />
                      <input
                        type="number"
                        placeholder="Beds"
                        name="beds"
                        step={1}
                        min={1}
                        onChange={handleState}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          width: "50%",
                        }}
                      >
                        <label htmlFor="photo">
                          Property picture <AiOutlineFileImage />
                        </label>
                        <input
                          type="file"
                          id="photo"
                          style={{ display: "none" }}
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo && <p>{photo.name}</p>}
                      </div>
                      <button>List property</button>
                    </form>
                    <AiOutlineClose
                      onClick={handleCloseForm}
                      className="absolute top-4 right-4 text-xl cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {!showMobileNav && (
            <GiHamburgerMenu
              onClick={() => setShowMobileNav((prev) => !prev)}
              className="block ml-4 text-3xl text-blue-600"
            />
          )}
        </div>
      }
    </div>
  );
};

export default Navbar;
