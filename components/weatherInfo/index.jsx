"use client";

import useFetch from "../../hooks/useFetch";
import Image from "next/image";
import { useSelector } from "react-redux";

import thunderImage from "../../public/thunderImage.webp";
import drizzleImage from "../../public/drizzleImage.webp";
import rainImage from "../../public/rainImage.webp";
import snowImage from "../../public/snowImage.jpg";
import fogImage from "../../public/fogImage.jpg";
import clearSkyImage from "../../public/clearSkyImage.jpg";
import fewCloudsImage from "../../public/fewCloudsImage.jpg";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { appIdSecret } from "@/app/api/user/route";

const LoadingDiv = () => {
  return (
    <div className="w-[300px] h-[160px] bg p-4  bg-[#0005] rounded-md">
      <h1 className="mb-4 p-5 bg-neutral-400 animationDiv"></h1>
      <h1 className="bg-neutral-400 p-2 mb-4 animationDiv"></h1>
      <h1 className="bg-neutral-400 p-2 mb-2 animationDiv"></h1>
      <h1 className="bg-neutral-400 p-2 animationDiv"></h1>
    </div>
  );
};

const WeatherInfo = () => {
  const getSearchValue = useSelector((state) => state.search.searchValue);
  const [imageName, setImageName] = useState(rainImage);
  const appId = "442b8c73241930713f467c57509395e8";
  console.log(appIdSecret);
  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${getSearchValue}&appid=${appId}&units=metric`
  );

  const temparature = data?.main?.temp;
  let iconId;
  useEffect(() => {
    iconId = data?.weather[0]?.id;

    if (iconId >= 200 && iconId < 300) {
      setImageName(thunderImage);
    }
    if (iconId >= 300 && iconId < 400) {
      setImageName(drizzleImage);
    }
    if (iconId >= 400 && iconId < 500) {
      setImageName(rainImage);
    }
    if (iconId >= 500 && iconId < 600) {
      setImageName(snowImage);
    }
    if (iconId >= 600 && iconId < 700) {
      setImageName(fogImage);
    }
    if (iconId >= 700 && iconId < 800) {
      setImageName(clearSkyImage);
    }
    if (iconId === 800) {
      setImageName(clearSkyImage);
    }
    if (iconId > 800) {
      setImageName(fewCloudsImage);
    }
  }, [imageName, data]);

  useEffect(() => {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
    }
  }, [error]);

  return (
    <div className="w-full h-full relative">
      <h1 className="text-white mt-10 ml-5 inline-block border-b-8 border-rose-400 leading-2 p-2 text-xl md:text-4xl font-bold uppercase headingStyling">
        Weather update
      </h1>

      {/* {error?.response?.status === 404 && (
        <div className=" top-0 left-0 w-full h-[91vh]  grid place-items-center absolute z-50 bg-[#0006] backdrop-blur-sm">
          <div className="bg-slate-300 flex flex-col gap-2 items-center p-5 relative">
            <span
              onClick={() => alert("Hi")}
              className="p-2 border bg-slate-400 rounded-full absolute top-2 right-2 cursor-pointer"
            >
              ❌
            </span>
            <Image
              src={noCountryImage}
              alt="bgImage"
              width={250}
              height={250}
            />
            <h1>No available country in the world!</h1>
          </div>
        </div>
      )} */}
      <Image
        src={imageName}
        alt="bgImage"
        width={500}
        height={500}
        className="absolute top-0 left-0 w-full h-full -z-50 object-cover"
      />

      <div className="w-full p-5 flex flex-wrap items-center gap-2 md:gap-4 justify-center mt-[10rem] backdrop-blur-sm bg-[#0002]">
        <div className="w-[300px] min-h-[150px] grid place-items-center relative mb-10 lg:mb-0 lg:mr-10 shadow-2xl">
          <div className="absolute top-2 right-4 w-10 h-10 rounded-full border-2">
            <Image
              src={`https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
              width={500}
              height={500}
              alt="WeatherImage"
              title={data?.weather[0]?.description}
            />
          </div>
          <Image
            className=" rounded-md"
            src={imageName}
            width={500}
            height={500}
            alt="WeatherImage"
          />
        </div>
        {loading ? (
          <LoadingDiv />
        ) : (
          <div className="rounded-md w-[300px] border-[#ffffff7a] border-r border-b min-h-[150px] grid place-items-center bg-[#0005] p-4">
            <h1 className="text-4xl text-white font-semibold mb-4">
              {temparature} <sup>&#176;</sup>C
            </h1>
            <h1 className="text-md text-neutral-100 font-semibold mb-1">
              Humadity : {data?.main?.humidity} %
            </h1>
            <h1 className="text-md text-neutral-100">
              Wind : {data?.wind?.speed.toFixed()} km/h
            </h1>
            <h1 className="text-md text-neutral-100">
              {data?.weather[0]?.description}
            </h1>
          </div>
        )}
        {loading ? (
          <LoadingDiv />
        ) : (
          <div className="rounded-md w-[300px] border-[#ffffff7a] border-r border-b min-h-[150px] grid place-items-center bg-[#0005] p-4">
            <h1 className="text-4xl text-white font-semibold mb-4">
              {data?.name}{" "}
              <sup
                style={{
                  color: "#fff8",
                  fontSize: "15px",
                  marginBottom: "10px",
                }}
              >
                {data?.sys?.country}
              </sup>{" "}
            </h1>
            <h1 className="text-md text-neutral-100 mb-1">
              Lat: {data?.coord?.lat} & Lon: {data?.coord?.lon}
            </h1>
            <h1 className="text-md text-neutral-100 ">
              Max Temp : {data?.main?.temp_max}
            </h1>
            <h1 className="text-md text-neutral-100">
              Min Temp: {data?.main?.temp_min}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;
