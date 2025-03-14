import { mergedefaultCss } from "@/lib/mergeCustomTailwindCss";
import { ProductProps } from "@/types/types";

const AddToCartBtn = ({
  className,
  title,
  product,
}: {
  className?: string;
  title?: string;
  product?: ProductProps
}) => {
  console.log(product)
  return (
    <>
      <button
        className={mergedefaultCss(
          "bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer",
          className
        )}
      >
        {title ? title : "Add to cart"}

      </button>
    </>
  );
};

export default AddToCartBtn;
