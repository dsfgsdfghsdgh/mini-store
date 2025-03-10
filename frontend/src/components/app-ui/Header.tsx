import { logo } from "@/assets";
import Container from "./Container";
import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";

export default function Header() {
  const [searchText, setSearchText] = useState<string | null>(null);
  return (
    <header className="w-full bg-whiteText ">
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

          <div className="relative block">
            <RiShoppingCart2Line className="hover:text-skyText duration-200 cursor-pointer" />
            <span className="absolute inline-flex items-center justify-center -top-1 -right-2 text-[9px] rounded-full size-4 bg-redText text-whiteText">
              0
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
