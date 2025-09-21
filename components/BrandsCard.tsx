import React from 'react'
import {Brand} from "./BrandsGrid" 

interface BrandProps {
  brand: Brand;
}

export default function BrandsCard({ brand }: BrandProps) {

  const { image, name} = brand
  return (
   
       <div
          
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-green-500 hover:shadow-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            {/* Logo Container */}
            <div className="aspect-[3/2] p-8 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={image}
                  alt={`${name} logo`}
                  className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            </div>

            {/* Brand Name */}
            <div className="px-6 pb-6 text-center">
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {name}
              </h3>
            </div>
        
    </div>
  )
}
