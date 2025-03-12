import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
export const CustomRightArrow = ({onClick}:{onClick:()=> void}) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-4 m-auto h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full border-[1px] border-gray-200 hover:bg-gray-950 hover:text-white duration-200"
      aria-label="Next"
    >
      <HiArrowRight className="text-base" />
    </button>
  );
};



export const CustomLeftArrow = ({onClick}:{onClick:()=> void}) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-4 m-auto h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full border-[1px] border-gray-200 hover:bg-gray-950 hover:text-white duration-200"
      aria-label="Next"
    >
      <HiArrowLeft className="text-base" />
    </button>
  );
};