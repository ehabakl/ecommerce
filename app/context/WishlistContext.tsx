"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getUserWishlist } from "../actions/wishlist.action";
import { WishlistData, WishlistItem } from "@/types/wishlist";
import { getUserToken } from "@/lib/token.utils";



interface WishlistContextType {
    wishListMainData: WishlistData | null,
    wishlistDetails: WishlistItem[] | null,
  fetchWishlistData: () => Promise<void>;
}

const wishlistContext = createContext<WishlistContextType>({
    wishListMainData : null,
  wishlistDetails: null,
  fetchWishlistData: async ()=>{} 
});



export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [wishListMainData, setWishListMainData] = useState(null);


  async function fetchWishlistData (){
      const token = await getUserToken()
      if (!token) return;
    const response = await getUserWishlist()
    setWishlistDetails(response?.data?.data)
    setWishListMainData(response?.data)
  }

  useEffect(() => {
    fetchWishlistData()
  } ,[])

  return (
    <wishlistContext.Provider value={{wishListMainData, wishlistDetails , fetchWishlistData }}>
      {children}
    </wishlistContext.Provider>
  );
}


export function useWishlistContext() {
  const myWishlistContext = useContext(wishlistContext);
  return myWishlistContext;
}
