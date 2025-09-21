"use server";

import axios from 'axios';


export async function getProducts() {
  try {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    
    return {
      success: true,
      data: response.data.data,
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


export async function getSingleProduct({id}: {id:string}) {
  try {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    
    return {
      success: true,
      data: response.data.data,
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