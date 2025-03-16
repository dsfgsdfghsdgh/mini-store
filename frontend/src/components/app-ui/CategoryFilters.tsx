import { getData } from "@/config/apiConfig";
import { getCategoriesRequest } from "@/common/lib/apiEndpoint";
import { CategoryProps } from "@/common/types/types";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

type CategoryData = {
  message: string;
  data: CategoryProps[];
};

const CategoryFilters = ({ id }: { id: string | undefined }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: CategoryData = await getData(getCategoriesRequest);
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="hidden md:inline-flex flex-col gap-6">
      <p className="text-3xl font-bold">Filters</p>
      <div>
        <p className="text-sm uppercase font-semibold underline underline-offset-2 decoration-[1px] mb-2">
          Select Categories
        </p>
        <div className="flex flex-col gap-y-2 min-w-40">
          {loading ? (
            <div className="flex items-center justify-center my-5">
              <RotatingLines
                visible={true}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                width="50"
              />
            </div>
          ) : (
            categories?.map((item: CategoryProps) => (
              <Link
                to={`/category/${item?._base}`}
                key={item?._id}
                className={`text-base font-medium text-start underline underline-offset-2 decoration-[1px] decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
                  item?._base === id
                    ? "text-greenText decoration-greenText"
                    : "text-lightText"
                }`}
              >
                {item?.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;