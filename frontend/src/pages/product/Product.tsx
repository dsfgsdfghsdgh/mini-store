import Loading from "@/components/app-ui/Loading";
import Container from "@/components/app-ui/Container";
import ProductCard from "@/components/app-ui/ProductCard";
import { ProductProps } from "@/common/types/types";
import CategoryFilters from "@/components/app-ui/CategoryFilters";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "@/store/store";

const Products = () => {
  const { data: allProducts, isLoading } = useTypedSelector(
    (state) => state.products
  );
  const { id } = useParams();

  return (
    <Container>
      {isLoading ? (
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
