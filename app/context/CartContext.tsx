
import { createContext, useContext, useEffect, useState } from "react";
import { getUserCart } from "../actions/cart.action";
import { CartData } from "@/types/cart";
import { getUserToken } from "@/lib/token.utils";


interface CartContextType {
  cartDetails: CartData | null,
  fetchCartData: () => Promise<void>,
  setCartDetails : (cart : CartData | null) => void
}

const cartContext = createContext<CartContextType>({
  cartDetails: null,
  fetchCartData: async ()=>{} ,
  setCartDetails :  ()=> {}
});



export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<CartData | null>(null);



  async function fetchCartData (){
  
  const token = await getUserToken()
  if (!token) return;

    const response = await getUserCart()
    setCartDetails(response?.data)


  }

  useEffect(() => {
      
      
    fetchCartData()
  } ,[])

  return (
    <cartContext.Provider value={{ cartDetails ,  setCartDetails ,fetchCartData }}>
      {children}
    </cartContext.Provider>
  );
}


export function useCartContext() {
  const myCartContext = useContext(cartContext);
  return myCartContext;
}
