import { ProductProps } from "@/common/types/types";
import { addToFavorite } from "@/store/features/favoriteSlice";
import { useAppDispatch } from "@/store/store";
import { FaRegEye } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { LuArrowLeftRight } from "react-icons/lu";;


type ProductPropsForNav ={
  item: ProductProps
}

const ProductCardSideNav = ({item}:ProductPropsForNav) => {
 const dispatch = useAppDispatch()
  const handleFavorite = () => {
    dispatch(addToFavorite(item));
  };

  return (
    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span
      onClick={handleFavorite}
        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
      <IoMdHeart /> 
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <LuArrowLeftRight />
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <FaRegEye />
      </span>
    </div>
  );
};

export default ProductCardSideNav;