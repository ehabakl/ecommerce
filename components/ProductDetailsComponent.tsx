"use client";

import { Heart, Star } from "lucide-react";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { ProductDetails } from "@/types/productDetailsComp";
import { useCartContext } from "@/app/context/CartContext";
import { addProductToCart } from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import { Swiper as SwiperType } from 'swiper/types';

export default function ProductDetailsComponent({productDetails}:{productDetails:ProductDetails}) {

   const {fetchCartData} = useCartContext();
    async function handleAddToCart (productId : string){
      const response = await addProductToCart(productId);
      toast.success(response?.message);
      await fetchCartData()
    }

  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="w-full max-w-6xl mx-auto  bg-white">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Product Image Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center relative">
          <div className="relative bg-gray-200 rounded-lg  w-full max-w-md h-[500px] flex items-center justify-center">
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
              {productDetails.images.map((imageUrl, index) => (
                 <SwiperSlide className="relative " key={index}>
                <Image
                  src={imageUrl}
                  alt="Brown checkered long sleeve tunic"
                  className="w-full h-full object-cover"
                  fill
                  sizes="100%"
                  priority
                />
              </SwiperSlide>
              ))}
             
            </Swiper>
          </div>
          {/* Pagination dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3 z-50 top-[104%]">
            {/* Prev bullet */}
            <button
              onClick={() => swiperRef?.current?.slidePrev()}
              className="w-4 h-2  rounded-full cursor-pointer bg-gray-400 hover:bg-green-500 transition"
            ></button>

            {/* Next bullet */}
            <button
              onClick={() => swiperRef?.current?.slideNext()}
              className="w-4 h-2 rounded-full cursor-pointer bg-gray-400 hover:bg-green-500 transition"
            ></button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
              {productDetails.title}
            </h1>
            <p className="text-gray-600 text-sm">
              {productDetails.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-gray-900">{productDetails.price}EGP</span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-900 font-medium">{productDetails.ratingsAverage}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleAddToCart(productDetails._id)} className="flex-1 bg-green-600 hover:bg-green-500 text-white  font-medium py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
              + Add
            </button>
            <button className="p-3 rounded-lg transition-colors duration-200">
              <Heart className="w-6 h-6 text-black fill-black cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
