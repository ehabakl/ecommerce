"use client";

// import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartContext } from "@/app/context/CartContext";
import  { payInCash , payOnline } from "../actions/payment.action";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)
 
  interface Inputs {
    details: string;
    phone: number;
    city: string;
  }
  const { cartDetails, setCartDetails } = useCartContext();

  const cartId = cartDetails?.cartId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  async function onSubmit(values: Inputs) {


    if (paymentMethod === "cash"){
         try {
      const response = await payInCash(cartId as string, values);

      if (response?.data?.status === "success") {
        setCartDetails(null);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }



    }
    else if (paymentMethod === "online"){
         try {
      const response = await payOnline(cartId as string, values);

      if (response?.data?.status === "success") {
        // setCartDetails(null);
        // router.push("/");
        window.location.href = response.data.session.url
      }
    } catch (error) {
      console.log(error);
    }






    }

 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md lg:max-w-2xl lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          {errorMessage && (
            <p className="text-red-400 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
              {errorMessage}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* details Fields */}
            <div>
              <label
                htmlFor="Details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Details
              </label>
              <input
                type="text"
                id="Details"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your Details"
                {...register("details", {
                  required: "Details is required",
                })}
              />
              {errors.details && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.details.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                city
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your city"
                {...register("city", {
                  required: "city is required",
                })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(\+20|0020|20|0)?(10|11|12|15)[0-9]{8}$/,
                    message:
                      "Enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <RadioGroup onValueChange={(value) => setPaymentMethod(value as "cash" | "online")}>
              <div className="flex items-center space-x-2 cursor-pointer my-3">
                <RadioGroupItem value="cash" id="cash"      className="data-[state=checked]:text-black [&_circle]:fill-black"/>
                <Label htmlFor="cash">Cash Payment</Label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="online" id="online"       className="data-[state=checked]:text-black [&_circle]:fill-black"/>
                <Label htmlFor="online">Online Payment</Label>
              </div>
            </RadioGroup>
            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer  w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 border-transparent border-2 hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,128,0,0.4)] transition-all duration-300 ease-in-out"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
