import { getSingleProduct } from '@/app/actions/products.action';
import React from 'react'
import ProductDetailsComponent from '@/components/ProductDetailsComponent';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const productResponse = await getSingleProduct({ id });

  if (!productResponse || !productResponse.success) {
    // handle error case gracefully
    return <div className="mt-30">Product not found</div>;
  }

  const { data } = productResponse;

  return (
    <div className="mt-30">
      <ProductDetailsComponent productDetails={data} />
    </div>
  );
}
