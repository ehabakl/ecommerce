"use client";
import { useCartContext } from "@/app/context/CartContext";
import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import {
  removeProductFromCart,
  updateCartProduct,
  cleartUserCart,
} from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";
import Link from "next/link";

export default function CartShop() {
  const pathname = usePathname();
  const { cartDetails, fetchCartData } = useCartContext();
  const [isLoading, setIsLoading] = useState(true);

  const cartItemsNum = cartDetails?.numOfCartItems || 0;

  console.log(cartDetails, "cartttttttttttttttttt");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCartData();
      setIsLoading(false);
    };

    loadData();
  }, [pathname]);

  async function handleDeleteProduct(productId: string) {
    const response = await removeProductFromCart(productId);
    console.log(response, "res after delete");
    toast.success("product deleted successfully");
    await fetchCartData();
  }
  async function handleUpdateProductCart(productId: string, count: number) {
    const response = await updateCartProduct(productId, count);
    console.log(response, "res after delete");
    toast.success("product updated successfully");
    await fetchCartData();
  }
  async function handleClearCart() {
    const response = await cleartUserCart();
    console.log(response, "res after delete");
    toast.success("cart cleared successfully");
    await fetchCartData();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen mt-32">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cart Shop</h1>
       <Link href = "/checkout">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-2xl cursor-pointer">
          check out
        </button>
       </Link>
      </div>

      {/* Price Summary */}
      <div className="flex justify-between items-center mb-8">
        <div className=" text-black px-4 py-2 rounded  text-2xl">
          <span >
            <span className="font-medium ">total price : </span>
            <span className="font-medium text-green-600 "> {cartDetails?.data?.totalCartPrice}</span>
          </span>
        </div>
        <div className=" text-black text-2xl px-4 py-2 rounded">
          <span className="font-medium ">
            <span  className="font-medium ">total number of items : </span> 
            <span className="font-medium text-green-600 ">{cartDetails?.numOfCartItems}</span>
          </span>
        </div>
      </div>

      {/* Cart Item */}
      {cartItemsNum > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {cartDetails?.data?.products?.map((product) => (
            <div
              className="flex items-center gap-6 border-b-2 border-gray-300 p-3"
              key={product._id}
            >
              {/* Product Image */}
              <div className="w-32 h-40 flex-shrink-0 relative">
                <Image
                  src={product?.product?.imageCover}
                  alt="img"
                  fill
                  sizes="100%"
                  priority
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <p className="text-gray-600 mb-2">{product.price} EGP</p>
                <button
                  onClick={() => handleDeleteProduct(product.product._id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="text-lg">
                    <Trash className="w-5 h-5 stroke-red-500 fill-red-500" />
                  </span>
                  Remove
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleUpdateProductCart(
                      product.product._id,
                      product.count + 1
                    )
                  }
                  className="w-10 h-10 border-2 border-green-500 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-50 font-bold text-lg transition-colors"
                >
                  +
                </button>
                <span className="text-xl font-medium w-8 text-center">
                  {product.count}
                </span>
                <button
                  onClick={() =>
                    handleUpdateProductCart(
                      product.product._id,
                      product.count - 1
                    )
                  }
                  className="w-10 h-10 border-2 border-green-500 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-50 font-bold text-lg transition-colors"
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear Cart Button */}
      {cartItemsNum > 0 && (
        <div className="text-center">
          <button
            onClick={handleClearCart}
            className="border-2 border-green-500 text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Clear Your Cart
          </button>
        </div>
      )}

      {/* Empty Cart Message */}
      {cartItemsNum === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}
