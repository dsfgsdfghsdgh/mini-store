import { mergedefaultCss } from "@/common/lib/mergeCustomTailwindCss";
import { ProductProps } from "@/common/types/types";
import { useTypedSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type SearchBoxType = {
  searchText: string;
  setSearchText: (text: string) => void;
  handleClearSearch: () => void;
  className?: string;
};

export default function SearchBox({
  handleClearSearch,
  searchText,
  setSearchText,
  className,
}: SearchBoxType) {
  const { data } = useTypedSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.length > 2) {
      const results = data?.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(results || []);
    } else {
      setFilteredProducts([]);
    }
  }, [searchText, data]);

  const handleOnProduct = (id: number) => {
    navigate(`/product/${id}`);
    setSearchText("");
  };

  return (
    <div
      className={mergedefaultCss(
        "hidden md:flex relative flex-1 max-w-xl mx-6",
        className
      )}
    >
      <div className="relative w-full">
        {/* Search Input */}
        <input
          type="text"
          className="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 focus:border-skyText focus:ring-1 focus:ring-skyText transition-all"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IoSearchOutline className="absolute top-3 left-3 text-gray-400" />
        {searchText && (
          <IoClose
            onClick={handleClearSearch}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer"
          />
        )}

        {/* Suggestions Dropdown */}
        {filteredProducts.length > 0 && (
          <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-[100]">
            {filteredProducts.map((product) => (
              <li
                key={product._id}
                className={`px-4 py-2 text-gray-700 cursor-pointer hover:bg-sky-100 transition-all font-normal md:text-sm text-[13px]   ${
                  product._id ? "hover:underline text-center" : " "
                }`}
                onClick={() => handleOnProduct(product._id)}
              >
                {product.name.substring(0, 45)}...
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
