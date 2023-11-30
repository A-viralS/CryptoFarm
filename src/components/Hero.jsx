import { useNavigate } from "react-router-dom";
import { setGlobalState, useGlobalState } from "../store";
import React from "react";

import herofarm from "../images/herofarm.jpg";
import farm2 from "../images/farm2.png";
import farm3 from '../images/hero3.png'

const Hero = () => {
  const [stats] = useGlobalState("stats");
  const navigate = useNavigate();
  const navigateToShopPage = () => {
    navigate("/shop"); // Replace '/shop' with the actual URL of your shop page
  };
  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6">
      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold
      tracking-tight mb-12"
      >
        <span className="font-gilroy">Welcome on</span>
        <br />
        <span className="uppercase text-green-600 font-hanson">crypto farm.</span>
      </h1>
      <div className=" justify-between">

        <div className=" absolute top-[5rem]">
          <img src={herofarm} alt="error" className=" w-[30rem] h-[20rem]"/>
        </div>

      <div className="flex justify-center items-center space-x-2 font-gilroy">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
        text-white font-medium text-xs leading-tight uppercase
        rounded-full shadow-md hover:bg-green-700 "
          onClick={() => setGlobalState("createModal", "scale-100")}
        >
          Investment Required
        </button>

        <button
          type="button"
          className="inline-block px-6 py-2.5 border border-green-600
        font-medium text-xs leading-tight uppercase text-green-600
        rounded-full shadow-md bg-transparent hover:bg-green-700
        hover:text-white hover:shadow-xl transition duration-300 "
        >
          Invest in Farm
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
    text-white font-medium text-xs leading-tight uppercase
    rounded-full shadow-md hover:bg-green-700"
          onClick={navigateToShopPage}
        >
          Shop Products
        </button>
      </div>

      <div className=" absolute right-3 top-[5rem]">
        <img src={farm3} alt="error" className=" w-[30rem] h-[20rem]"/>
      </div>

      </div>

      <div className="flex justify-center items-center mt-10">
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full rounded-xl"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalProjects || 0}
          </span>
          <span className=" font-gilroy">Projects</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full rounded-xl"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalBacking || 0}
          </span>
          <span className=" font-gilroy">Backings</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full rounded-xl"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalDonations || 0} ETH
          </span>
          <span className=" font-gilroy">Donated</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
