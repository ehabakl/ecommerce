"use client";

import { use, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState(null)
  interface Inputs {
    name: string;
    email: string;
    phone: string;
    password: string;
    rePassword: string;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const password = watch("password");

  async function  onSubmit(values: Inputs) {
   
   
    try {
       const responnse = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
    console.log(responnse.data);
    setErrorMessage(null)
    if(responnse?.data?.message === "success") {
      router.push("/login")
    }
    } catch (error : unknown) {
     if (axios.isAxiosError(error)) {
        console.log("error message: ", error.response?.data.message);
            setErrorMessage(error.response?.data.message)

      }
    }
  }

  // Manual revalidation handler
  const handleInputChange = async (fieldName: keyof Inputs) => {
    // Only trigger validation if the field has been validated before (has an error)
    if (errors[fieldName]) {
      await trigger(fieldName);
    }
      const rePasswordValue = getValues("rePassword");
      const passwordValue = getValues("password");
    // Special case for rePassword - also trigger when password changes
    if (fieldName === "password" && errors.rePassword ) {
      await trigger("rePassword");
    }
    if (fieldName === "password" &&  rePasswordValue !== passwordValue  && rePasswordValue !== "" ) {
      await trigger("rePassword");
    }
    if (fieldName === "password" &&  rePasswordValue === passwordValue  ) {
      await trigger("rePassword");
    }
    console.log(rePasswordValue , "rePasswordValue")
    console.log(passwordValue , "passwordValue")
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md lg:max-w-2xl lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us today and start your journey</p>
          {errorMessage && (
            <p className="text-red-400 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
              {errorMessage}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Name Fields */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z]{3,}$/,
                    message: "Name must be at least 3 letters (no numbers or symbols)",
                  },
                  onChange: () => handleInputChange("name"),
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                  onChange: () => handleInputChange("email"),
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
                    onChange: () => handleInputChange("password"),
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
            <div>
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="rePassword"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  {...register("rePassword", {
                    required: "rePassword is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                    onChange: () => handleInputChange("rePassword"),
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.rePassword && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.rePassword.message}
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
                    message: "Enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
                  },
                  onChange: () => handleInputChange("phone"),
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm p-2 bg-red-100 mt-2 border border-red-900 rounded">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}