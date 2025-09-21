import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

export async function getUserWishlist() {
  try {
    const token = await getUserToken()
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' ,{
        headers : { 
            token : token as string
        },
    });
    
 
    return {
      success: true,
      data: response.data,
      message: 'data fetched successfully'
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
}}

export async function addProductToWishlist(productId :string) {
  try {
    const token = await getUserToken()
    const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' ,
      {productId}
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
}}
export async function removeProductFromWishlist(productId :string) {
  try {
    const token = await getUserToken()
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,
     {
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
}}


