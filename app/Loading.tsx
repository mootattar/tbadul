import React from "react";

export default function Loading() {
  return (
    /* From Uiverse.io by Javierrocadev */
    <div className="flex flex-row gap-2 w-screen h-screen justify-center items-center mt-20 bg-[#e2e8f0]">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce "></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.5s]"></div>
    </div>
  );
}
