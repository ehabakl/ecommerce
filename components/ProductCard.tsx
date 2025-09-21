"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCartContext } from "@/app/context/CartContext";
import { useWishlistContext } from "@/app/context/WishlistContext";
import { useEffect, useState } from "react";
import { addProductToCart } from "@/app/actions/cart.action";
import { addProductToWishlist, removeProductFromWishlist } from "@/app/actions/wishlist.action";
import { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const { fetchCartData } = useCartContext();
  const { wishlistDetails } = useWishlistContext();

  // local instant state ❤️
  const [liked, setLiked] = useState(false);

  // sync with context when page reloads
  useEffect(() => {
    const isInWishlist = wishlistDetails?.some(item => item._id === product._id);
    setLiked(!!isInWishlist);
  }, [wishlistDetails, product._id]);

  // Add to cart
  async function handleAddToCart(productId: string) {
    const response = await addProductToCart(productId);
    toast.success(response?.message);
    await fetchCartData();
  }

  // Toggle wishlist (optimistic)
  async function handleToggleWishlist() {
    if (liked) {
      // optimistic update
      setLiked(false);
      toast.success("Removed from Wishlist");
      try {
        await removeProductFromWishlist(product._id);
      } catch {
        // rollback if API fails
        setLiked(true);
        toast.error("Failed to remove from Wishlist");
      }
    } else {
      setLiked(true);
      toast.success("Added to Wishlist");
      try {
        await addProductToWishlist(product._id);
      } catch {
        setLiked(false);
        toast.error("Failed to add to Wishlist");
      }
    }
  }

  return (
    <Card className="w-full mt-10 gap-3 overflow-hidden group border-transparent hover:border hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,128,0,0.4)] transition-all duration-300 ease-in-out">
      <Link href={`/products/${product._id}`}>
        <div className="h-[400px] w-full sm:h-70 sm:w-60 relative mx-auto">
          <Image
            src={product.imageCover}
            fill
            alt={product.imageCover}
            sizes="100%"
            priority
          />
        </div>

        <CardContent>
          <div className="self-start">{product.category.name}</div>
          <div className="self-start font-bold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </div>
          <div className="justify-between flex w-full">
            <div>{product.price} EGP</div>
            <div className="flex gap-1">
              <Star className="text-yellow-500 fill-yellow-500" />
              {product.ratingsAverage}
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex-col gap-2">
        <div className="justify-between flex w-full relative">
          <Button
            onClick={() => handleAddToCart(product._id)}
            variant="outline"
            className="cursor-pointer text-white bg-green-600 w-[80%] absolute top-40 group-hover:top-0 transition-all duration-500 ease-in-out"
          >
            + Add
          </Button>

          <Heart
            onClick={handleToggleWishlist}
            className={`ms-auto cursor-pointer transition-colors duration-300 ${
              liked ? "fill-red-500 stroke-red-500" : "fill-black stroke-black"
            }`}
            size={28}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
