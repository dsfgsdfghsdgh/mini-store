import { ProductProps } from "@/common/types/types";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/store/features/favoriteSlice";
import { useAppDispatch, useTypedSelector } from "@/store/store";
import { FaRegEye } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

type ProductPropsForNav = {
  item: ProductProps;
};

const ProductCardSideNav = ({ item }: ProductPropsForNav) => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useTypedSelector(
    (state) => state.favorite.favoriteProducts
  );
  const handleFavorite = () => {
    const exists = favoriteProducts.find((p) => p._id === item._id);
    if (exists) {
      dispatch(removeFromFavorite(item));
    } else {
      dispatch(addToFavorite(item));
    }
  };

  const isFavorite = favoriteProducts.some(
    (product) => product._id === item._id
  );

  return (
    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span
        onClick={handleFavorite}
        className="w-11 h-11 inline-flex text-black  items-center justify-center rounded-full hover:text-white hover:bg-black duration-200 text-xl"
      >
        {isFavorite ? <IoIosHeart /> : <IoIosHeartEmpty />}
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
