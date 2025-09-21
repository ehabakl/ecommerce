import React from 'react'
import { Category } from './AllCategoriesGrid'
import Image from 'next/image'

interface Props {
  category: Category
}

export default function CategoryCard({ category }: Props) {
  return (
    <div
      className={`${category.name} min-w-full rounded-xl border cursor-pointer overflow-hidden group border-transparent hover:border hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,128,0,0.4)] transition-all duration-300 ease-in-out`}
    >
      <div className="h-[300px] w-full relative mx-auto overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          fill
          sizes="100%"
          priority
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
          {category.name}
        </h3>
       
      </div>
    </div>
  )
}
