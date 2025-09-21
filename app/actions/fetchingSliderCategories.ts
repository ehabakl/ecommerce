
"use server";

import axios from 'axios';

export async function getCategories() {
  try {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    
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