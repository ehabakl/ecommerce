"use client";

import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContext";
import { Toaster } from "react-hot-toast";
import WishlistContextProvider from "./WishlistContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        {children}
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
      </WishlistContextProvider>

    </CartContextProvider>
     </SessionProvider>;
}
