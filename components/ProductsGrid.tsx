import { getProducts } from '@/app/actions/products.action';
import React from 'react'
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';
import SearchInput from './SearchInput';

export default async function ProductsGrid() {
  
    const response = await getProducts();
    const products = response?.data;
  return (
   <> 
        <SearchInput>
      <input type="search" className=" border border-slate-300 w-full px-4 py-2 rounded-2xl
             focus:outline-none
             focus:ring-4 focus:ring-[rgba(194,219,254,0.6)] focus:border-[rgba(134,183,254,0.95)]" id="search" placeholder="Search..."/>
    </SearchInput>
      <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-40 max-sm:px-10">
  
      {products.map((product:Product)=>(
               
    <ProductCard key={product._id} product={product} />
      ))}
    </div>
   </>
  
  )
}
