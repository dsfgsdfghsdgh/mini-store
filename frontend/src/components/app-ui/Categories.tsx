import { useEffect, useState } from "react";
import Container from "./Container";
import { getCategoriesRequest } from "@/lib/apiEndpoint";
import { getData } from "@/config/apiConfig";
import { Link } from "react-router-dom";
import Title from "./Title";
import { CategoryProps } from "@/types/types";

type CategoriesData = {
  message: string, 
  data: CategoryProps[]
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>();
  console.log(categories)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data:CategoriesData = await getData(getCategoriesRequest);
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container>
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Popular categories" />
          <Link
            to={"/category/tvAndAudio"}
            className="font-medium relative group overflow-hidden"
          >
            View All Categories{" "}
            <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
        {categories?.map((item) => (
          <Link
            to={`/category/${item?._base}`}
            key={item?._id}
            className="w-full h-auto relative group overflow-hidden flex justify-center"
          >
            <img
              src={item?.image}
              alt="categoryImage"
              className="w-2/3 h-4/5 object-cover rounded-md group-hover:scale-110 duration-300"
            />
            <div className="absolute bottom-3 w-full text-center">
              <p className="text-sm md:text-base font-bold">{item?.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Categories;