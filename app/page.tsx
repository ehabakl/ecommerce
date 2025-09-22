import CategoriesData from "@/components/CategoriesData";
import Landing from "@/components/Landing";
import Products from "./products/page";



export default async function Home() {

  return (
  <> 
  
  <Landing />
  <CategoriesData />
  <Products />
  </>
    
  );
}
