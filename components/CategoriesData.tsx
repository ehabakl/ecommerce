import { getCategories } from "@/app/actions/fetchingSliderCategories";
import Slider from "./Slider";

  export default async function CategoriesData() {
      const response = await getCategories();
      
      return (
        <div>
           <Slider category={response?.data}/> 
        </div>
      )
  }