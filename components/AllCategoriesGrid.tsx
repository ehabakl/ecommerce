


 import React from 'react';
import CategoryCard from './CategoryCard';
import { getCategories } from '@/app/actions/allCategories.action';


export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}

export default async function AllCategoriesGrid  ()  {
  const response = await getCategories()
  const categories  = response?.data


  return (
    <div className="container w-full max-w-7xl mx-auto p-4 mt-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
    { categories?.map((category:Category) => (
        <CategoryCard key={category._id} category={category} />
    ))}
      </div>
    </div>
  );
};

