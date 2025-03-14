import Categories from "@/components/app-ui/Categories";
import BannerCategories from "@/components/app-ui/CategoryBanner";
import DiscountedBanner from "@/components/app-ui/DiscountedBanner";
import Hightlights from "@/components/app-ui/Highlights";
import HomeBanner from "@/components/app-ui/HomeBanner";
import ProductList from "@/components/app-ui/ProductList";

export default function Home() {
  return (
    <>
      <BannerCategories />
      <HomeBanner />
      <Hightlights />
      <Categories />
      <ProductList />
      <DiscountedBanner />
    </>
  );
}
