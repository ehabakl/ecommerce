import CategoriesData from "@/components/CategoriesData";
import Landing from "@/components/Landing";
import Products from "./products/page";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";


export default async function Home() {

  const session = await getServerSession(options)
  return (
  <> 
  
  <Landing />
  <CategoriesData />
  <Products />
  </>
    
  );
}
