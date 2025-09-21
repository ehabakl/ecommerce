"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper/types';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Category } from "@/types/category";

export default function Slider({category}:{category:Category[]}) {

const [mounted, setMounted] = useState(false);
const swiperRef = useRef<SwiperType | null>(null);
useEffect(() => setMounted(true), []);

  if (!mounted) {
    // reserve space or show skeleton to avoid jump
    return <div style={{ height: "324px" }} />; 
  }
  
  return (
    
    <div className=" flex mx-auto text-center  w-full my-15">
      <div className="relative h-full w-full">
        { mounted && (
             <Swiper
           breakpoints={{
    640: {
      slidesPerView: 3, // 3 slides on small tablets
     
    },
    768: {
      slidesPerView: 4, // 4 slides on tablets
      
    },
    1024: {
      slidesPerView: 6, // 6 slides on desktop
     
    },
  }}
          className="mySwiper swiper-h w-full h-full"
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
            initialSlide={0}  // prevent flash

        >
          {category?.map((cat) => <>
              <SwiperSlide className="flex flex-col h-full " key={cat._id}>
            {/* Image without fill - takes its natural space */}
            <div className="flex-1 overflow-hidden h-70">
              <Image
                alt="image"
                src={cat.image}
                width={200} // Set explicit width
                height={160} // Set explicit height
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text flows naturally below */}
            <p className="text-xl font-bold  p-2 text-start">
              {cat.name}
            </p>
          </SwiperSlide>
          </>)}
        
        
        </Swiper>
        )}
       
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-40">
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
    </div>
  );
}
