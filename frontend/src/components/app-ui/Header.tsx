import { useEffect, useState } from "react";
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
import Container from "./Container";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";

type CateResultType = {
  message: string;
  data: CategoryProps[];
};

export default function Header() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const cartProducts = useTypedSelector((state) => state.cart.cartProducts);
  const favoriteProduct = useTypedSelector(
    (state) => state.favorite.favoriteProducts
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const result: CateResultType = await getData(getCategoryRequest);
      setCategories(result.data);
    };
    fetchCategory();

    // Add scroll listener for shadow effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToCart = () => navigate("/cart");
  const handleCategoryClick = (categoryId: string) =>
    navigate(`/category/${categoryId}`);
  const handleToFavorite = () => navigate(`/favorite`);
  const handleToUser = () => navigate(`/user`);
  const handleClearSearch = () => setSearchText("");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Main header section */}
      <div className="bg-white border-b">
        <Container className="md:h-18 h-14 flex items-center justify-between py-2">
          {/* Text logo instead of image */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <span className="text-xl md:text-2xl font-bold text-skyText">
              Shop
            </span>
            <span className="text-xl md:text-2xl font-bold text-darkText">
              Hub
            </span>
          </div>

          {/* Search bar */}
          <SearchBox
            handleClearSearch={handleClearSearch}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          {/* User controls */}
          <div className="flex items-center space-x-1 md:space-x-6">
            <button
              onClick={handleToUser}
              className="group p-2 relative rounded-full hover:bg-gray-100 transition-colors"
            >
              <BiUser className="text-xl md:text-2xl text-darkText group-hover:text-skyText" />
              <span className="hidden md:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Account
              </span>
            </button>

            <button
              onClick={handleToFavorite}
              className="group p-2 relative rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiHeart className="text-xl md:text-2xl text-darkText group-hover:text-skyText" />
              {favoriteProduct.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs rounded-full bg-redText text-white">
                  {favoriteProduct.length}
                </span>
              )}
              <span className="hidden md:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Wishlist
              </span>
            </button>

            <button
              onClick={handleToCart}
              className="group p-2 relative rounded-full hover:bg-gray-100 transition-colors"
            >
              <RiShoppingCart2Line className="text-xl md:text-2xl text-darkText group-hover:text-skyText" />
              {cartProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs rounded-full bg-redText text-white">
                  {cartProducts.length}
                </span>
              )}
              <span className="hidden md:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Cart
              </span>
            </button>

            <span className="md:hidden block">
              <Sidebar />
            </span>
          </div>
        </Container>
      </div>

      {/* Category navigation */}
      <div className="bg-darkText text-white shadow-sm">
        <Container className="flex items-center md:py-5 py-4 h-14 ">
          <DropdownMenu>
            <DropdownMenuTrigger className=" px-4 flex items-center gap-2 text-white hover:bg-darkText/80 transition-colors focus:outline-none">
              <span>Categories</span>
              <FaAngleDown className="text-sm" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category._id}
                  className="py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCategoryClick(category._base)}
                >
                  {category?.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:flex items-center space-x-6 ml-6">
            {bottomNavigation.map((nav) => (
              <Link
                key={nav.link}
                to={nav.link}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {nav.title}
              </Link>
            ))}
          </div>

          {/* Mobile search button */}
          <div className="md:hidden ml-auto">
            <SearchBox
              className="flex text-sm"
              handleClearSearch={handleClearSearch}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
        </Container>
      </div>
    </header>
  );
}
