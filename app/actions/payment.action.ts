import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

interface ShippingAdressType {
  details: string;
  phone: number;
  city: string;
}


const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  async function payInCash(
  cartId: string,
  shippingAdress:ShippingAdressType
) {

  try {
    const token = await getUserToken()
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,
      {shippingAdress}
      ,{
        headers : { 
            token : token as string
        },
    });
    
    
    
    return {
      success: true,
      data: response.data,
      message: response.data.message
    };
  } catch (error:unknown) {
    if(axios.isAxiosError(error)){
    console.error('Error fetching slides:', error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch slides'
    };
  }
}

  
  return;
}
  async function payOnline(
  cartId: string,
  shippingAdress:  ShippingAdressType 
) {

  try {
    const token = await getUserToken()
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${BASE_URL}` ,
      {shippingAdress}
      ,{
        headers : { 
            token : token as string
        },
    });
    
    
    
    return {
      success: true,
      data: response.data,
      message: response.data.message
    };
  } catch (error:unknown) {
    if(axios.isAxiosError(error)){
    console.error('Error fetching slides:', error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch slides'
    };
  }
}

  
  return;
}



export {
  payInCash , payOnline
}
