import { getData } from "@/config/apiConfig";
import { getCategoryRequest } from "@/lib/apiEndpoint";
import { CategoryProps } from "@/types/types";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { CustomLeftArrow, CustomRightArrow } from "./CutomArrows"
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

type CateResultType = {
  message: string;
  data: CategoryProps[];
};

const BannerCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result: CateResultType = await getData(getCategoryRequest);
        if (result?.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } 
    };

    fetchCategory();
  }, []);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      transitionDuration={1000}
      className="flex flex-row p-4 max-w-screen-xl mx-auto lg:px-0 relative"
      customRightArrow={<CustomRightArrow onClick={()=>{}} />}
      customLeftArrow={<CustomLeftArrow onClick={()=>{}}/>}
    >
      {categories.map((item: CategoryProps) => (
        <Link
          key={item?._id}
          to={`category/${item?._base}`}
          className="flex items-center gap-x-2 p-1 border border-gray-100 flex-1 rounded-md hover:border-skyText hover:shadow-lg h-10"
        >
       
          <p className="md:text-sm text-xs font-semibold w-full text-center"> {item?.name}</p>
        </Link>
      ))}
    </Carousel>
  );
};

export default BannerCategories;
