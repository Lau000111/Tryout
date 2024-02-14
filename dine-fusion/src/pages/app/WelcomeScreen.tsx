import * as React from "react";

function WelcomeScreen() {
  return (
    <div className="flex flex-col pr-4 pb-12 mx-auto w-full font-bold text-center bg-white max-w-[480px]">
      <div className="flex flex-col pt-11 pl-3 w-full text-4xl leading-10 text-black whitespace-nowrap bg-amber-300 rounded-full">
        <div className="flex gap-2.5 justify-between">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7ff4575bfb13174585a7ebd88ebeca3fedeffada3d8e3d209cfa44dc291d364?apiKey=9253664459f648d7bd41c8f0841ddcc2&"
            className="max-w-full aspect-square w-[105px]"
          />
          <div className="grow my-auto">Dine Fusion</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a996a5a0c3b660054396998daf8ff69983f935889ae33f16760fad2a2d930151?apiKey=9253664459f648d7bd41c8f0841ddcc2&"
          className="z-10 self-center mt-16 mb-0 max-w-full aspect-[0.88] w-[214px]"
        />
      </div>
      <div className="mt-28 text-3xl leading-8 text-neutral-700">Welcome</div>
      <div className="mt-6 text-base leading-6 text-neutral-700">
        It’s a pleasure to meet you. We are excited that you’re here so let’s
        get started!
      </div>
      <div className="justify-center items-center px-16 py-5 mt-16 text-sm tracking-wider leading-6 text-white uppercase bg-lime-400 rounded-lg">
        Get Started
      </div>
    </div>
  );
}

export default WelcomeScreen;


