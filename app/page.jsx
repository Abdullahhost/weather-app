import WeatherInfo from "../components/weatherInfo";
export default function Home() {
  return (
    <>
      <div className="w-full h-full lg:h-[91vh]">
        <div className=" w-full mx-auto border border-slate-400 border-l-0 border-t-0  h-full backdrop:blur-lg bg-[rgba(255,255,255,0.20)]">
          <WeatherInfo />
        </div>
      </div>
    </>
  );
}
