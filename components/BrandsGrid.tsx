
import { getBrands } from '@/app/actions/brands';
import React from 'react';
import BrandsCard from './BrandsCard';

export interface Brand {
  _id :string ,
  image : string ,
  name :string,
}

export default async function  BrandsGrid ()  {
const response = await getBrands()
  const brands  = response?.data


  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-12 text-green-600">
        All Brands
      </h1>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand : Brand) => (
         <BrandsCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

