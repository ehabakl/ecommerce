"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper , SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper/types';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function Landing() {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className=" flex container mx-auto text-center flex-col sm:flex-row w-[75vw] md:w-[50vw] h-[100vh] sm:h-[70vh] md:h-[60vh] bg-slate-200 md:aspect-[4/4] lg:aspect-[5/4] mt-20">
      <div className="relative sm:w-1/2 bg-red-300 h-full w-full">
        <Swiper
          className="mySwiper swiper-h w-full h-full"
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide className="relative ">
            <Image
              alt="image"
              src={"/3.avif"}
              sizes="100%"

              fill
              priority
              className="object-cover"
            />{" "}
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <Image
              alt="image"
              src={"/2.avif"}
            sizes="100%"

              fill
              priority
              className="object-cover"
            />{" "}
          </SwiperSlide>
          <SwiperSlide className="relative ">
            <Image
              alt="image"
              src={"/1.avif"}
              sizes="100%"

              fill
              priority
              className="object-cover"
            />{" "}
          </SwiperSlide>
        </Swiper>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3 z-50">
          {/* Prev bullet */}
          <button
            onClick={() => swiperRef.current.slidePrev()}
            className="w-4 h-2  rounded-full cursor-pointer bg-gray-400 hover:bg-green-500 transition"
          ></button>

          {/* Next bullet */}
          <button
            onClick={() => swiperRef.current.slideNext()}
            className="w-4 h-2 rounded-full cursor-pointer bg-gray-400 hover:bg-green-500 transition"
          ></button>
        </div>
      </div>
      <div className=" sm:w-1/2  h-full w-full mt-2 sm:m-0">
        <h2 className="h-1/2 w-full relative">
          <Image
            alt="image"
            src={"/4.avif"}
            fill
            priority
            className="object-cover"
             sizes="100%"


          />
        </h2>
        <h2 className="h-1/2 w-full relative">
          <Image
            alt="image"
            src={"/5.avif"}
            fill
            priority
            className="object-cover"
             sizes="100%"


          />
        </h2>
      </div>
    </div>
  );
}
