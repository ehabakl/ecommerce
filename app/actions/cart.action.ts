import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

export async function getUserCart() {
  try {
    const token = await getUserToken()
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
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
export async function addProductToCart(productId :string) {
  try {
    const token = await getUserToken()
    const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,
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
export async function removeProductFromCart(productId :string) {
  try {
    const token = await getUserToken()
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
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
export async function updateCartProduct(productId :string , count: number) {
  try {
    const token = await getUserToken()
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
      {count} ,
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

export async function cleartUserCart() {
  try {
    const token = await getUserToken()
    const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,{
        headers : { 
            token : token as string
        },
    });


    return {
      success: true,
      data: response.data,
      message: 'cart cleared successfully'
    };
  } catch (error:unknown) {
    if(axios.isAxiosError(error)){
    console.error('Error clearing cart:', error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Error clearing cart'
    };
  }
}}