import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { ProductProps } from "@/common/types/types";
import {
  getProductByIdRequest,
  getProductRequest,
} from "@/common/lib/apiEndpoint";
import { getData } from "@/config/apiConfig";
import Loading from "@/components/app-ui/Loading";
import Container from "@/components/app-ui/Container";
import { MdOutlineStarOutline, MdStar } from "react-icons/md";
import PriceTag from "@/components/app-ui/PriceTag";
import { FaRegEye } from "react-icons/fa";
import FormattedPrice from "@/components/app-ui/FormattedPrice";
import { IoClose } from "react-icons/io5";
import AddToCartBtn from "@/components/app-ui/AddToCartBtn";
import { productPayment } from "@/assets";
import CategoryFilters from "@/components/app-ui/CategoryFilters";

type ProductDataSingle = {
  message: string;
  data: ProductProps;
};

type ProductDataMulti = {
  message: string;
  data: ProductProps[];
};

const ProductById = () => {
  const [productData, setProductData] = useState<ProductProps | null>(null);
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("#");
  const [color, setColor] = useState("");
  const { id } = useParams();

  const endpoint = id ? getProductByIdRequest(id) : getProductRequest;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const data: ProductDataSingle = await getData(endpoint);
          setProductData(data?.data);
          setAllProducts([]);
        } else {
          const data: ProductDataMulti = await getData(endpoint);
          setAllProducts(data.data);
          setProductData(null);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, endpoint]);

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

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images[0]);
      setColor(productData?.colors[0]);
    }
  }, [productData]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!!id && productData && _.isEmpty(allProducts) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image Gallery */}
              <div className="flex gap-x-3">
                <div className="flex flex-col gap-2">
                  {productData?.images?.map((item, index) => (
                    <img
                    draggable="false"
                      src={item}
                      alt="img"
                      key={index}
                      className={`w-20 h-20 cursor-pointer rounded-md transition-all duration-300 object-contain ${
                        imgUrl === item
                          ? "border-2 border-black shadow-md opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setImgUrl(item)}
                    />
                  ))}
                </div>
                <div className="overflow-hidden rounded-4xl  h-9/12 w-9/12 ">
                  <img
                  draggable="false"
                    src={imgUrl}
                    alt="mainImage"
                    className="h-full w-full transition-transform hover:scale-105 object-contain"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {productData?.name}
                </h2>
                <div className="flex items-center justify-between">
                  <PriceTag
                    regularPrice={productData?.regularPrice}
                    discountedPrice={productData?.discountedPrice}
                    className="text-xl text-gray-700"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-lg">
                      {renderStars(productData?.rating || 0)}
                    </div>
                    <p className="text-base font-semibold text-gray-700">
                      ({productData?.reviews} reviews)
                    </p>
                  </div>
                </div>

                <p className="flex items-center text-gray-600">
                  <FaRegEye className="mr-1 text-gray-500" />{" "}
                  <span className="font-semibold mr-1 text-gray-800">
                    {productData?.reviews}
                  </span>{" "}
                  people are viewing this right now
                </p>

                <p className="text-gray-700">
                  You are saving{" "}
                  <span className="font-semibold text-green-500">
                    <FormattedPrice
                      amount={
                        productData?.regularPrice - productData?.discountedPrice
                      }
                    />
                  </span>{" "}
                  upon purchase
                </p>

                {/* Color Selection */}
                <div>
                  <p className="text-gray-800">
                    Color:{" "}
                    <span
                      className="font-semibold capitalize"
                      style={{ color: color }}
                    >
                      {color}
                    </span>
                  </p>
                  <div className="flex items-center gap-x-3 mt-2">
                    {productData?.colors.map((item) => (
                      <div
                        key={item}
                        className={`p-1 rounded-full border-2 ${
                          item === color ? "border-black" : "border-transparent"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full cursor-pointer"
                          style={{ backgroundColor: item }}
                          onClick={() => setColor(item)}
                        />
                      </div>
                    ))}
                  </div>
                  {color && (
                    <button
                      onClick={() => setColor(productData.colors[0])}
                      className="font-semibold mt-2 text-sm text-red-500 flex items-center gap-1 hover:underline"
                    >
                      <IoClose /> Clear
                    </button>
                  )}
                </div>

                <p className="text-gray-800">
                  Brand:{" "}
                  <span className="font-medium">{productData?.brand}</span>
                </p>
                <p className="text-gray-800">
                  Category:{" "}
                  <span className="font-medium">{productData?.category}</span>
                </p>

                <AddToCartBtn
                  product={productData}
                  title="Buy now"
                  className="bg-black py-3 text-white rounded-lg hover:bg-gray-900 transition-all hover:scale-100"
                />

                <div className="bg-gray-100 p-5 rounded-md flex flex-col items-center justify-center gap-2">
                  <img
                  draggable="false"
                    src={productPayment}
                    alt="payment"
                    className="w-auto object-cover"
                  />
                  <p className="font-semibold text-gray-700">
                    Guaranteed safe & secure checkout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <CategoryFilters id={id} />
          )}
        </Container>
      )}
    </div>
  );
};

export default ProductById;
