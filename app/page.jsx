import WeatherInfo from "../components/weatherInfo";

export default function Home() {
  return (
    <>
      <div className=" navbackground w-full bg-white p-5 md:p-10 h-screen">
        <div className=" w-full lg:w-4/5 mx-auto border border-slate-400 border-l-0 border-t-0  h-full backdrop:blur-lg bg-[rgba(255,255,255,0.20)]">
          <h1 className="text-white mt-10 ml-5 inline-block border-b-8 border-rose-400 leading-2 p-2 text-xl md:text-4xl font-bold uppercase headingStyling">
            Weather update
          </h1>
          <WeatherInfo />
        </div>
      </div>
    </>
  );
}
