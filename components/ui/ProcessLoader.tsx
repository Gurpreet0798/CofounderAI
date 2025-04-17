"use client";
import { useState } from "react";
import { MultiStepLoader as Loader } from "./multi-step-loader";

const loadingStates = [
  {
    text: "Starting Connection",
  },
  {
    text: "Searching Google",
  },
  {
    text: "Collecting Data",
  },
  {
    text: "Generating Email",
  },
  {
    text: "Making It Cool",
  },
  {
    text: "Sending Email",
  },
  {
    text: "Making It Cool",
  },
  {
    text: "Almost Done",
  },
];

export function ProcessLoader({handleOnClick}:any) {
  const [loading, setLoading] = useState(false);
  const mainProcess = async ()=>{
    try {
      setLoading(true)
      await handleOnClick()
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

      {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
      <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-28"
      onClick={
        () => {
         mainProcess()
        }
      }
      >
           Generate Now
            </button>
{/* 
      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )} */}
    </div>
  );
}
