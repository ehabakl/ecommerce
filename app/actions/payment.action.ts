import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

interface ShippingAdressType {
  details: "detail";
  phone: "01010800921";
  city: "Cairo";
}

  async function payInCash(
  cartId: string,
  shippingAdress: { shippingAdress: ShippingAdressType }
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
    
 console.log(response , "payment response");
    
    
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
  shippingAdress: { shippingAdress: ShippingAdressType }
) {

  try {
    const token = await getUserToken()
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,
      {shippingAdress}
      ,{
        headers : { 
            token : token as string
        },
    });
    
 console.log(response , "payment response");
    
    
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
