"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Menu, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCartContext } from "@/app/context/CartContext";

export default function Navbar() {
  const { cartDetails } = useCartContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const session = useSession();


  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow  max-sm:px-10">
      <NavigationMenu className="container max-w-7xl mx-auto flex justify-between py-4 sm:px-5 ">
        <NavigationMenuList>
          <NavigationMenuItem className="text-2xl font-semibold flex gap-2 cursor-pointer">
            <ShoppingCart className="text-green-600" />
            <Link href={"/"}>Fresh Cart</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="hidden md:flex gap-6 text-1xl font-semibold">
          <NavigationMenuItem>
            <Link
              href={"/"}
              className={pathName === "/" ? "text-green-600" : ""}
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"/cart"}
              className={pathName === "/cart" ? "text-green-600" : ""}
            >
              Cart
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"/wishList"}
              className={pathName === "/wishList" ? "text-green-600" : ""}
            >
              Wish List
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"/products"}
              className={pathName === "/products" ? "text-green-600" : ""}
            >
              Products
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"/categories"}
              className={pathName === "/categories" ? "text-green-600" : ""}
            >
              Categories
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"/brands"}
              className={pathName === "/brands" ? "text-green-600" : ""}
            >
              Brands
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} className="cursor-pointer" />
            ) : (
              <Menu size={28} className="cursor-pointer" />
            )}
          </button>

          <NavigationMenuList className="hidden md:flex  gap-5">
            <NavigationMenuItem className="text-2xl font-semibold  cursor-pointer">
              {cartDetails?.numOfCartItems ? (
                <Link href="/cart" className="relative">
                  <ShoppingCart />
                  <Badge className="absolute -top-3 -right-3 bg-green-600 text-white">
                    {cartDetails.numOfCartItems}
                  </Badge>
                </Link>
              ) : null}
            </NavigationMenuItem>
            {session?.data ? (
              <NavigationMenuItem className=" font-bold  cursor-pointer">
                <Link
                  href={"/"}
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Logout
                </Link>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem className=" font-bold  cursor-pointer">
                  <Link href={"/register"}>Register</Link>
                </NavigationMenuItem>
                <NavigationMenuItem className=" font-bold  cursor-pointer">
                  <Link href={"/login"}>Login</Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-100 flex flex-col shadow-md p-4 space-y-3 font-bold">
          <Link
            href={"/"}
            className={pathName === "/" ? "text-green-600" : ""}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href={"/cart"}
            className={pathName === "/cart" ? "text-green-600" : ""}
            onClick={() => setIsMenuOpen(false)}
          >
            Cart
          </Link>
          <Link
            href={"/wishList"}
            className={pathName === "/wishList" ? "text-green-600" : ""}
            onClick={() => setIsMenuOpen(false)}
          >
            Wish List
          </Link>
          <Link
            href={"/products"}
            className={pathName === "/products" ? "text-green-600" : ""}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href={"/categories"}
            className={pathName === "/categories" ? "text-green-600" : ""}
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            href={"/brands"}
            className={pathName === "/brands" ? "text-green-600" : ""}
            onClick={() => setIsMenuOpen(false)}
          >
            Brands
          </Link>
          <Link className="self-center relative" href={"/cart"}>
            <ShoppingCart />
            <Badge className="absolute  -top-3 -right-3 bg-green-600 text-white ">
              0
            </Badge>
          </Link>
          <Link
            className="self-center"
            href={"/brands"}
            onClick={() => setIsMenuOpen(false)}
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
}
