"use client";

import useFetch from "../../hooks/useFetch";
import Image from "next/image";
import { useSelector } from "react-redux";

const WeatherInfo = () => {
  const getSearchValue = useSelector((state) => state.search.searchValue);
  console.log(getSearchValue);

  const appId = "442b8c73241930713f467c57509395e8";
  const { data } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${getSearchValue}&appid=${appId}&units=metric`
  );
  console.log(data);

  const temparature = data?.main?.temp;

  return (
    <div className="mt-[10rem]">
      <div className="w-full flex flex-wrap items-center gap-2 md:gap-4 justify-center">
        <div className="w-[300px] border min-h-[150px] grid place-items-center bg-green-200">
          {/* <Image
            className="rounded-full bg-slate-600"
            src={`https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
            width={80}
            height={80}
            alt="WeatherImage"
          /> */}
        </div>
        <div className="w-[300px] border min-h-[150px] grid place-items-center p-4 bg-blue-200">
          <h1 className="text-4xl text-white font-semibold">
            {temparature} <sup>&#176;</sup>C
          </h1>
          <h1 className="text-xl text-slate-700 font-semibold">
            Humadity : {data?.main?.humidity} %
          </h1>
          <h1 className="text-md text-slate-700">
            Wind : {data?.wind?.speed.toFixed()}
          </h1>
          <h1 className="text-md text-slate-700">
            {data?.weather[0]?.description}
          </h1>
        </div>
        <div className="w-[300px] border min-h-[150px] grid place-items-center bg-violet-300 p-4">
          <h1 className="text-4xl text-white font-semibold">{data?.name}</h1>
          <h1 className="text-md text-slate-700">
            Lat: {data?.coord?.lat} & Lon: {data?.coord?.lon}
          </h1>
          <h1 className="text-md text-slate-700">
            Max Temp : {data?.main?.temp_max}
          </h1>
          <h1 className="text-md text-slate-700">
            Min Temp: {data?.main?.temp_min}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
