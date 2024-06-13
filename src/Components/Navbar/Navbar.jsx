import React, { useState, useEffect } from "react";

// import firebase from "../../config/firebase-config";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";

import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const Navbar = (props) => {

  const navigate = useNavigate();

  const { handleLogout, isLoggingOut } = useLogout();
	const authUser = useAuthStore((state) => state.user);

  console.log(authUser)


  return (
    <>
      <div className="flex justify-around items-center">
        <div>
          <img className="h-28 w-full" src={logo} alt="store"></img>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className=" font-inter text-base font-medium tracking-normal leading-none text-center mr-2">
              Whish List
            </p>
          </div>

          {authUser ? ( 
          <Link to={`${authUser.username}`}>
             <div className="flex flex-row items-center cursor-pointer">
             <p className=" font-inter text-base font-medium tracking-normal leading-none text-center ">
               My Profile
             </p>
             </div>
          </Link>
           ) : (
             <div></div>
          ) 
        }
          <div className="flex flex-row items-center cursor-pointer pl-4">
            <div>
               {authUser ? (
                <div
                  onClick={handleLogout}
                >
                  <Tooltip content="Sign Out" placement="bottom">
                    <p className="font-inter text-sm font-medium tracking-normal leading-none">
                      Hi {authUser.username}
                    </p>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Link to="/auth">Login / SigUp</Link>
                </div>
              )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black p-4 w-full flex items-center justify-center mx-auto">
        <p className="text-white font-inter text-base font-medium ">50& OFF</p>
        <p className="text-white font-inter text-base font-medium mx-96">
          Free shipping and returns
        </p>
        <p className="text-white font-inter text-base font-medium ">
          Diffrent payment methods
        </p>
      </div>
    </>
  );
};

export default Navbar;