"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HiUser, HiOutlineMail } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { searchSliceActions } from "../../setting/slice/searchSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const [toggleFocus, setToggleFocus] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);
  const inputRef = useRef(undefined);
  const userRef = useRef(undefined);
  const [searchValue, setSearchValue] = useState("");

  const { status, data: session } = useSession();

  const dispatch = useDispatch();
  const handlerKeyDown = (event) => {
    if (event.ctrlKey && event.key === "i") {
      setToggleFocus(!toggleFocus);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlerKeyDown);
    return () => {
      document.removeEventListener("keydown", handlerKeyDown);
    };
  }, [toggleFocus]);

  useEffect(() => {
    if (toggleFocus === true) {
      inputRef.current?.focus({ focusVisible: true });
    }
    if (toggleFocus === false) {
      inputRef.current?.focus({ focusVisible: false });
    }
  }, [toggleFocus]);

  useEffect(() => {
    let handler = (e) => {
      if (!userRef.current.contains(e.target)) {
        setUserPopUp(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleChange = (e) => {
    const data = e.target.value;
    data.toLowerCase();
    setSearchValue(data);
  };

  const formDate = new FormData();

  formDate.append("searchBtn", searchValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchSliceActions.setSearch(searchValue));
    inputRef.current.value = "";
    inputRef.current?.focus({ focusVisible: true });
    setSearchValue("");
    if (searchValue === "") {
      toast.error("oopps! you didn't enter any country name!");
    }
  };
  return (
    <>
      <div
        className="flex items-start
        
        justify-center
        md:justify-between
          w-full px-5 
          md:px-6
          md:py-2
          gap-9
          md:gap-[10rem]
          border-slate-300
          border-b 
          flex-wrap 
          md:flex-nowrap
        "
      >
        <div>
          <h1 className="font-bold underline decoration-wavy text-black decoration-4 underline-offset-8 decoration-teal-400 text-3xl">
            Weather
          </h1>
        </div>
        <div className="flex items-center justify-start gap-6 w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full flex gap-3 items-center"
          >
            <input
              className="shadow-sm p-3 cursor-pointer w-full rounded border  border-slate-400 bg-slate-100"
              type="search"
              placeholder="Press [ctrl + i] For search any city name"
              ref={inputRef}
              onChange={handleChange}
              name="searchBtn"
            />
            <input
              className=" min-w-fit p-2 border bg-blue-500 text-white rounded-md border-blue-800 ring-2 ring-offset-2 ring-blue-600 shadow-md"
              type="submit"
              value="Search City"
            />
          </form>
          {status !== "authenticated" ? (
            <div ref={userRef} className="min-w-fit">
              <button
                onClick={() => signIn("google")}
                className="bg-blue-500 text-white pr-3 font-semibold rounded shadow-md flex items-center gap-1"
              >
                <Image
                  className="bg-white mr-2"
                  src="/google.png"
                  alt="Image"
                  width={50}
                  height={50}
                />
                Sign in with Google
              </button>
            </div>
          ) : (
            <div
              ref={userRef}
              className=" min-w-fit flex items-center gap-2 relative"
            >
              <button onClick={() => setUserPopUp(!userPopUp)}>
                <Image
                  src={session?.user?.image}
                  width={40}
                  height={40}
                  alt="GImage"
                  className="rounded-full bg-slate-700 text-white w-[3.5rem] h-[3.3rem] text-center leading-[3.3rem] border-4 border-slate-300"
                />
              </button>

              <div
                className={`min-w-[300px] absolute top-14 right-0 shadow-lg bg-[rgba(211,116,255,0.42)] backdrop:blur-md text-white p-3 rounded z-50 ${
                  userPopUp ? "showMenu" : "closeMenu"
                }`}
              >
                <div className="flex items-center gap-2">
                  <HiUser size={20} />
                  <h1 className="text-2xl leading-10">{session?.user?.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineMail />
                  <h1 className="text-sm leading-10">{session?.user?.email}</h1>
                </div>
                <button
                  onClick={() => signOut()}
                  className="mt-4 w-full border bg-yellow-500 rounded text-sm p-1 uppercase text-left pl-6 shadow-2xl font-bold text-black"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
