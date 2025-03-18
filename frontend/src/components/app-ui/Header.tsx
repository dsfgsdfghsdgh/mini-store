import { logo } from "@/assets";
import Container from "./Container";
import { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { bottomNavigation } from "@/common/data/header";
import { getData } from "@/config/apiConfig";
import { getCategoryRequest } from "@/common/lib/apiEndpoint";
import { CategoryProps } from "@/common/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useTypedSelector } from "@/store/store";

type CateResutType = {
  message: string;
  data: CategoryProps[];
};

export default function Header() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const cartProducts = useTypedSelector(state => state.cart.cartProducts)

  useEffect(() => {
    const fetchCategory = async () => {
      const result: CateResutType = await getData(getCategoryRequest);
      setCategories(result.data);
    };
    fetchCategory();
  }, []);

  const handleToCart =()=>{
    navigate("/cart");
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };
  return (
    <>
      <header className=" md:sticky md:top-0 z-50">
        {/* first header */}
        <div className="w-full bg-whiteText ">
          <Container className="h-20 flex items-center justify-between md:px-4">
            {/* logo */}
            <img src={logo} alt="logo" className="w-44" />
            {/* search bar */}
            <div className="hidden md:inline-flex max-w-3xl w-full relative">
              <input
                type="text"
                className="appearance-none w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-darkText sm:text-sm px-4 py-2"
                placeholder="Search products..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText ? searchText : ""}
              />
              {searchText ? (
                <IoClose
                  onClick={() => setSearchText(null)}
                  className=" absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
                />
              ) : (
                <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
              )}
            </div>
            {/* menu  */}
            <div className="flex gap-x-6 text-center text-2xl ">
              <BiUser className="hover:text-skyText duration-200 cursor-pointer" />
              <div className="relative block">
                <FiHeart className="hover:text-skyText duration-200 cursor-pointer" />
                <span className="absolute inline-flex items-center justify-center -top-1 -right-2 text-[9px] rounded-full size-4 bg-redText text-whiteText">
                  0
                </span>
              </div>

              <button className="relative block" onClick={handleToCart}>
                <RiShoppingCart2Line className="hover:text-skyText duration-200 cursor-pointer" />
                <span className="absolute inline-flex items-center justify-center -top-1 -right-2 text-[9px] rounded-full size-4 bg-redText text-whiteText">
                  {cartProducts.length}
                </span>
              </button>
            </div>
          </Container>
        </div>

        {/* second header */}
        <div className="w-full bg-darkText text-whiteText ">
          {" "}
          <Container className="py-2  md:px-4 flex items-center gap-5 justify-between max-w-4xl ">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-40 flex justify-evenly items-center focus:outline-0 ">
                Select
                <FaAngleDown className="mt-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category._id}
                    onClick={() => setSearchText(null)}
                    className="flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide "
                  >
                    <span
                      onClick={() => handleCategoryClick(category._base)}
                      className="flex w-full items-center gap-2 rounded-lg data-[focus]:bg-white/20 tracking-wide"
                    >
                      {category?.name}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {bottomNavigation.map((nav) => (
              <Link
                className="uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative hover:underline hover:transition-shadow cursor-pointer"
                key={nav.link}
                to={nav.link}
              >
                {nav.title}
              </Link>
            ))}
          </Container>
        </div>
      </header>
    </>
  );
}
