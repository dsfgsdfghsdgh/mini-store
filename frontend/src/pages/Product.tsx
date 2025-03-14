import { useEffect, useState } from "react";
import { getProductRequest } from "@/lib/apiEndpoint";
import { getData } from "@/config/apiConfig";
import Loading from "@/components/app-ui/Loading";
import Container from "@/components/app-ui/Container";
import ProductCard from "@/components/app-ui/ProductCard";
import { ProductProps } from "@/types/types";
import CategoryFilters from "@/components/app-ui/CategoryFilters";
import { useParams } from "react-router-dom";

type ProductDataMulti = {
  message: string;
  data: ProductProps[];
};

const Products = () => {
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: ProductDataMulti = await getData(getProductRequest);
        setAllProducts(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-start gap-10">
              <CategoryFilters id={id} />
              <div>
                <p className="text-4xl font-semibold mb-5 text-center">
                  Products Collection
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {allProducts?.map((item: ProductProps) => (
                    <ProductCard item={item} key={item?._id} />
                  ))}
                </div>
              </div>
            </div>
      )}
    </Container>
  );
};

export default Products;
