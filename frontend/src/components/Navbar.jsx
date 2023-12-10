import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "./Menu";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Search } from "./Search";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [color, setColor]=useState(false);
  const handleColor=()=>{
    if(window.scrollY>=90){
      setColor(true);
    }
    else{
      setColor(false);
    }
  }
  window.addEventListener('scroll', handleColor)

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={color ? `sticky top-0 bg-slate-200`: `sticky top-0 bg-transparent`}> 
         <div className="flex items-center justify-between px-6 md:px-[200px] py-4  md:justify-between">
      <h1 className="text-3xl font-extrabold">
        <Link to="/">Sugam</Link>
      </h1>

      <div className="hidden md:flex justify-center items-center space-x-5">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Search"
          className=" outline-none h-[50%] text-black text-center font-semibold font-mono p-1 bg-transparent"
        />
        <FaSearch
          className="cursor-pointer"
          onClick={() => {
            prompt ? navigate(`/?search=${prompt}`) : navigate(`/`);
          }}
        />
      </div>

      <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <h3>
            <Link to="/profile/1">Profile</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
        {user ? (
          <h3>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </h3>
        ) : (
          <h3></h3>
        )}
      </div>
      <div className="md:hidden">
        <p>
          <GiHamburgerMenu
            onClick={showMenu}
            className="w-full cursor-pointer"
          />
        </p>
        {menu ? <Menu /> : ""}
      </div>
    </div>
    </div>

  );
};

export default Navbar;
