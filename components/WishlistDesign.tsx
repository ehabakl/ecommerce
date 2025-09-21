"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useWishlistContext } from "@/app/context/WishlistContext";
import React from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import {  removeProductFromWishlist } from "@/app/actions/wishlist.action";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { addProductToCart } from "@/app/actions/cart.action";
import { useCartContext } from "@/app/context/CartContext";
 export default function WishlistDesign() {
  const pathname = usePathname();
  const { wishListMainData, wishlistDetails, fetchWishlistData } = useWishlistContext();
  const {  fetchCartData } = useCartContext();
  const [isLoading, setIsLoading] = useState(true);

  const wishlistItemsNum = wishListMainData?.count || 0;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchWishlistData();
      setIsLoading(false);
    };
    
    loadData();
  }, [pathname]);

  async function handleDeleteProduct(productId: string) {
    setIsLoading(true);
    toast.success("item removed from wishlist");
    await removeProductFromWishlist(productId);
    await fetchWishlistData();
    setIsLoading(false);
  }
  async function handleAddProduct(productId: string) {
    setIsLoading(true);
    toast.success("item added to cart");
    await addProductToCart(productId);
    await removeProductFromWishlist(productId);
    await fetchWishlistData();
    await fetchCartData();
    setIsLoading(false);
  }

  // Show loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-fit mt-32">
      {/* Header */}
      <div className="my-4 ">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
      </div>

      {/* Wishlist Items */}
      {wishlistItemsNum > 0 && (
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          {wishlistDetails?.map((product) => (
       <div key={product._id} className="flex justify-between items-center border-b-2 border-gray-300">
             <div
              className="flex items-center gap-6  p-3"
           
            >
              {/* Product Image */}
              <div className="w-32 h-40 flex-shrink-0 relative">
                <Image
                  src={product?.imageCover}
                  alt="img"
                  fill
                  sizes="100%"
                  priority
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <p className="text-gray-600 mb-2">{product.price} EGP</p>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="text-lg">
                    <Trash className="w-5 h-5 stroke-red-500 fill-red-500" />
                  </span>
                  Remove
                </button>
              </div>
            </div>
            <button onClick={()=>handleAddProduct(product._id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer">
              add to cart
            </button>

       </div>
          ))}
        </div>
      )}

      {/* Empty Wishlist */}
      {wishlistItemsNum === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your Wishlist is empty</p>
        </div>
      )}
    </div>
  );
}