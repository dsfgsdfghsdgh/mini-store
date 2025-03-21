import { MdOutlineStarOutline, MdStar } from "react-icons/md";
import { ProductProps } from "@/common/types/types";
import AddToCartBtn from "./AddToCartBtn";
import ProductCardSideNav from "./ProductCardSideNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  item: ProductProps;
}

const ProductCard = ({ item }: Props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const percentage =
    ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice) * 100;
  const handleProduct = () => {
    navigate(`/product/${item?._id}`);
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<MdOutlineStarOutline key={i} className="text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {percentage > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-redText text-white text-xs font-bold px-2 py-1 rounded-full">
            {percentage.toFixed(0)}% OFF
          </span>
        </div>
      )}

      <div
        className="relative w-full h-64 overflow-hidden cursor-pointer"
      >
        <img
        draggable="false"
          src={item?.images[0]}
          alt={item?.name || "Product image"}
          className={`w-full h-full object-contain transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          onClick={handleProduct}
        />

        <div className="absolute top-3 right-3">
          <ProductCardSideNav item={item} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-2">
        {/* Brand/Category */}
        <h3 className="text-xs uppercase font-medium text-gray-500 tracking-wider">
          {item?.overView}
        </h3>

        {/* Product Name */}
        <h2
          className="text-base font-semibold line-clamp-2 group-hover:text-skyText transition-colors cursor-pointer"
          onClick={handleProduct}
        >
          {item?.name}
        </h2>

        {/* Star Rating */}
        <div className="flex items-center text-lg">
          {renderStars(item?.rating || 0)}
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-bold text-darkText">
            ${item?.discountedPrice.toFixed(2)}
          </span>
          {percentage > 0 && (
            <span className="text-sm font-medium line-through text-gray-400">
              ${item?.regularPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="w-full">
          <AddToCartBtn className="w-full" product={item} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
