import CategoryFilters from "@/components/app-ui/CategoryFilters";
import Container from "@/components/app-ui/Container";
import Loading from "@/components/app-ui/Loading";
import ProductCard from "@/components/app-ui/ProductCard";
import { getData } from "@/config/apiConfig";
import { getCategoryProductByIdRequest } from "@/common/lib/apiEndpoint";
import { ProductProps } from "@/common/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProductDate = {
  message: string;
  data: ProductProps[];
};

const Category = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: ProductDate = await getData(
          getCategoryProductByIdRequest(id || "")
        );
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatId = (id: string) => {
    return id
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <h2 className="text-4xl text-center font-semibold mb-5">
            {formatId(id!)}
          </h2>
          <div className="flex items-start gap-10">
            <CategoryFilters id={id} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products?.map((item: ProductProps) => (
                <ProductCard item={item} key={item?._id} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Category;
