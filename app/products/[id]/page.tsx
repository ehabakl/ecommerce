import { getSingleProduct } from '@/app/actions/products.action';
import React from 'react'
import ProductDetailsComponent from '@/components/ProductDetailsComponent';

export default async function ProductDetails({params}:{params:{id:string}}) {
    const {id} =  await params;
    console.log(id);
    const {data} = await getSingleProduct({id});
    console.log(data);
  return (
    <div className='mt-30 '>
    
      <ProductDetailsComponent productDetails = {data} />
    </div>
  )
}
