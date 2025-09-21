"use client";

import {   useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React from "react";


import { signIn } from 'next-auth/react';
import { useCartContext } from "@/app/context/CartContext";

export default function Login() {
 
  const [errorMessage, setErrorMessage] = useState(null)
  const {fetchCartData} = useCartContext()
  interface Inputs {
    email: string;
    password: string;
  }

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,

    
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });


  async function  onSubmit(values: Inputs) {
   
   
    try {
       const responnse = await signIn('credentials',{
        email: values.email,
        password: values.password,
           redirect: true, 
           callbackUrl: '/' 
       })
       if(responnse?.ok){
        await fetchCartData()
       }
    } catch (error ) {
     console.log(error);
    }
  }

  // Manual revalidation handler



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md lg:max-w-2xl lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In
          </h1>
          {errorMessage && (
            <p className="text-red-400 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
              {errorMessage}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Name Fields */}
       

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Create a strong password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value: /^[A-Za-z][A-Za-z0-9]{5,8}$/,
                      message: "Password must start with a letter, 6–9 chars, only letters & numbers",
                    },
              
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
       

            {/* Phone Field */}
        

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign In
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                
                <Link
                  href="/forget-password"
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  forgot your password
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}