import { MdOutlineStarOutline } from "react-icons/md";
import { ProductProps } from "@/common/types/types";
import AddToCartBtn from "./AddToCartBtn";
import ProductCardSideNav from "./ProductCardSideNav";
import { useNavigate } from "react-router-dom";
interface Props {
  item: ProductProps;
}

const ProductCard = ({ item }: Props) => {
  const navigate = useNavigate()
  const percentage =
    ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice) * 100;
    const handleProduct = () => {
    navigate(`/product/${item?._id}`)
  }
  return (
    <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2 group">
        <span
          className="bg-black text-skyText absolute left-0 right-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
        >
          save {percentage.toFixed(0)}%
        </span>
        <img
          onClick={handleProduct}
          src={item?.images[0]}
          alt="productImage"
          className="w-full h-full rounded-md object-contain group-hover:scale-110 duration-300"
        />
        <ProductCardSideNav item={item} />
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-xs uppercase font-semibold text-lightText">
          {item?.overView}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2">{item?.name}</h2>
        <div className="text-base text-lightText flex items-center">
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
        </div>
        <AddToCartBtn product={item} />
      </div>

      
    </div>
  );
};

export default ProductCard;
