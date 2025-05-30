import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import PriceTag from "./PriceTag";
import { ProductProps } from "@/common/types/types";
import { useTypedSelector, useAppDispatch } from "@/store/store";
import {
  addToCart,
  DecQuantityByOne,
  removeFromCart,
} from "@/store/features/cartSlice";
import { mergedefaultCss } from "@/common/lib/mergeCustomTailwindCss";

const AddToCartBtn = ({
  className,
  title,
  product,
  showPrice = true,
}: {
  className?: string;
  title?: string;
  product: ProductProps;
  showPrice?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(
    null
  );
  const cartProduct = useTypedSelector((state) => state.cart.cartProducts);

  useEffect(() => {
    const availableItem = cartProduct.find(
      (item) => item?._id === product?._id
    );

    setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product?.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("Product is undefined!");
    }
  };

  const handleDecQuantity = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        dispatch(DecQuantityByOne(product));
        toast.success("Quantity decreased by 1 successfully!");
      } else {
        dispatch(removeFromCart(product));
        toast.success(`${product.name.substring(0, 10)} has been removed`);
      }
    }
  };

  const newClassName = mergedefaultCss(
    "bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer",
    className
  );

  const getRegularPrice = () => {
    return existingProduct && product
      ? product.regularPrice * existingProduct.quantity
      : product?.regularPrice;
  };

  const getDiscountedPrice = () => {
    return existingProduct && product
      ? product.discountedPrice * existingProduct.quantity // ✅ FIX: Use existingProduct.quantity
      : product?.discountedPrice;
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag
            regularPrice={getRegularPrice()}
            discountedPrice={getDiscountedPrice()}
          />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDecQuantity}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={newClassName}>
          {title ? title : "Add to cart"}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
